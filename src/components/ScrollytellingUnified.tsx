import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Progress } from "@/components/ui/progress";

const SUPABASE_BASE =
  "https://uwzjmdrwqizokkxjnlpv.supabase.co/storage/v1/object/public/frames-lovable/intro1";
const TOTAL_FRAMES = 200;

/* ── Word-by-word staggered text ── */
const WordReveal = ({
  text,
  isVisible,
  className,
}: {
  text: string;
  isVisible: boolean;
  className?: string;
}) => {
  const words = text.split(/\s+/);
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.5,
            delay: isVisible ? i * 0.06 : 0,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

/* ── Center text block with blur transitions ── */
const CenterText = ({
  text,
  state,
}: {
  text: string;
  state: "entering" | "visible" | "exiting" | "hidden";
}) => {
  const variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    entering: { opacity: 1, y: 0, filter: "blur(0px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
    exiting: { opacity: 0, y: -40, filter: "blur(10px)" },
  };

  return (
    <motion.h2
      className="absolute text-5xl md:text-7xl font-extrabold leading-[1.1] max-w-5xl"
      style={{
        fontFamily: "var(--font-display)",
        color: "#F9FAFB",
        letterSpacing: "-0.02em",
        textShadow: "0 2px 20px rgba(0,0,0,0.4)",
      }}
      initial="hidden"
      animate={state}
      variants={variants}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      {state === "entering" || state === "visible" ? (
        <WordReveal text={text} isVisible={true} />
      ) : (
        text
      )}
    </motion.h2>
  );
};

const ScrollytellingUnified = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);

  /* ── Scroll tracking ── */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    const frame = Math.round(latest);
    setCurrentFrame(frame);
    if (loaded && frame !== currentFrameRef.current) {
      currentFrameRef.current = frame;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => drawFrame(frame));
    }
  });

  /* ── Derive animation states from frame ── */
  const text1State: "entering" | "visible" | "exiting" | "hidden" =
    currentFrame < 5
      ? "entering"
      : currentFrame <= 70
      ? "visible"
      : currentFrame <= 85
      ? "exiting"
      : "hidden";

  const text2State: "entering" | "visible" | "exiting" | "hidden" =
    currentFrame < 80
      ? "hidden"
      : currentFrame <= 85
      ? "entering"
      : currentFrame <= 140
      ? "visible"
      : currentFrame <= 155
      ? "exiting"
      : "hidden";

  const text3State: "entering" | "visible" | "exiting" | "hidden" =
    currentFrame < 150
      ? "hidden"
      : currentFrame <= 155
      ? "entering"
      : "visible";

  const bottomVisible = currentFrame >= 50;

  /* ── Draw frame ── */
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
      style={{ height: isMobile ? "400vh" : "600vh" }}
    >
      {/* ── Sticky viewport ── */}
      <div className="sticky top-0 w-screen h-screen overflow-hidden bg-black">
        {/* Z-0: Canvas background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: 0 }}
          role="img"
          aria-label="Cinematic transition showing Hoi An from street level rising to an aerial rooftop view, then transitioning to sketch illustration"
        />

        {/* Poster frame while loading */}
        {!loaded && (
          <img
            src={`${SUPABASE_BASE}/frame_0001.webp`}
            crossOrigin="anonymous"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          />
        )}

        {/* Dark vignette overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.6) 100%)",
            zIndex: 1,
          }}
        />

        {/* ── Z-10: Text overlay layer ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 10 }}
        >
          {/* Center text container */}
          <div className="absolute inset-0 flex items-center justify-center text-center px-6">
            <CenterText
              text="We see what others overlook."
              state={text1State}
            />
            <CenterText
              text="To refine the unpolished pieces."
              state={text2State}
            />
            <CenterText
              text="Into a living digital presence."
              state={text3State}
            />
          </div>

          {/* Bottom text container */}
          <motion.div
            className="absolute bottom-10 left-10 right-10 flex justify-between items-end"
            initial={{ opacity: 0, y: 20 }}
            animate={bottomVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <p
              className="text-sm uppercase tracking-widest max-w-[200px]"
              style={{
                fontFamily: "var(--font-body)",
                color: "rgba(249, 250, 251, 0.9)",
              }}
            >
              To Not Just Exist
            </p>
            <p
              className="text-sm uppercase tracking-widest max-w-[400px] text-left"
              style={{
                fontFamily: "var(--font-body)",
                color: "rgba(249, 250, 251, 0.9)",
              }}
            >
              We turn real world expertise into digital experiences that earn
              trust — through strategy, research and digital solutions
            </p>
          </motion.div>
        </div>

        {/* Scroll progress line (desktop) */}
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
              zIndex: 20,
            }}
          >
            <div
              style={{
                width: "100%",
                height: `${(currentFrame / (TOTAL_FRAMES - 1)) * 100}%`,
                background: "rgba(212, 154, 90, 0.4)",
                transition: "height 0.1s linear",
              }}
            />
          </div>
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
