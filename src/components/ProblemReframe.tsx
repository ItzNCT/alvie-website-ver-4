import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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

const ProblemReframe = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const y = useTransform(scrollYProgress, [0.5, 0.85], ["100vh", "0vh"]);

  return (
    <section ref={containerRef} className="relative" style={{ height: "200vh", marginTop: "-100vh" }}>
      <motion.div
        className="sticky top-0 w-screen h-screen overflow-hidden"
        style={{
          zIndex: 40,
          y,
          background: "#F9FAFB",
        }}
      >
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
            <div className="flex items-start">
              <p
                className="md:pt-1 my-[50px] text-justify text-lg font-normal"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "18px",
                  fontWeight: 400,
                  lineHeight: "1.7",
                  color: "#6B7280",
                  maxWidth: "540px",
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
      </motion.div>
    </section>
  );
};

export default ProblemReframe;
