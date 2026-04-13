import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

/* ── Animated counter ── */
const CountUp = ({
  target,
  suffix = "",
  active,
  duration = 1600,
}: {
  target: number;
  suffix?: string;
  active: boolean;
  duration?: number;
}) => {
  const [value, setValue] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!active || hasRun.current) return;
    hasRun.current = true;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);

  return (
    <span>
      {value}
      {suffix}
    </span>
  );
};

/* ── Right-column content block ── */
const ContentBlock = ({
  body,
  stat,
  citation,
  index,
  activeIndex,
}: {
  body: string;
  stat?: { target: number; suffix: string };
  citation?: string;
  index: number;
  activeIndex: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isActive = index === activeIndex;

  return (
    <div
      ref={ref}
      className="transition-opacity"
      style={{
        opacity: isActive ? 1 : 0.2,
        transitionDuration: "800ms",
        transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
      }}
    >
      <p
        className="font-body text-foreground/80"
        style={{
          fontSize: "clamp(15px, 1.2vw, 17px)",
          lineHeight: 1.85,
          maxWidth: 540,
        }}
      >
        {body}
      </p>

      {stat && (
        <div className="mt-10">
          <span
            className="font-display font-extrabold block"
            style={{
              fontSize: "clamp(48px, 6vw, 80px)",
              lineHeight: 1,
              color: "hsl(var(--secondary))",
              letterSpacing: "-0.03em",
            }}
          >
            <CountUp target={stat.target} suffix={stat.suffix} active={isActive} />
          </span>
          {citation && (
            <p
              className="font-body mt-4"
              style={{
                fontSize: 13,
                lineHeight: 1.6,
                color: "hsl(var(--muted-foreground))",
                maxWidth: 400,
              }}
            >
              {citation}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

/* ── CONTENT DATA ── */
const BLOCKS = [
  {
    body: "You've spent years perfecting what you do. Your clients trust you. Your team delivers real results every single day. But right now, someone is searching for exactly what you offer. They find your website. And in less than a second, they've already formed an opinion about your entire business.",
    stat: { target: 75, suffix: "%" },
    citation:
      "of people judge a company's credibility based on its website alone. — Stanford University",
  },
  {
    body: "This isn't about vanity. It's about the conversations that never happen. The partnerships that quietly go to someone else. The clients who needed exactly what you offer — but chose a competitor whose online presence felt more trustworthy. You may never know how many opportunities walked away before they even knocked on your door.",
    stat: { target: 70, suffix: "%" },
    citation:
      "B2B buyers complete 70% of their decision before ever contacting you. — 6sense / Gartner, 2024",
  },
  {
    body: "The good news: nothing about your actual work needs to change. Your expertise, your values, your track record — they're already there. They just need to be seen. What needs to change is how the digital world experiences who you really are.",
  },
];

/* ── Main component ── */
const TrustGap = () => {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  /* ── White curtain slide-up ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });
  const curtainY = useTransform(scrollYProgress, [0, 1], ["8%", "0%"]);

  /* ── IntersectionObserver for block focus ── */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    blockRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(i);
        },
        {
          rootMargin: "-40% 0px -40% 0px",
          threshold: 0.01,
        }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const setBlockRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      blockRefs.current[index] = el;
    },
    []
  );

  return (
    <motion.section
      ref={sectionRef}
      className="relative canvas-section"
      style={{
        zIndex: 20,
        backgroundColor: "hsl(var(--background))",
        y: curtainY,
      }}
    >
      <div
        className={`mx-auto w-full ${
          isMobile ? "px-6 py-20" : "px-12 py-32"
        }`}
        style={{ maxWidth: 1440 }}
      >
        {/* Grid */}
        <div
          className={`${
            isMobile
              ? "flex flex-col gap-16"
              : "grid gap-16"
          }`}
          style={
            isMobile
              ? undefined
              : { gridTemplateColumns: "2fr 3fr" }
          }
        >
          {/* ── Left Column (Sticky) ── */}
          <div
            className={isMobile ? "" : "sticky self-start"}
            style={isMobile ? undefined : { top: "20vh" }}
          >
            {/* Section label */}
            <span
              className="font-body font-semibold uppercase block mb-6"
              style={{
                fontSize: 12,
                letterSpacing: "0.1em",
                color: "hsl(var(--secondary))",
              }}
            >
              The Trust Gap
            </span>

            {/* Headline */}
            <h2
              className="font-display font-bold"
              style={{
                fontSize: "clamp(28px, 3.5vw, 48px)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: "hsl(var(--foreground))",
                maxWidth: 420,
              }}
            >
              Your expertise is real. Your online presence tells a different story.
            </h2>

            {/* Accent line */}
            <div
              className="mt-8"
              style={{
                width: 48,
                height: 2,
                backgroundColor: "hsl(var(--secondary))",
              }}
            />
          </div>

          {/* ── Right Column (Scrolling) ── */}
          <div ref={rightColRef} className="flex flex-col" style={{ gap: isMobile ? 80 : "20vh" }}>
            {BLOCKS.map((block, i) => (
              <div key={i} ref={setBlockRef(i)}>
                <ContentBlock
                  body={block.body}
                  stat={block.stat}
                  citation={block.citation}
                  index={i}
                  activeIndex={activeIndex}
                />
              </div>
            ))}

            {/* Transition line */}
            <div
              className="text-center py-20"
              style={{
                opacity: activeIndex === BLOCKS.length - 1 ? 1 : 0.2,
                transition: "opacity 800ms cubic-bezier(0.25, 1, 0.5, 1)",
              }}
            >
              <p
                className="font-display font-bold"
                style={{
                  fontSize: "clamp(24px, 3vw, 40px)",
                  color: "hsl(var(--foreground))",
                  letterSpacing: "-0.02em",
                }}
              >
                That's where we come in.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default TrustGap;
