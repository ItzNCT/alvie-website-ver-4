import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import useReducedMotion from "@/hooks/useReducedMotion";

interface ParallaxBreathProps {
  imageSrc: string;
  closingLine1: string;
  closingLine2: string;
  sectionNumber: string;
  reducedMotion?: boolean;
}

const ease = [0.4, 0, 0.2, 1] as const;

const ParallaxBreath = ({
  imageSrc,
  closingLine1,
  closingLine2,
  sectionNumber,
  reducedMotion: reducedMotionProp,
}: ParallaxBreathProps) => {
  const isMobile = useIsMobile();
  const hookReduced = useReducedMotion();
  const prefersReducedMotion = reducedMotionProp ?? hookReduced;
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;
    let ctx: any;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const image = imageRef.current;
      if (!section || !image) return;

      ctx = gsap.context(() => {
        gsap.fromTo(
          image,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }, section);
    };

    init();
    return () => ctx?.revert();
  }, [prefersReducedMotion]);

  const fade = (delay: number, duration = 0.6, y = 16) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y } as const,
          whileInView: { opacity: 1, y: 0 } as const,
          viewport: { once: true, amount: 0.4 } as const,
          transition: { duration, delay, ease },
        };

  const fadeOnly = (delay: number, duration = 0.5) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0 } as const,
          whileInView: { opacity: 1 } as const,
          viewport: { once: true, amount: 0.4 } as const,
          transition: { duration, delay, ease },
        };

  return (
    <section
      ref={sectionRef}
      className="relative w-screen overflow-hidden"
      style={{ height: isMobile ? "45vh" : "70vh" }}
    >
      {/* Parallax image */}
      <img
        ref={imageRef}
        src={imageSrc}
        alt="A dimly lit doorway revealing a warm artisan workspace — the beauty within, partially hidden"
        className="alvie-photo absolute inset-0 w-full object-cover pointer-events-none"
        style={{ height: "120%" }}
      />

      {/* Vignette overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)",
        }}
      />

      {/* Closing text */}
      <div
        className="absolute z-[2]"
        style={{
          bottom: isMobile ? 32 : 64,
          left: isMobile ? 24 : 48,
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: isMobile ? 22 : "clamp(24px, 3vw, 40px)",
          color: "#F9FAFB",
          lineHeight: 1.2,
          letterSpacing: "-0.02em",
          maxWidth: 500,
          textShadow: "0 2px 20px rgba(0,0,0,0.3)",
        }}
      >
        <motion.span className="block" {...fade(0, 0.6)}>
          {closingLine1}
        </motion.span>
        <motion.span className="block" {...fade(0.2, 0.6)}>
          {closingLine2}
        </motion.span>
      </div>

      {/* Section number */}
      <motion.span
        className="absolute z-[2]"
        style={{
          top: isMobile ? 32 : 48,
          right: isMobile ? 24 : 48,
          fontFamily: "var(--font-body)",
          fontWeight: 400,
          fontSize: 13,
          color: "rgba(249, 250, 251, 0.35)",
          letterSpacing: "0.1em",
        }}
        {...fadeOnly(0.1)}
      >
        {sectionNumber}
      </motion.span>
    </section>
  );
};

export default ParallaxBreath;
