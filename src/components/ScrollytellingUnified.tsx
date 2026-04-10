import { useRef, useState, useEffect, useCallback } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Progress } from "@/components/ui/progress";
import ScrollytellingOverlay from "@/components/ScrollytellingOverlay";

/* ── Frame sources ─────────────────────────────────────── */
const SUPABASE_BASE =
  "https://uwzjmdrwqizokkxjnlpv.supabase.co/storage/v1/object/public/frames-lovable/intro1";
const TOTAL_FRAMES = 200;

/* ── Component ─────────────────────────────────────────── */
const ScrollytellingUnified = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);

  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const scrollHeight = isMobile ? "550vh" : "850vh";

  /* ── Reduced motion ──────────────────────────────────── */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const h = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  /* ── Draw frame ──────────────────────────────────────── */
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[index];
    if (!ctx || !img || !canvas) return;

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    let sx: number, sy: number, sw: number, sh: number;

    if (imgRatio > canvasRatio) {
      sh = img.height;
      sw = sh * canvasRatio;
      sx = (img.width - sw) / 2;
      sy = 0;
    } else {
      sw = img.width;
      sh = sw / canvasRatio;
      sx = 0;
      sy = (img.height - sh) / 2;
    }

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
  }, []);

  /* ── Resize canvas ───────────────────────────────────── */
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (loaded) drawFrame(currentFrameRef.current);
  }, [loaded, drawFrame]);

  useEffect(() => {
    resizeCanvas();
    let timeout: ReturnType<typeof setTimeout>;
    const handler = () => {
      clearTimeout(timeout);
      timeout = setTimeout(resizeCanvas, 250);
    };
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("resize", handler);
      clearTimeout(timeout);
    };
  }, [resizeCanvas]);

  /* ── Preload ALL 200 frames ──────────────────────────── */
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    const onDone = () => {
      loadedCount++;
      setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
      if (loadedCount === TOTAL_FRAMES) {
        setLoaded(true);
        const canvas = canvasRef.current;
        if (canvas) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        }
        drawFrame(0);
      }
    };

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = `${SUPABASE_BASE}/frame_${String(i).padStart(4, "0")}.webp`;
      img.onload = onDone;
      img.onerror = onDone;
      images.push(img);
    }

    imagesRef.current = images;
  }, [drawFrame]);

  /* ── GSAP scroll — frame scrubbing only ──────────────── */
  useEffect(() => {
    if (!loaded || prefersReducedMotion) return;

    let ctx: any;

    const initGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const container = containerRef.current;
      if (!container) return;

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
          onUpdate: (self) => {
            const frameIndex = Math.min(
              Math.floor(self.progress * (TOTAL_FRAMES - 1)),
              TOTAL_FRAMES - 1
            );
            if (frameIndex !== currentFrameRef.current) {
              currentFrameRef.current = frameIndex;
              if (rafRef.current) cancelAnimationFrame(rafRef.current);
              rafRef.current = requestAnimationFrame(() => drawFrame(frameIndex));
            }
            if (progressFillRef.current) {
              progressFillRef.current.style.height = `${self.progress * 100}%`;
            }
          },
        });
      }, container);
    };

    initGSAP();

    return () => {
      ctx?.revert();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [loaded, prefersReducedMotion, drawFrame, isMobile]);

  /* ── Reduced motion fallback ─────────────────────────── */
  useEffect(() => {
    if (prefersReducedMotion && loaded) {
      drawFrame(TOTAL_FRAMES - 1);
    }
  }, [prefersReducedMotion, loaded, drawFrame]);

  return (
    <section
      id="section-introduction"
      ref={containerRef}
      className="relative scrollytelling-track"
      style={{ height: scrollHeight }}
    >
      <div
        className="sticky top-0 w-screen h-screen overflow-hidden"
        style={{ zIndex: 10 }}
      >
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          role="img"
          aria-label="Cinematic transition showing Hoi An from street level rising to an aerial rooftop view, then transitioning to sketch illustration"
        />

        {/* First frame fallback while loading */}
        {!loaded && (
          <img
            src={`${SUPABASE_BASE}/frame_0001.webp`}
            crossOrigin="anonymous"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          />
        )}

        {/* Dark overlay — 40% */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "rgba(26, 26, 24, 0.40)", zIndex: 2 }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(247, 244, 235, 0.12) 100%)",
            zIndex: 3,
          }}
        />

        {/* ── New text overlay ── */}
        <ScrollytellingOverlay />

        {/* Scroll progress line — right edge (desktop only) */}
        {!isMobile && (
          <div
            className="absolute"
            style={{
              right: 24,
              top: "50%",
              transform: "translateY(-50%)",
              width: 1,
              height: 60,
              background: "rgba(247, 244, 235, 0.1)",
              zIndex: 10,
            }}
          >
            <div
              ref={progressFillRef}
              style={{
                width: "100%",
                height: "0%",
                background: "rgba(212, 154, 90, 0.4)",
              }}
            />
          </div>
        )}

        {/* Loading progress bar */}
        {!loaded && (
          <div className="absolute bottom-0 left-0 right-0 z-20 transition-opacity duration-500">
            <Progress
              value={loadProgress}
              className="h-0.5 rounded-none bg-transparent"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default ScrollytellingUnified;
