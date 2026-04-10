import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Progress } from "@/components/ui/progress";

/* ── Frame sources ─────────────────────────────────────── */
const SUPABASE_BASE =
  "https://uwzjmdrwqizokkxjnlpv.supabase.co/storage/v1/object/public/frames-lovable/intro1";
const TOTAL_FRAMES = 200;

/* ── Act 1 (Phase 2) text ──────────────────────────────── */
const ACT1_RAW = `By detailing your work and standardizing your identity, we **differentiate** your company from competitors and ensure your business is **remembered** in the market.`;

interface WordToken {
  text: string;
  bold: boolean;
}

function parseWords(raw: string): WordToken[] {
  const tokens: WordToken[] = [];
  const regex = /\*\*(.+?)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(raw)) !== null) {
    if (m.index > last) {
      raw.slice(last, m.index).split(/\s+/).filter(Boolean).forEach((w) => tokens.push({ text: w, bold: false }));
    }
    tokens.push({ text: m[1], bold: true });
    last = m.index + m[0].length;
  }
  if (last < raw.length) {
    raw.slice(last).split(/\s+/).filter(Boolean).forEach((w) => tokens.push({ text: w, bold: false }));
  }
  return tokens;
}

/* ── Act 2 (Phase 3) body text ──────────────────────────── */
const ACT2_BODY = "Every disconnect between your real-world expertise and your digital presence triggers a vicious cycle that compounds over time.";

