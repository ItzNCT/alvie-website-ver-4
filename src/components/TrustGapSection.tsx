import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import frame1Img from "@/assets/trust-gap-frame1.jpg";
import cloverImg from "@/assets/trust-gap-clover.jpg";

/* ── CountUp hook ── */
const useCountUp = (
  target: number,
  inView: boolean,
  duration = 1500
) => {
  const [value, setValue] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!inView || hasRun.current) return;
    hasRun.current = true;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out: 1 - (1 - p)^3
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return value;
};

/* ── Copy ── */
const PARAGRAPHS = [
  "You've probably noticed this before. The hesitation to share your website or business materials. Because you know that your digital platforms don't accurately represent the quality of your operations. If you recognize this inconsistency, the market observes it as well. ⁽¹⁾",
  "This isn't about vanity. It's about the conversations that never happen. The partnerships that quietly go to someone else. The clients who needed exactly what you offer—but chose a competitor whose online presence felt more trustworthy. You may never know how many opportunities walked away before they even knocked on your door. ⁽²⁾",
  "The good news: nothing about your actual work needs to change. Your expertise, your values, your track record—they're already there. They just need to be seen. What needs to change is how the digital world experiences who you really are.",
];

const EASE = [0.16, 1, 0.3, 1] as const;

/* ── Stat Card 1: Glassmorphism over image ── */
const StatFrame1 = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const count = useCountUp(75, inView);

  return (
    <div ref={ref} className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden">
      <img
        src={frame1Img}
        alt="Vietnamese alleyway at golden hour"
        loading="lazy"
        width={800}
        height={1024}
        className="absolute inset-0 w-full h-full object-cover alvie-photo"
      />
      {/* Glassmorphism card */}
      <div className="absolute inset-x-6 bottom-6 md:inset-x-8 md:bottom-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE as unknown as number[] }}
          className="rounded-xl p-6 md:p-8"
          style={{
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(24px) saturate(1.4)",
            WebkitBackdropFilter: "blur(24px) saturate(1.4)",
            border: "1px solid rgba(255,255,255,0.18)",
          }}
        >
          <span
            className="font-display block"
            style={{
              fontSize: "clamp(56px, 8vw, 88px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1,
              color: "#F9FAFB",
            }}
          >
            {count}%
          </span>
          <p
            className="font-body mt-3"
            style={{
              fontSize: 14,
              lineHeight: 1.6,
              fontWeight: 300,
              color: "rgba(249,250,251,0.8)",
              maxWidth: 320,
            }}
          >
            of people judge a company's credibility based on its website alone.
            <span className="block mt-1 opacity-60" style={{ fontSize: 12 }}>
              — Stanford University
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

/* ── Stat Frame 2: Typographic stat ── */
const StatFrame2 = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const count = useCountUp(70, inView);

  return (
    <div
      ref={ref}
      className="w-full flex flex-col justify-center"
      style={{ minHeight: "60vh" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: EASE as unknown as number[] }}
      >
        <span
          className="font-display block"
          style={{
            fontSize: "clamp(80px, 12vw, 160px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 0.9,
            color: "#0F5C4E",
          }}
        >
          {count}%
        </span>
        <p
          className="font-body mt-6"
          style={{
            fontSize: "clamp(14px, 1.2vw, 17px)",
            lineHeight: 1.7,
            fontWeight: 300,
            color: "#6B7280",
            maxWidth: 400,
          }}
        >
          of the buying decision is completed before a client ever contacts you.
          <span className="block mt-2 opacity-60" style={{ fontSize: 12 }}>
            — 6sense / Gartner, 2024
          </span>
        </p>
      </motion.div>
    </div>
  );
};

/* ── Frame 3: Clover image ── */
const StatFrame3 = () => (
  <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden">
    <img
      src={cloverImg}
      alt="Four-leaf clover with morning dew"
      loading="lazy"
      width={800}
      height={1024}
      className="absolute inset-0 w-full h-full object-cover alvie-photo"
    />
  </div>
);

/* ── Main Section ── */
const TrustGapSection = () => {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const frameRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

  // Track which frame is most visible
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersection ratio
        let maxRatio = 0;
        let maxIdx = activeIndex;
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute("data-frame-idx"));
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            maxIdx = idx;
          }
        });
        if (maxRatio > 0.1) setActiveIndex(maxIdx);
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        rootMargin: "-20% 0px -20% 0px",
      }
    );

    frameRefs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, [isMobile]);

  // Section header reveal
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-10%" });

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ background: "#F9FAFB" }}
    >
      {/* ── Section Header ── */}
      <div
        ref={headerRef}
        className="w-full px-6 md:px-16"
        style={{ paddingTop: 128, paddingBottom: 128 }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            className="font-display"
            initial={{ opacity: 0, y: 32 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE as unknown as number[] }}
            style={{
              fontSize: "clamp(28px, 4vw, 52px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "#111827",
            }}
          >
            Your expertise is real.
            <br />
            <span style={{ color: "#6B7280" }}>
              Your online presence tells a different story.
            </span>
          </motion.h2>
        </div>
      </div>

      {/* ── Asymmetric Split ── */}
      <div className="w-full px-6 md:px-16 pb-32">
        <div
          className="max-w-7xl mx-auto"
          style={{
            display: isMobile ? "flex" : "grid",
            flexDirection: isMobile ? "column" : undefined,
            gridTemplateColumns: isMobile ? undefined : "2fr 3fr",
            gap: isMobile ? 64 : 80,
          }}
        >
          {/* ── Left Column (Sticky on desktop) ── */}
          <div
            className={isMobile ? "" : "relative"}
            style={
              isMobile
                ? {}
                : {
                    position: "sticky" as const,
                    top: 0,
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                  }
            }
          >
            <div className="flex flex-col gap-0" style={{ maxWidth: 440 }}>
              {PARAGRAPHS.map((text, i) => {
                if (isMobile) {
                  return (
                    <div key={i} className="mb-16">
                      <p
                        className="font-body"
                        style={{
                          fontSize: "clamp(15px, 1.3vw, 17px)",
                          lineHeight: 1.7,
                          fontWeight: 300,
                          color: "#111827",
                        }}
                      >
                        {text}
                      </p>
                      {/* Mobile: frame directly below paragraph */}
                      <div className="mt-10">
                        {i === 0 && <StatFrame1 />}
                        {i === 1 && <StatFrame2 />}
                        {i === 2 && <StatFrame3 />}
                      </div>
                    </div>
                  );
                }

                return (
                  <motion.p
                    key={i}
                    className="font-body absolute top-0 left-0 w-full"
                    animate={{
                      opacity: activeIndex === i ? 1 : 0.15,
                    }}
                    transition={{
                      duration: 0.6,
                      ease: EASE as unknown as number[],
                    }}
                    style={{
                      fontSize: "clamp(15px, 1.2vw, 17px)",
                      lineHeight: 1.7,
                      fontWeight: 300,
                      color: "#111827",
                      position: "absolute",
                    }}
                  >
                    {text}
                  </motion.p>
                );
              })}
            </div>
          </div>

          {/* ── Right Column (Scrolling frames, desktop only) ── */}
          {!isMobile && (
            <div ref={rightColRef} className="flex flex-col gap-32">
              <div ref={frameRefs[0]} data-frame-idx={0}>
                <StatFrame1 />
              </div>
              <div ref={frameRefs[1]} data-frame-idx={1}>
                <StatFrame2 />
              </div>
              <div ref={frameRefs[2]} data-frame-idx={2}>
                <StatFrame3 />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TrustGapSection;
