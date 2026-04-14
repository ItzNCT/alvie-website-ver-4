import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

/* ── Card data ── */
const CARDS = [
  { number: 75, text: "Judge a company's credibility based on its website alone.", source: "Stanford, 2023" },
  { number: 70, text: "Of B2B decisions are made online before ever contacting you.", source: "6sense, 2023" },
  { number: 94, text: "Of first impressions are strictly related to design.", source: "Forbes, 2023" },
  { number: 84, text: "Trust websites more than social media profiles.", source: "Dicom Interactive" },
];

const STICKY_TOPS = ["15vh", "25vh", "35vh", "45vh"];

/* ── CountUp hook ── */
function useCountUp(target: number, trigger: boolean, duration = 1500) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger) {
      setValue(0);
      return;
    }
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [trigger, target, duration]);

  return value;
}

/* ── Evidence Card ── */
function EvidenceCard({
  card,
  index,
  scrollProgress,
}: {
  card: typeof CARDS[0];
  index: number;
  scrollProgress: ReturnType<typeof useTransform<number, number>>;
}) {
  const [isSticky, setIsSticky] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Trigger countup when card enters its sticky zone
  // Each card occupies roughly 1/5 of the scroll (with overlap)
  const enterThreshold = 0.1 + index * 0.18;

  useMotionValueEvent(scrollProgress, "change", (v) => {
    if (v >= enterThreshold && !isSticky) setIsSticky(true);
  });

  const count = useCountUp(card.number, isSticky);

  return (
    <div
      ref={cardRef}
      className="lg:sticky w-full"
      style={{
        top: STICKY_TOPS[index],
        zIndex: 10 + index,
      }}
    >
      <div
        className="rounded-2xl w-full flex flex-col justify-between"
        style={{
          minHeight: "35vh",
          padding: "clamp(32px, 4vw, 64px)",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 20px 40px -10px rgba(15, 92, 78, 0.04)",
        }}
      >
        {/* Number */}
        <div>
          <span
            className="font-display font-extrabold block"
            style={{
              fontSize: "clamp(4rem, 8vw, 8rem)",
              lineHeight: "110%",
              letterSpacing: "-0.02em",
              color: "#0F5C4E",
            }}
          >
            {count}%
          </span>
        </div>

        {/* Text + Source */}
        <div className="mt-auto">
          <p
            className="font-body"
            style={{
              fontSize: "clamp(1rem, 1.2vw + 0.25rem, 1.25rem)",
              lineHeight: 1.5,
              color: "#111827",
              maxWidth: "480px",
            }}
          >
            {card.text}
          </p>
          <p
            className="font-body mt-3"
            style={{
              fontSize: "0.8rem",
              color: "#6B7280",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {card.source}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Main Section ── */
export default function TrustGapSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Dim the narrative text as user reaches cards 3/4
  const narrativeOpacity = useTransform(scrollYProgress, [0, 0.3, 0.65, 0.85], [1, 1, 0.5, 0.3]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{
        zIndex: 20,
        backgroundColor: "#F9FAFB",
      }}
    >
      {/* Scroll height driver */}
      <div style={{ minHeight: "350vh" }}>
        {/* Sticky viewport */}
        <div
          className="lg:sticky lg:top-0 w-full"
          style={{
            minHeight: "100vh",
            padding: `clamp(120px, 15vh, 240px) clamp(40px, 8vw, 120px)`,
          }}
        >
          {/* Grid */}
          <div
            className="grid w-full h-full gap-8"
            style={{
              gridTemplateColumns: "1fr",
            }}
          >
            {/* Desktop grid */}
            <div
              className="hidden lg:grid w-full"
              style={{
                gridTemplateColumns: "35% 15% 50%",
              }}
            >
              {/* Left Column — Narrative */}
              <motion.div
                className="lg:sticky flex items-start"
                style={{
                  top: "clamp(20vh, 30vh, 40vh)",
                  maxHeight: "60vh",
                  opacity: narrativeOpacity,
                  alignSelf: "start",
                }}
              >
                <p
                  className="font-body"
                  style={{
                    fontSize: "clamp(1.25rem, 1.5vw + 0.5rem, 1.75rem)",
                    lineHeight: 1.6,
                  }}
                >
                  <span style={{ color: "#111827", fontWeight: 500 }}>
                    You've probably noticed this before. The hesitation to share your website or business materials.
                  </span>{" "}
                  <span style={{ color: "#6B7280", fontWeight: 400 }}>
                    Because you know that your digital platforms don't accurately represent the quality of your operations. If you recognize this inconsistency, the market observes it as well.
                  </span>
                </p>
              </motion.div>

              {/* Gap column */}
              <div />

              {/* Right Column — Card Stack */}
              <div className="flex flex-col gap-6">
                {CARDS.map((card, i) => (
                  <EvidenceCard
                    key={i}
                    card={card}
                    index={i}
                    scrollProgress={scrollYProgress}
                  />
                ))}
              </div>
            </div>

            {/* Mobile layout */}
            <div className="lg:hidden flex flex-col gap-10">
              {/* Narrative */}
              <motion.div style={{ opacity: narrativeOpacity }}>
                <p
                  className="font-body"
                  style={{
                    fontSize: "clamp(1.15rem, 4vw, 1.5rem)",
                    lineHeight: 1.6,
                  }}
                >
                  <span style={{ color: "#111827", fontWeight: 500 }}>
                    You've probably noticed this before. The hesitation to share your website or business materials.
                  </span>{" "}
                  <span style={{ color: "#6B7280", fontWeight: 400 }}>
                    Because you know that your digital platforms don't accurately represent the quality of your operations. If you recognize this inconsistency, the market observes it as well.
                  </span>
                </p>
              </motion.div>

              {/* Cards */}
              <div className="flex flex-col gap-6">
                {CARDS.map((card, i) => (
                  <EvidenceCard
                    key={i}
                    card={card}
                    index={i}
                    scrollProgress={scrollYProgress}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
