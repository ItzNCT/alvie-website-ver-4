import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Progress } from "@/components/ui/progress";

const SUPABASE_BASE =
  "https://uwzjmdrwqizokkxjnlpv.supabase.co/storage/v1/object/public/frames-lovable/intro1";
const TOTAL_FRAMES = 200;

/* ── Scroll-driven word block ── */
const ScrollWords = ({
  text,
  frameIndex,
  enterStart,
  enterEnd,
  exitStart,
  exitEnd,
  staggerStep = 3,
}: {
  text: string;
  frameIndex: ReturnType<typeof useTransform<number, number>>;
  enterStart: number;
  enterEnd: number;
  exitStart?: number;
  exitEnd?: number;
  staggerStep?: number;
}) => {
  const lines = text.split("\n");
  let wordIndex = 0;
  return (
    <span className="absolute flex flex-col items-center justify-center gap-y-[0.05em] w-full">
      {lines.map((line, lineIdx) => {
        const lineWords = line.split(" ");
        const lineEl = (
          <span key={lineIdx} className="flex flex-wrap items-center justify-center gap-x-[0.3em]">
            {lineWords.map((word, wi) => {
              const idx = wordIndex++;
              return (
                <ScrollWord
                  key={`${word}-${idx}`}
                  word={word}
                  index={idx}
                  frameIndex={frameIndex}
                  enterStart={enterStart}
                  enterEnd={enterEnd}
                  exitStart={exitStart}
                  exitEnd={exitEnd}
                  staggerStep={staggerStep}
                />
              );
            })}
          </span>
        );
        return lineEl;
      })}
    </span>
  );
};

const ScrollWord = ({
  word,
  index,
  frameIndex,
  enterStart,
  enterEnd,
  exitStart,
  exitEnd,
  staggerStep,
}: {
  word: string;
  index: number;
  frameIndex: ReturnType<typeof useTransform<number, number>>;
  enterStart: number;
  enterEnd: number;
  exitStart?: number;
  exitEnd?: number;
  staggerStep: number;
}) => {
  const wordEnterStart = enterStart + index * staggerStep;
  const wordEnterEnd = Math.min(wordEnterStart + (enterEnd - enterStart) * 0.6, enterEnd);

  const enterOpacity = useTransform(frameIndex, [wordEnterStart, wordEnterEnd], [0, 1], { clamp: true });
  const enterY = useTransform(frameIndex, [wordEnterStart, wordEnterEnd], [40, 0], { clamp: true });

  let exitOpacity: ReturnType<typeof useTransform<number, number>> | undefined;
  let exitY: ReturnType<typeof useTransform<number, number>> | undefined;

  if (exitStart !== undefined && exitEnd !== undefined) {
    const wordExitStart = exitStart + index * staggerStep;
    const wordExitEnd = Math.min(wordExitStart + (exitEnd - exitStart) * 0.6, exitEnd);
    exitOpacity = useTransform(frameIndex, [wordExitStart, wordExitEnd], [1, 0], { clamp: true });
    exitY = useTransform(frameIndex, [wordExitStart, wordExitEnd], [0, -40], { clamp: true });
  }

  // Combine enter and exit: if we have exit transforms, multiply/add them
  const combinedOpacity = exitOpacity
    ? useTransform([enterOpacity, exitOpacity] as any, ([eIn, eOut]: number[]) => eIn * eOut)
    : enterOpacity;

  const combinedY = exitY
    ? useTransform([enterY, exitY] as any, ([yIn, yOut]: number[]) => yIn + yOut)
    : enterY;

  return (
    <motion.span
      className="inline-block"
      style={{
        opacity: combinedOpacity,
        y: combinedY,
      }}
    >
      {word}
    </motion.span>
  );
};