/* ── Component ─────────────────────────────────────────── */
const ScrollytellingUnified = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);

  /* Intro text refs */
  const introTextRef = useRef<HTMLDivElement>(null);
  const introGoldLineRef = useRef<HTMLDivElement>(null);
  const introHeaderRef = useRef<HTMLHeadingElement>(null);
  const introBodyRef = useRef<HTMLParagraphElement>(null);

  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const words = useMemo(() => parseWords(ACT1_RAW), []);
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

  /* ── GSAP scroll animations ──────────────────────────── */
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
        /* ── Frame scrubbing ── */
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

        /* ═══ PHASE 1: Intro text ═══ */
        if (introGoldLineRef.current) {
          gsap.fromTo(introGoldLineRef.current, { scaleX: 0 }, {
            scaleX: 1,
            scrollTrigger: { trigger: container, start: "5% top", end: "9% top", scrub: 0.5 },
          });
        }

        if (introHeaderRef.current) {
          gsap.fromTo(introHeaderRef.current, { opacity: 0, y: 30 }, {
            opacity: 1, y: 0,
            scrollTrigger: { trigger: container, start: "5% top", end: "10% top", scrub: 0.5 },
          });
        }

        if (introBodyRef.current) {
          gsap.fromTo(introBodyRef.current, { opacity: 0, y: 20 }, {
            opacity: 1, y: 0,
            scrollTrigger: { trigger: container, start: "7% top", end: "12% top", scrub: 0.5 },
          });
        }

        if (introTextRef.current) {
          gsap.to(introTextRef.current, {
            opacity: 0, y: -20,
            scrollTrigger: { trigger: container, start: "44% top", end: "48% top", scrub: 0.5 },
          });
        }

        if (introTextRef.current) {
          gsap.to(introTextRef.current, {
            y: -40,
            scrollTrigger: { trigger: container, start: "top top", end: "bottom bottom", scrub: true },
          });
        }

        /* ═══ PHASE 2: Word-by-word body text ═══ */
        gsap.fromTo(".act1-text-container",
          { opacity: 0, visibility: "hidden" },
          {
            opacity: 1, visibility: "visible",
            scrollTrigger: { trigger: container, start: "48% top", end: "49% top", scrub: 0.3 },
          }
        );

        const wordEls = gsap.utils.toArray<HTMLElement>(".act1-word");
        wordEls.forEach((word, index) => {
          const startP = 50 + (index / wordEls.length) * 20;
          const endP = startP + 1.5;
          gsap.fromTo(word, { opacity: 0.15 }, {
            opacity: 1,
            scrollTrigger: { trigger: container, start: `${startP}% top`, end: `${endP}% top`, scrub: 0.3 },
          });
        });

        gsap.utils.toArray<HTMLElement>(".highlight-word").forEach((hw) => {
          gsap.fromTo(hw, { scale: 1 }, {
            scale: 1.05,
            scrollTrigger: {
              trigger: container,
              start: () => {
                const idx = Number(hw.dataset.wordIndex);
                return `${50 + (idx / wordEls.length) * 20}% top`;
              },
              end: () => {
                const idx = Number(hw.dataset.wordIndex);
                return `${53 + (idx / wordEls.length) * 20}% top`;
              },
              scrub: 0.3,
            },
          });
        });

        gsap.to(".act1-text-container", {
          opacity: 0,
          y: -20,
          scrollTrigger: { trigger: container, start: "73% top", end: "77% top", scrub: 0.5 },
        });

        /* ═══ PHASE 3: "The problems" — radar visualization ═══ */
        gsap.fromTo(".act2-container",
          { opacity: 0 },
          {
            opacity: 1,
            scrollTrigger: { trigger: container, start: "77% top", end: "80% top", scrub: 0.5 },
          }
        );

        gsap.fromTo(".act2-header",
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            scrollTrigger: { trigger: container, start: "78% top", end: "82% top", scrub: 0.5 },
          }
        );

        gsap.fromTo(".act2-gold-line", { scaleX: 0 }, {
          scaleX: 1,
          scrollTrigger: { trigger: container, start: "81% top", end: "83% top", scrub: 0.5 },
        });

        gsap.fromTo(".act2-body",
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0,
            scrollTrigger: { trigger: container, start: "83% top", end: "86% top", scrub: 0.5 },
          }
        );

        gsap.fromTo(".radar-container",
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1, scale: 1,
            scrollTrigger: { trigger: container, start: "80% top", end: "84% top", scrub: 0.5 },
          }
        );

        /* ── Mini-TOC active state ─────────────────────── */
        ScrollTrigger.create({
          trigger: container,
          start: "47% top",
          onEnter: () => {
            document.querySelectorAll(".mini-toc-row").forEach((r) => r.classList.remove("active"));
            document.querySelector(".mini-toc-row:nth-child(2)")?.classList.add("active");
          },
          onLeaveBack: () => {
            document.querySelectorAll(".mini-toc-row").forEach((r) => r.classList.remove("active"));
            document.querySelector(".mini-toc-row:nth-child(1)")?.classList.add("active");
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

  /* ── Elastic style helper ────────────────────────────── */
  const elasticStyle: React.CSSProperties = {
    marginLeft: isMobile ? 0 : "var(--nav-width, 64px)",
    width: isMobile ? "100%" : "calc(100vw - var(--nav-width, 64px))",
    paddingLeft: isMobile ? 24 : "var(--safe-space, 48px)",
    paddingRight: isMobile ? 24 : "var(--safe-space, 48px)",
    transition: "margin-left 400ms cubic-bezier(0.4,0,0.2,1), width 400ms cubic-bezier(0.4,0,0.2,1)",
  };

  return (
    <section
      id="section-introduction"
      ref={containerRef}
      className="relative scrollytelling-track"
      style={{ height: scrollHeight }}
    >
      {/* Sticky viewport — z-index 10 so Canvas (z-15) slides over it */}
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
            background: "radial-gradient(ellipse at center, transparent 40%, rgba(247, 244, 235, 0.12) 100%)",
            zIndex: 3,
          }}
        />

        {/* ═══ PHASE 1: Intro text ═══ */}
        <div
          ref={introTextRef}
          className="absolute"
          style={{
            bottom: isMobile ? 40 : 80,
            left: isMobile ? 24 : "calc(var(--nav-width, 64px) + var(--safe-space, 48px))",
            transition: "left 400ms cubic-bezier(0.4,0,0.2,1)",
            maxWidth: 480,
            zIndex: 10,
          }}
        >
          <div
            ref={introGoldLineRef}
            className="origin-left"
            style={{
              width: 48,
              height: 1,
              background: "hsl(var(--accent))",
              marginBottom: 16,
              transform: prefersReducedMotion ? "scaleX(1)" : "scaleX(0)",
            }}
          />
          <h2
            ref={introHeaderRef}
            className="font-display font-bold text-left"
            style={{
              fontSize: "clamp(24px, 3.5vw, 40px)",
              color: "hsl(var(--primary-foreground))",
              lineHeight: 1.2,
              opacity: prefersReducedMotion ? 1 : 0,
            }}
          >
            Strategic design that reflects your true business value
          </h2>
          <p
            ref={introBodyRef}
            className="font-body font-light text-left"
            style={{
              fontSize: "clamp(13px, 1.4vw, 16px)",
              color: "hsl(var(--primary-foreground))",
              lineHeight: 1.7,
              maxWidth: 420,
              marginTop: 16,
              opacity: prefersReducedMotion ? 1 : 0,
            }}
          >
            ALVIE is your strategic partner for synchronizing your physical
            capacity with your online platforms. We develop specific digital
            solutions that display your true value to your audience.
          </p>
        </div>

        {/* ═══ PHASE 2: Word-by-word body text ═══ */}
        <div
          className="act1-text-container absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 10, opacity: 0, visibility: prefersReducedMotion ? "visible" : "hidden" }}
        >
          <div style={{ ...elasticStyle, display: "flex", justifyContent: "center" }}>
            <p
              className="font-body text-center"
              style={{
                fontSize: "clamp(16px, 2vw, 22px)",
                lineHeight: 1.8,
                maxWidth: 580,
              }}
            >
              {words.map((w, i) => (
                <span
                  key={i}
                  className={`act1-word inline-block ${w.bold ? "highlight-word" : ""}`}
                  data-word-index={i}
                  style={{
                    opacity: prefersReducedMotion ? 1 : 0.15,
                    color: w.bold ? "#F7F4EB" : "rgba(247, 244, 235, 0.85)",
                    fontWeight: w.bold ? 600 : 300,
                    marginRight: "0.3em",
                    display: "inline-block",
                    transformOrigin: "center bottom",
                  }}
                >
                  {w.text}
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* ═══ PHASE 3: "The problems" — centered radar layout ═══ */}
        <div
          className="act2-container absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          style={{ zIndex: 10, opacity: prefersReducedMotion ? 1 : 0 }}
        >
          <div
            style={{
              ...elasticStyle,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              gap: isMobile ? 24 : 32,
            }}
          >
            {/* Header */}
            <div style={{ textAlign: "center", width: "100%" }}>
              <h2
                className="font-display act2-header"
                style={{
                  fontWeight: 700,
                  fontSize: "clamp(36px, 5vw, 64px)",
                  color: "hsl(var(--primary-foreground))",
                  lineHeight: 1.1,
                  opacity: prefersReducedMotion ? 1 : 0,
                }}
              >
                The problems
              </h2>
              <div
                className="act2-gold-line origin-center"
                style={{
                  width: 48,
                  height: 1,
                  background: "hsl(var(--accent))",
                  margin: "16px auto 0",
                  transform: prefersReducedMotion ? "scaleX(1)" : "scaleX(0)",
                }}
              />
            </div>

            {/* FadingStorefront moved to CanvasSection */}

            {/* Body text */}
            <p
              className="act2-body font-body text-center"
              style={{
                fontWeight: 300,
                fontSize: "clamp(14px, 1.5vw, 17px)",
                color: "rgba(247, 244, 235, 0.75)",
                lineHeight: 1.7,
                maxWidth: 450,
                opacity: prefersReducedMotion ? 1 : 0,
              }}
            >
              {ACT2_BODY}
            </p>
          </div>
        </div>

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
