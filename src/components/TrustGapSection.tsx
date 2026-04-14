import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ── Card data ── */
const CARDS = [
  { number: "75", text: "Judge a company's credibility based on its website alone.", source: "Stanford, 2023" },
  { number: "70", text: "Of B2B decisions are made online before ever contacting you.", source: "6sense, 2023" },
  { number: "94", text: "Of first impressions are strictly related to design.", source: "Forbes, 2023" },
  { number: "84", text: "Trust websites more than social media profiles.", source: "Dicom Interactive" },
];

export default function TrustGapSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Narrative fade
  const narrativeOpacity = useTransform(scrollYProgress, [0, 0.15, 0.6, 0.85], [1, 1, 0.5, 0.3]);

  // Card transforms — each card slides up and locks in place
  const card0Y = useTransform(scrollYProgress, [0, 0.15], [60, 0]);
  const card0Opacity = useTransform(scrollYProgress, [0, 0.12], [0, 1]);

  const card1Y = useTransform(scrollYProgress, [0.15, 0.35], [120, 0]);
  const card1Opacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);

  const card2Y = useTransform(scrollYProgress, [0.35, 0.55], [120, 0]);
  const card2Opacity = useTransform(scrollYProgress, [0.35, 0.5], [0, 1]);

  const card3Y = useTransform(scrollYProgress, [0.55, 0.75], [120, 0]);
  const card3Opacity = useTransform(scrollYProgress, [0.55, 0.7], [0, 1]);

  // Scale-down + dim for cards underneath
  const card0Scale = useTransform(scrollYProgress, [0.15, 0.35], [1, 0.92]);
  const card0Dim = useTransform(scrollYProgress, [0.15, 0.35], [1, 0.4]);

  const card1Scale = useTransform(scrollYProgress, [0.35, 0.55], [1, 0.95]);
  const card1Dim = useTransform(scrollYProgress, [0.35, 0.55], [1, 0.5]);

  const card2Scale = useTransform(scrollYProgress, [0.55, 0.75], [1, 0.97]);
  const card2Dim = useTransform(scrollYProgress, [0.55, 0.75], [1, 0.6]);

  const cardTransforms = [
    { y: card0Y, opacity: card0Opacity, scale: card0Scale, dim: card0Dim },
    { y: card1Y, opacity: card1Opacity, scale: card1Scale, dim: card1Dim },
    { y: card2Y, opacity: card2Opacity, scale: card2Scale, dim: card2Dim },
    { y: card3Y, opacity: card3Opacity, scale: useTransform(scrollYProgress, [0, 1], [1, 1]), dim: useTransform(scrollYProgress, [0, 1], [1, 1]) },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ zIndex: 20, backgroundColor: "#F9FAFB" }}
    >
      <div className="h-[300vh]">
        {/* Sticky viewport */}
        <div className="sticky top-0 h-screen w-full px-6 md:px-12 lg:px-24 flex items-center">
          {/* Desktop: 12-col grid */}
          <div className="hidden lg:grid grid-cols-12 gap-x-12 w-full">
            {/* Left — The Whisper */}
            <motion.div
              className="col-span-5 self-start"
              style={{
                opacity: narrativeOpacity,
                position: "sticky",
                top: "30vh",
              }}
            >
              <p
                className="font-body"
                style={{
                  fontSize: "clamp(1.5rem, 2.5vw, 2.5rem)",
                  lineHeight: 1.3,
                  letterSpacing: "-0.02em",
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

            {/* Right — The Evidence */}
            <div className="col-span-7 relative" style={{ minHeight: "60vh" }}>
              {CARDS.map((card, i) => (
                <motion.div
                  key={i}
                  className="absolute top-0 left-0 w-full"
                  style={{
                    y: cardTransforms[i].y,
                    opacity: cardTransforms[i].opacity,
                    scale: cardTransforms[i].scale,
                    zIndex: 10 + i,
                  }}
                >
                  <motion.div
                    className="w-full"
                    style={{
                      opacity: cardTransforms[i].dim,
                      backgroundColor: "#FFFFFF",
                      border: "1px solid rgba(229, 231, 235, 0.5)",
                      borderRadius: "2px",
                      padding: "clamp(40px, 5vw, 64px)",
                    }}
                  >
                    <span
                      className="font-display block"
                      style={{
                        fontSize: "clamp(5rem, 12vw, 12rem)",
                        lineHeight: 0.8,
                        letterSpacing: "-0.05em",
                        fontWeight: 800,
                        color: "#0F5C4E",
                      }}
                    >
                      {card.number}%
                    </span>

                    <p
                      className="font-body mt-8"
                      style={{
                        fontSize: "clamp(1.125rem, 1.5vw, 1.5rem)",
                        lineHeight: 1.5,
                        color: "#4B5563",
                        maxWidth: "28rem",
                      }}
                    >
                      {card.text}
                    </p>

                    <p
                      className="font-body mt-4"
                      style={{
                        fontSize: "0.75rem",
                        color: "#9CA3AF",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      {card.source}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile layout */}
          <div className="lg:hidden flex flex-col gap-16 w-full py-20">
            <motion.p
              className="font-body"
              style={{
                opacity: narrativeOpacity,
                fontSize: "clamp(1.25rem, 5vw, 1.75rem)",
                lineHeight: 1.35,
                letterSpacing: "-0.02em",
              }}
            >
              <span style={{ color: "#111827", fontWeight: 500 }}>
                You've probably noticed this before. The hesitation to share your website or business materials.
              </span>{" "}
              <span style={{ color: "#6B7280", fontWeight: 400 }}>
                Because you know that your digital platforms don't accurately represent the quality of your operations. If you recognize this inconsistency, the market observes it as well.
              </span>
            </motion.p>

            <div className="flex flex-col gap-8">
              {CARDS.map((card, i) => (
                <div
                  key={i}
                  className="w-full"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid rgba(229, 231, 235, 0.5)",
                    borderRadius: "2px",
                    padding: "clamp(32px, 8vw, 48px)",
                  }}
                >
                  <span
                    className="font-display block"
                    style={{
                      fontSize: "clamp(4rem, 18vw, 8rem)",
                      lineHeight: 0.8,
                      letterSpacing: "-0.05em",
                      fontWeight: 800,
                      color: "#0F5C4E",
                    }}
                  >
                    {card.number}%
                  </span>

                  <p
                    className="font-body mt-6"
                    style={{
                      fontSize: "1.125rem",
                      lineHeight: 1.5,
                      color: "#4B5563",
                    }}
                  >
                    {card.text}
                  </p>

                  <p
                    className="font-body mt-3"
                    style={{
                      fontSize: "0.75rem",
                      color: "#9CA3AF",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {card.source}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
