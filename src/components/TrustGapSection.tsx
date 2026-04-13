import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

/* ── Scroll-driven word reveal ── */
const WordReveal = ({
  text,
  scrollYProgress,
  startAt,
  endAt,
  className,
}: {
  text: string;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  startAt: number;
  endAt: number;
  className?: string;
}) => {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => {
        const wordStart = startAt + (i / words.length) * (endAt - startAt);
        const wordEnd = wordStart + (endAt - startAt) / words.length;
        return <RevealWord key={i} word={word} progress={scrollYProgress} start={wordStart} end={wordEnd} />;
      })}
    </span>
  );
};

const RevealWord = ({
  word,
  progress,
  start,
  end,
}: {
  word: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
}) => {
  const opacity = useTransform(progress, [start, end], [0, 1], { clamp: true });
  const y = useTransform(progress, [start, end], [20, 0], { clamp: true });

  return (
    <motion.span className="inline-block mr-[0.3em]" style={{ opacity, y }}>
      {word}
    </motion.span>
  );
};

/* ── Count-up stat ── */
const CountUpStat = ({ value, suffix = "%" }: { value: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let frame: number;
    const duration = 1800;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, value]);

  return (
    <span
      ref={ref}
      className="inline-block transition-[filter] duration-700"
      style={{ filter: isInView ? "blur(0px)" : "blur(8px)" }}
    >
      {display}{suffix}
    </span>
  );
};

/* ── Content block ── */
const ContentBlock = ({
  label,
  body,
  statValue,
  statSubtext,
  closingLine,
}: {
  label: string;
  body: string;
  statValue?: number;
  statSubtext?: string;
  closingLine?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col gap-8"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
    >
      <p
        className="font-body text-xs uppercase tracking-[0.2em] font-semibold"
        style={{ color: "#0F5C4E" }}
      >
        {label}
      </p>

      <p className="font-body text-base md:text-lg leading-relaxed" style={{ color: "#6B7280" }}>
        {body}
      </p>

      {statValue !== undefined && (
        <div className="py-8 border-t border-b" style={{ borderColor: "#E5E7EB" }}>
          <p className="font-display text-6xl md:text-7xl font-bold leading-none" style={{ color: "#0F5C4E" }}>
            <CountUpStat value={statValue} />
          </p>
          {statSubtext && (
            <p className="font-body text-sm mt-4 leading-relaxed" style={{ color: "#6B7280" }}>
              {statSubtext}
            </p>
          )}
        </div>
      )}

      {closingLine && (
        <p
          className="font-body text-lg md:text-xl font-semibold text-center pt-8"
          style={{ color: "#0F5C4E" }}
        >
          {closingLine}
        </p>
      )}
    </motion.div>
  );
};

/* ── Main section ── */
const TrustGapSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Uncover entrance
  const { scrollYProgress: enterProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });
  const translateY = useTransform(enterProgress, [0, 1], ["30%", "0%"]);

  // Word reveal tied to section scroll
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <motion.section
      ref={sectionRef}
      className="relative z-20"
      style={{
        y: translateY,
        backgroundColor: "#F9FAFB",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-24 md:py-32 flex flex-col md:flex-row gap-16 md:gap-20">
        {/* Left — Sticky headline */}
        <div className="w-full md:w-[40%] h-fit md:sticky md:top-32">
          <WordReveal
            text="Your expertise is real. Your online presence tells a different story."
            scrollYProgress={sectionProgress}
            startAt={0.05}
            endAt={0.25}
            className="font-display text-4xl md:text-5xl font-bold leading-tight block"
          />
        </div>

        {/* Right — Scrolling blocks */}
        <div className="w-full md:w-[60%] flex flex-col gap-32 md:gap-48">
          <ContentBlock
            label="The reality"
            body="You've spent years perfecting what you do. Your clients trust you. Your team delivers real results every single day. But right now, someone is searching for exactly what you offer. They find your website. And in less than a second, they've already formed an opinion about your entire business."
            statValue={75}
            statSubtext="of people judge a company's credibility based on its website alone. — Stanford University"
          />

          <ContentBlock
            label="The silent cost"
            body="This isn't about vanity. It's about the conversations that never happen. The partnerships that quietly go to someone else. The clients who needed exactly what you offer — but chose a competitor whose online presence felt more trustworthy."
            statValue={70}
            statSubtext="B2B buyers complete 70% of their decision before ever contacting you. — 6sense / Gartner, 2024"
          />

          <ContentBlock
            label="The turning point"
            body="The good news: nothing about your actual work needs to change. Your expertise, your values, your track record — they're already there. They just need to be seen. What needs to change is how the digital world experiences who you really are."
            closingLine="That's where we come in."
          />
        </div>
      </div>
    </motion.section>
  );
};

export default TrustGapSection;
