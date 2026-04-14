import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ProblemReframe = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["100vh", "0vh"]);

  return (
    <section ref={containerRef} className="relative" style={{ height: "200vh" }}>
      <motion.div
        className="sticky top-0 w-screen h-screen overflow-hidden"
        style={{
          zIndex: 40,
          y,
          background: "hsl(var(--background))",
        }}
      >
        {/* Blank canvas — content goes here */}
        <div className="w-full h-full flex items-center justify-center">
          <p
            className="text-sm uppercase tracking-widest"
            style={{
              fontFamily: "var(--font-body)",
              color: "hsl(var(--muted-foreground))",
            }}
          >
            Problem Reframe — blank canvas
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default ProblemReframe;
