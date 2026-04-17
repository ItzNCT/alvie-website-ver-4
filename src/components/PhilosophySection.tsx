import { motion } from "framer-motion";
import useReducedMotion from "@/hooks/useReducedMotion";

type Pillar = {
  numeral: string;
  title: string;
  body: string;
};

const PILLARS: Pillar[] = [
  {
    numeral: "01",
    title: "Show, don't tell",
    body:
      "We let the work speak. No buzzwords, no manufactured urgency. Clarity is the highest form of craft.",
  },
  {
    numeral: "02",
    title: "Empathy as method",
    body:
      "Before strategy, we listen. Every decision starts with understanding what you've already built and what you're trying to protect.",
  },
  {
    numeral: "03",
    title: "Craft over noise",
    body:
      "Every pixel, every transition, every word earns its place. If it doesn't serve the story, it doesn't ship.",
  },
];

const EASE = [0.4, 0, 0.2, 1] as const;

const PhilosophySection = () => {
  const reduced = useReducedMotion();

  return (
    <section
      style={{
        background: "#121212",
        padding: "128px 48px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gap: "64px",
        }}
        className="md:!grid-cols-[2fr_3fr] md:!gap-24 grid-cols-1"
      >
        {/* Left: overline + sticky headline */}
        <motion.aside
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="md:sticky md:self-start"
          style={{ top: "25vh" }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "14px",
              fontWeight: 400,
              color: "#9CA3AF",
              marginBottom: "32px",
            }}
          >
            — our philosophy
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "64px",
              fontWeight: 700,
              lineHeight: "110%",
              letterSpacing: "-0.02em",
              color: "#F9FAFB",
              margin: 0,
            }}
          >
            Three quiet principles that shape everything we make.
          </h2>
        </motion.aside>

        {/* Right: pillars */}
        <div style={{ display: "flex", flexDirection: "column", gap: "64px" }}>
          {PILLARS.map((p, i) => (
            <motion.article
              key={p.numeral}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
              whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.6,
                ease: EASE,
                delay: i * 0.12,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "32px",
                  fontWeight: 700,
                  color: "#4EB5A3",
                  lineHeight: 1,
                }}
              >
                {p.numeral}
              </div>
              <div
                style={{
                  width: "32px",
                  height: "1px",
                  background: "#2D3748",
                  margin: "16px 0",
                }}
              />
              <h3
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "24px",
                  fontWeight: 500,
                  color: "#F9FAFB",
                  margin: "0 0 12px 0",
                  lineHeight: 1.3,
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "16px",
                  fontWeight: 300,
                  lineHeight: "170%",
                  color: "#9CA3AF",
                  maxWidth: "480px",
                  margin: 0,
                }}
              >
                {p.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
