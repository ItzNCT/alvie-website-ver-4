import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import problemImage from "@/assets/problem-statement-image.webp";

const stats = [
  {
    number: "75",
    description:
      "of potential partners judge your true credibility based solely on your website's presence.",
    reference: "(Stanford, 2023)",
  },
  {
    number: "94",
    description:
      "of first impressions are quietly formed by the visual authenticity of your digital design.",
    reference: "(Forbes, 2023)",
  },
  {
    number: "84",
    description:
      "of consumers trust a grounded, dedicated website far more than fleeting social media facades.",
    reference: "(Dicom Interactive)",
  },
];

const text1 = "The gap isn't about technology or capability. It's about translation. Your real-world excellence has never been properly translated into digital language.";
const text2 = "That's where we come in.";

const WordReveal = ({
  text,
  revealed,
  startDelay,
  wordInterval = 0.08,
  style,
}: {
  text: string;
  revealed: boolean;
  startDelay: number;
  wordInterval?: number;
  style?: React.CSSProperties;
}) => {
  const words = text.split(" ");
  return (
    <p style={style}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 12 }}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{
            duration: 0.4,
            delay: startDelay + i * wordInterval,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </p>
  );
};

const ProblemReframe = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // Curtain slide up (kept scroll-driven)
  const y = useTransform(scrollYProgress, [0.15, 0.35], ["100vh", "0vh"]);

  // Trigger image reveal at scroll threshold
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.55 && !revealed) {
      setRevealed(true);
    }
  });

  const text1WordCount = text1.split(" ").length;
  const text2StartDelay = 1.8 + text1WordCount * 0.08 + 0.3;

  return (
    <section ref={containerRef} className="relative" style={{ height: "300vh", marginTop: "-100vh" }}>
      <motion.div
        className="sticky top-0 w-screen h-screen overflow-hidden"
        style={{
          zIndex: 40,
          y,
          background: "#F9FAFB",
        }}
      >
        {/* Trust Gap content */}
        <div className="w-full h-full flex flex-col justify-center max-w-[1200px] mx-auto px-6">
          {/* Top row: Overline + Headline | Body text */}
          <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-8 md:gap-16 mb-16 md:mb-24">
            {/* Left column */}
            <div>
              <p
                className="text-sm uppercase tracking-widest mb-6 flex items-center gap-3"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "#6B7280",
                  letterSpacing: "0.15em",
                }}
              >
                The Reality
                <span
                  className="inline-block"
                  style={{
                    width: "24px",
                    height: "1px",
                    backgroundColor: "#6B7280",
                  }}
                />
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "64px",
                  fontWeight: 700,
                  lineHeight: "110%",
                  letterSpacing: "-0.02em",
                  color: "#0F5C4E",
                }}
              >
                The Trust
                <br />
                Gap.
              </h2>
            </div>

            {/* Right column */}
            <div className="flex items-end">
              <p
                className="text-lg font-normal text-justify"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "18px",
                  fontWeight: 400,
                  lineHeight: "1.7",
                  color: "#6B7280",
                  textIndent: "2em",
                }}
              >
                You've probably noticed this before. The hesitation to share
                your website or business materials. Because you know that your
                digital platforms don't accurately represent the quality of your
                operations. If you recognize this inconsistency, the market
                observes it as well.
              </p>
            </div>
          </div>

          {/* Bottom row: Three stat columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "64px",
                    fontWeight: 400,
                    lineHeight: "1",
                    letterSpacing: "-0.02em",
                    color: "#0F5C4E",
                  }}
                >
                  {stat.number}
                  <span style={{ fontSize: "36px" }}>%</span>
                </p>
                <p
                  className="mt-4"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "1.6",
                    color: "#6B7280",
                  }}
                >
                  {stat.description}
                </p>
                <p
                  className="mt-2"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    fontWeight: 400,
                    color: "#9CA3AF",
                  }}
                >
                  {stat.reference}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Auto-playing image reveal */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 50 }}
        >
          <motion.div
            className="relative overflow-hidden"
            initial={{ width: "6vw", height: "6vw", borderRadius: "50%", scale: 0.03 }}
            animate={
              revealed
                ? { width: "100vw", height: "100vh", borderRadius: "0%", scale: 1 }
                : { width: "6vw", height: "6vw", borderRadius: "50%", scale: 0.03 }
            }
            transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <img
              src={problemImage}
              alt="Rice field landscape representing the translation gap"
              className="alvie-photo-dark w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Text overlay — word-by-word after image reveal */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 60 }}
        >
          <div className="text-center px-6" style={{ maxWidth: "800px" }}>
            <WordReveal
              text={text1}
              revealed={revealed}
              startDelay={1.8}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "32px",
                fontWeight: 300,
                lineHeight: 1.5,
                color: "#F9FAFB",
              }}
            />

            <WordReveal
              text={text2}
              revealed={revealed}
              startDelay={text2StartDelay}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "32px",
                fontWeight: 700,
                lineHeight: 1.5,
                color: "#D49A5A",
                letterSpacing: "0.02em",
                marginTop: "48px",
              }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ProblemReframe;
