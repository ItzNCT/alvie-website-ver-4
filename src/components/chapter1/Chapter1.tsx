import { motion } from "framer-motion";
import useReducedMotion from "@/hooks/useReducedMotion";
import ChapterOverline from "./ChapterOverline";
import ProblemAccordion from "./ProblemAccordion";
import ParallaxBreath from "./ParallaxBreath";

const accordionItems = [
  {
    number: "01",
    title: "The Invisible Expert",
    body: "You might be running a large-scale operation with deep expertise and genuine value. Your clients trust you in person. But when a potential partner searches for you online, they find an outdated website that looks nothing like the business you've built.\n\nThe gap isn't just cosmetic. It's structural.",
  },
  {
    number: "02",
    title: "The First Impression Tax",
    body: "Modern clients verify everything online before they negotiate. An outdated digital presence doesn't just look bad — it actively contradicts your real-world credibility. Every day that gap exists, valuable opportunities quietly walk away.\n\nYou're paying a tax you can't see.",
  },
  {
    number: "03",
    title: "The Hidden Cost",
    body: "When your digital reputation falls behind your actual capabilities, trust erodes before a conversation begins. Partners hesitate. Clients second-guess. The credibility you've earned in person gets erased by a single Google search.\n\nThis is the problem we exist to close.",
  },
];

const ease = [0.4, 0, 0.2, 1] as const;

/* SVG noise texture as data URI — extremely subtle papery grain */
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`;

const Chapter1 = () => {
  const reduced = useReducedMotion();

  const fade = (delay: number, duration = 0.5, y = 16) =>
    reduced
      ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 },
          transition: { duration, delay, ease },
        };

  const scaleFade = (delay: number, duration = 0.8) =>
    reduced
      ? { initial: { scaleY: 1 }, animate: { scaleY: 1 } }
      : {
          initial: { scaleY: 0 },
          whileInView: { scaleY: 1 },
          viewport: { once: true, amount: 0.2 },
          transition: { duration, delay, ease },
        };

  /* Horizontal scale for mobile decorative line */
  const scaleXFade = (delay: number, duration = 0.8) =>
    reduced
      ? { initial: { scaleX: 1 }, animate: { scaleX: 1 } }
      : {
          initial: { scaleX: 0 },
          whileInView: { scaleX: 1 },
          viewport: { once: true, amount: 0.2 },
          transition: { duration, delay, ease },
        };

  return (
    <section
      className="relative z-[2]"
      style={{
        backgroundColor: "#F9FAFB",
        borderRadius: "24px 24px 0 0",
        boxShadow: "0 -20px 60px rgba(0,0,0,0.15)",
      }}
    >
      {/* Zone A: Problem Statement */}
      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-12 pt-20 md:pt-24 lg:pt-[120px] pb-24">
        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: NOISE_SVG,
            backgroundRepeat: "repeat",
            opacity: 0.025,
          }}
          aria-hidden="true"
        />

        <div className="relative z-[1] grid grid-cols-1 lg:grid-cols-[5fr_6fr] gap-x-16">
          {/* Left column */}
          <div className="lg:sticky lg:top-[calc(50vh-120px)] lg:self-start mb-12 lg:mb-0 md:text-center lg:text-left">
            <motion.div {...fade(0, 0.4, 12)}>
              <ChapterOverline number="01" label="The Trust Gap" />
            </motion.div>

            <h2
              className="mt-6"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(28px, 3.5vw, 52px)",
                lineHeight: 1.15,
                letterSpacing: "-0.025em",
              }}
            >
              <motion.span {...fade(0.15, 0.5)} style={{ color: "#111827" }} className="block">
                You've built something remarkable.
              </motion.span>
              <motion.span {...fade(0.3, 0.5)} style={{ color: "#6B7280" }} className="block">
                But online, no one can tell.
              </motion.span>
            </h2>

            {/* Decorative line — vertical on desktop, horizontal on mobile/tablet */}
            <motion.div
              className="hidden lg:block mt-8"
              style={{
                width: 1.5,
                height: 64,
                background: "linear-gradient(to bottom, rgba(15, 92, 78, 0.25), transparent)",
                transformOrigin: "top",
              }}
              {...scaleFade(0.6)}
            />
            <motion.div
              className="lg:hidden mt-6 md:mx-auto"
              style={{
                width: 64,
                height: 1.5,
                background: "linear-gradient(to right, rgba(15, 92, 78, 0.25), transparent)",
                transformOrigin: "left",
              }}
              {...scaleXFade(0.6)}
            />
          </div>

          {/* Right column */}
          <div>
            <motion.p
              className="mb-12 md:mx-auto md:text-center lg:mx-0 lg:text-left"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                fontSize: "clamp(15px, 1.1vw, 17px)",
                lineHeight: 1.75,
                color: "#6B7280",
                maxWidth: 520,
              }}
              {...fade(0.2, 0.5, 12)}
            >
              There's a quiet crisis in business today. Companies with decades of
              expertise — real, verified, hard-won capability — are invisible
              where it matters most.
            </motion.p>

            <ProblemAccordion items={accordionItems} defaultOpen={0} reducedMotion={reduced} />
          </div>
        </div>
      </div>

      {/* Zone B: Parallax Breath */}
      <ParallaxBreath
        imageSrc="/images/CinematicHeaderBridgeTheNecessity.webp"
        closingLine1="The distance between what you are"
        closingLine2="and what the world sees."
        sectionNumber="01"
        reducedMotion={reduced}
      />
    </section>
  );
};

export default Chapter1;
