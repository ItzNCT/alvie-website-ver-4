import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const CARDS = [
  { number: "75", text: "Judge a company's credibility based on its website alone.", source: "Stanford, 2023" },
  { number: "70", text: "Of B2B decisions are made online before ever contacting you.", source: "6sense, 2023" },
  { number: "94", text: "Of first impressions are strictly related to design.", source: "Forbes, 2023" },
  { number: "84", text: "Trust websites more than social media profiles.", source: "Dicom Interactive" },
];

function EvidenceCard({
  card,
  index,
  scrollYProgress,
}: {
  card: typeof CARDS[0];
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const stickyTops = ["15vh", "25vh", "35vh", "45vh"];

  // Each card gets dimmed/scaled when the next card overlaps it
  const segmentStart = 0.15 + index * 0.2;
  const segmentEnd = segmentStart + 0.2;

  const isLastCard = index === CARDS.length - 1;

  const cardScale = useTransform(
    scrollYProgress,
    isLastCard ? [0, 1] : [segmentStart, segmentEnd],
    isLastCard ? [1, 1] : [1, 0.95]
  );
  const cardDim = useTransform(
    scrollYProgress,
    isLastCard ? [0, 1] : [segmentStart, segmentEnd],
    isLastCard ? [1, 1] : [1, 0.4]
  );

  return (
    <div
      className="lg:sticky w-full"
      style={{
        top: stickyTops[index],
        zIndex: 10 + index,
        marginBottom: "50vh",
      }}
    >
      <motion.div
        style={{
          scale: cardScale,
          opacity: cardDim,
          backgroundColor: "#FFFFFF",
          border: "1px solid #E5E7EB",
          borderRadius: "2px",
          padding: "clamp(2rem, 5vw, 4rem)",
          boxShadow: "0 20px 40px -10px rgba(15, 92, 78, 0.04)",
        }}
      >
        {/* Number */}
        <span
          className="font-display block"
          style={{
            fontSize: "clamp(5rem, 10vw, 12rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            fontWeight: 800,
            color: "#0F5C4E",
          }}
        >
          {card.number}%
        </span>

        {/* Description */}
        <p
          className="font-body"
          style={{
            fontSize: "clamp(1.125rem, 1.5vw, 1.5rem)",
            lineHeight: 1.4,
            color: "#111827",
            marginTop: "clamp(1rem, 2vw, 1.5rem)",
          }}
        >
          {card.text}
        </p>

        {/* Source */}
        <span
          className="font-body block"
          style={{
            fontSize: "0.875rem",
            color: "#6B7280",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginTop: "clamp(1.5rem, 3vw, 2rem)",
          }}
        >
          {card.source}
        </span>
      </motion.div>
    </div>
  );
}

export default function TrustGapSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const narrativeOpacity = useTransform(scrollYProgress, [0, 0.2, 0.6, 0.85], [1, 1, 0.5, 0.3]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{
        zIndex: 20,
        backgroundColor: "#F9FAFB",
        minHeight: "400vh",
      }}
    >
      <div
        className="max-w-none w-full"
        style={{
          padding: `clamp(8rem, 15vh, 16rem) clamp(2rem, 6vw, 8rem) 0`,
        }}
      >
        {/* Desktop grid */}
        <div
          className="hidden lg:grid relative"
          style={{
            gridTemplateColumns: "repeat(12, 1fr)",
            columnGap: "clamp(4rem, 8vw, 10rem)",
          }}
        >
          {/* Left — The Whisper */}
          <div className="col-span-5">
            <motion.p
              className="font-body lg:sticky"
              style={{
                top: "clamp(20vh, 30vh, 40vh)",
                maxHeight: "60vh",
                opacity: narrativeOpacity,
                fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
                lineHeight: 1.6,
                letterSpacing: "-0.01em",
              }}
            >
              <span style={{ color: "#111827", fontWeight: 500 }}>
                You've probably noticed this before. The hesitation to share your website or business materials.
              </span>{" "}
              <span style={{ color: "#6B7280", fontWeight: 400 }}>
                Because you know that your digital platforms don't accurately represent the quality of your operations. If you recognize this inconsistency, the market observes it as well.
              </span>
            </motion.p>
          </div>

          {/* Right — The Evidence */}
          <div className="col-span-7">
            {CARDS.map((card, i) => (
              <EvidenceCard
                key={i}
                card={card}
                index={i}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>

        {/* Mobile */}
        <div className="lg:hidden flex flex-col" style={{ gap: "clamp(2rem, 6vw, 4rem)" }}>
          <p
            className="font-body"
            style={{
              fontSize: "clamp(1.15rem, 4.5vw, 1.5rem)",
              lineHeight: 1.5,
              letterSpacing: "-0.01em",
            }}
          >
            <span style={{ color: "#111827", fontWeight: 500 }}>
              You've probably noticed this before. The hesitation to share your website or business materials.
            </span>{" "}
            <span style={{ color: "#6B7280", fontWeight: 400 }}>
              Because you know that your digital platforms don't accurately represent the quality of your operations. If you recognize this inconsistency, the market observes it as well.
            </span>
          </p>

          {CARDS.map((card, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: "2px",
                padding: "clamp(2rem, 6vw, 3rem)",
                boxShadow: "0 20px 40px -10px rgba(15, 92, 78, 0.04)",
              }}
            >
              <span
                className="font-display block"
                style={{
                  fontSize: "clamp(4rem, 18vw, 7rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  fontWeight: 800,
                  color: "#0F5C4E",
                }}
              >
                {card.number}%
              </span>
              <p
                className="font-body"
                style={{
                  fontSize: "clamp(1rem, 4vw, 1.25rem)",
                  lineHeight: 1.4,
                  color: "#111827",
                  marginTop: "clamp(0.75rem, 2vw, 1rem)",
                }}
              >
                {card.text}
              </p>
              <span
                className="font-body block"
                style={{
                  fontSize: "0.75rem",
                  color: "#6B7280",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginTop: "clamp(1rem, 3vw, 1.5rem)",
                }}
              >
                {card.source}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
