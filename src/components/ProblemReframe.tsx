import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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

const ProblemReframe = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // Curtain slide up: adjusted for longer scroll
  const y = useTransform(scrollYProgress, [0.22, 0.38], ["100vh", "0vh"]);

  // Image reveal: circle below stats → larger circle → square → full-bleed
  const imageWidth = useTransform(scrollYProgress, [0.55, 0.65, 0.78], ["6vw", "50vw", "100vw"]);
  const imageHeight = useTransform(scrollYProgress, [0.55, 0.65, 0.78], ["6vw", "50vh", "100vh"]);
  const imageBorderRadius = useTransform(scrollYProgress, [0.55, 0.65, 0.78], ["50%", "50%", "0%"]);
  // Shift origin from bottom to center as image grows
  const imageBottom = useTransform(scrollYProgress, [0.55, 0.65, 0.78], ["10%", "5%", "0%"]);

  // Text fade-ins
  const text1Opacity = useTransform(scrollYProgress, [0.8, 0.9], [0, 1]);
  const text1Y = useTransform(scrollYProgress, [0.8, 0.9], [20, 0]);
  const text2Opacity = useTransform(scrollYProgress, [0.88, 0.95], [0, 1]);
  const text2Y = useTransform(scrollYProgress, [0.88, 0.95], [20, 0]);

  return (
    <section ref={containerRef} className="relative" style={{ height: "450vh", marginTop: "-100vh" }}>
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

        {/* Image overlay — scales from dot to full-bleed */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 50 }}
        >
          <motion.div
            className="relative overflow-hidden"
            style={{
              width: imageWidth,
              height: imageHeight,
              borderRadius: imageBorderRadius,
              scale: imageScale,
            }}
          >
            <img
              src={problemImage}
              alt="Rice field landscape representing the translation gap"
              className="alvie-photo w-full h-full object-cover"
            />
            {/* Vignette overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Text overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 60 }}
        >
          <div className="text-center px-6" style={{ maxWidth: "640px" }}>
            <motion.p
              style={{
                opacity: text1Opacity,
                y: text1Y,
                fontFamily: "var(--font-body)",
                fontSize: "20px",
                fontWeight: 300,
                lineHeight: 1.8,
                color: "#F9FAFB",
              }}
            >
              The gap isn't about technology or capability. It's about
              translation. Your real-world excellence has never been properly
              translated into digital language.
            </motion.p>

            <motion.p
              style={{
                opacity: text2Opacity,
                y: text2Y,
                fontFamily: "var(--font-display)",
                fontSize: "18px",
                fontWeight: 700,
                lineHeight: 1.6,
                color: "#D49A5A",
                letterSpacing: "0.02em",
                marginTop: "32px",
              }}
            >
              That's where we come in.
            </motion.p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ProblemReframe;
