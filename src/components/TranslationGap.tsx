import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import problemImage from "@/assets/problem-statement-image.webp";

const TranslationGap = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Image scaling: 0–60% of scroll
  const imageScale = useTransform(scrollYProgress, [0, 0.6], [0.4, 1]);
  const imageBorderRadius = useTransform(scrollYProgress, [0, 0.6], [24, 0]);
  const imageWidth = useTransform(scrollYProgress, [0, 0.6], ["50vw", "100vw"]);
  const imageHeight = useTransform(scrollYProgress, [0, 0.6], ["50vh", "100vh"]);

  // Text 1: fade in at 65–80%
  const text1Opacity = useTransform(scrollYProgress, [0.6, 0.75], [0, 1]);
  const text1Y = useTransform(scrollYProgress, [0.6, 0.75], [20, 0]);

  // Text 2: fade in at 78–90%
  const text2Opacity = useTransform(scrollYProgress, [0.75, 0.88], [0, 1]);
  const text2Y = useTransform(scrollYProgress, [0.75, 0.88], [20, 0]);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: "400vh" }}
    >
      <div className="sticky top-0 w-screen h-screen overflow-hidden flex items-center justify-center bg-black">
        {/* Image container */}
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

        {/* Text overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
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
      </div>
    </section>
  );
};

export default TranslationGap;