/* ── Main component ── */
const ScrollytellingUnified = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  /* ── Bottom content: scroll-driven ── */
  const bottomOpacity = useTransform(frameIndex, [0, 40, 60], [0, 0, 1], { clamp: true });
  const bottomY = useTransform(frameIndex, [0, 40, 60], [20, 20, 0], { clamp: true });

  /* ── Draw frame on canvas ── */
  useMotionValueEvent(frameIndex, "change", (latest) => {
    const frame = Math.round(latest);
    if (loaded && frame !== currentFrameRef.current) {
      currentFrameRef.current = frame;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => drawFrame(frame));
    }
  });

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

  /* ── Resize canvas ── */
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

  /* ── Preload frames ── */
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

  return (
    <section
      id="section-introduction"
      ref={containerRef}
      className="relative"
      style={{ height: isMobile ? "400vh" : "1800vh" }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 w-screen h-screen overflow-hidden bg-black">
        {/* Z-0: Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: 0 }}
          role="img"
          aria-label="Cinematic transition showing Hoi An from street level rising to an aerial rooftop view"
        />

        {/* Poster while loading */}
        {!loaded && (
          <img
            src={`${SUPABASE_BASE}/frame_0001.webp`}
            crossOrigin="anonymous"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          />
        )}

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.6) 100%)",
            zIndex: 1,
          }}
        />

        {/* Z-10: Overlay */}
        <div
          className="absolute inset-0 z-10 w-full h-full flex flex-col px-6 md:px-12 pointer-events-none"
        >
          <div className="max-w-[1200px] mx-auto w-full h-full flex flex-col justify-end relative pb-10 md:pb-14">
            {/* Center text wrapper */}
            <div
              className="absolute inset-0 flex items-center justify-center text-center"
              style={{
                fontFamily: "var(--font-display)",
                color: "#F9FAFB",
                letterSpacing: "-0.02em",
                textShadow: "0 2px 20px rgba(0,0,0,0.4)",
                paddingBottom: "10vh",
              }}
            >
              <div className="text-5xl md:text-7xl font-extrabold leading-[1.1] max-w-5xl relative w-full flex items-center justify-center min-h-[2.4em]">
                {/* Text 1: enter 0-40, exit 80-100 */}
                <ScrollWords
                  text={"We see what\nothers overlook."}
                  frameIndex={frameIndex}
                  enterStart={0}
                  enterEnd={40}
                  exitStart={80}
                  exitEnd={100}
                />
                {/* Text 2: enter 100-130, exit 150-170 */}
                <ScrollWords
                  text={"To refine\nunpolished pieces."}
                  frameIndex={frameIndex}
                  enterStart={100}
                  enterEnd={130}
                  exitStart={150}
                  exitEnd={170}
                />
                {/* Text 3: enter 170-195, no exit */}
                <ScrollWords
                  text={"Into a living\ndigital presence."}
                  frameIndex={frameIndex}
                  enterStart={170}
                  enterEnd={195}
                />
              </div>
            </div>

            {/* Bottom content */}
            <motion.div
              className="w-full flex justify-between items-start"
              style={{
                opacity: bottomOpacity,
                y: bottomY,
              }}
            >
              <p
                className="text-sm uppercase tracking-widest max-w-[200px] font-bold"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "rgba(249, 250, 251, 0.9)",
                }}
              >
                To Not Just Exist
              </p>
              <p
                className="text-sm max-w-[400px] text-left"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "rgba(249, 250, 251, 0.8)",
                }}
              >
                We turn real world expertise into digital experiences that earn
                trust — through strategy, research and digital solutions
              </p>
            </motion.div>
          </div>
        </div>

        {/* Scroll progress indicator (desktop) */}
        {!isMobile && (
          <motion.div
            className="absolute"
            style={{
              right: 24,
              top: "50%",
              transform: "translateY(-50%)",
              width: 1,
              height: 60,
              background: "rgba(247, 244, 235, 0.1)",
              zIndex: 20,
            }}
          >
            <motion.div
              className="w-full"
              style={{
                height: useTransform(frameIndex, [0, TOTAL_FRAMES - 1], ["0%", "100%"]),
                background: "rgba(212, 154, 90, 0.4)",
              }}
            />
          </motion.div>
        )}

        {/* Loading progress */}
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
