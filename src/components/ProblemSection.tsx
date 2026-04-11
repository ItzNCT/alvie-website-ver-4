import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ───── Tab Data ───── */
const TABS = [
  {
    label: "The Hesitation",
    content:
      "You already know this. It's the hesitation you feel before sharing your website. The slight discomfort when a partner asks for your portfolio. If you can sense that gap, your audience feels it too.",
  },
  {
    label: "The Disconnect",
    content:
      "You've spent years building something of genuine value. Your team delivers exceptional work. Your clients trust you deeply. But when a new prospect searches for you online, they don't see any of that.",
  },
  {
    label: "The Cost",
    content:
      "This isn't just about aesthetics. An outdated digital presence actively pushes away the partners who would value your work the most. They visit. They judge. They leave. Three seconds. That's all it takes.",
  },
];

const TRANSITION = { duration: 0.7, ease: [0.4, 0, 0.2, 1] as const };

/* ═══════════════════════════════════════════════
   Vignette 1 – The Hesitation (typing address bar)
   ═══════════════════════════════════════════════ */
const HesitationVignette = () => {
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");
  const TARGET = "www.mycom";
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const clear = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };

    if (phase === "typing") {
      if (text.length < TARGET.length) {
        timerRef.current = setTimeout(
          () => setText(TARGET.slice(0, text.length + 1)),
          120 + Math.random() * 80
        );
      } else {
        timerRef.current = setTimeout(() => setPhase("pausing"), 100);
      }
    } else if (phase === "pausing") {
      timerRef.current = setTimeout(() => setPhase("deleting"), 2000);
    } else if (phase === "deleting") {
      if (text.length > 0) {
        timerRef.current = setTimeout(
          () => setText((t) => t.slice(0, -1)),
          60
        );
      } else {
        timerRef.current = setTimeout(() => setPhase("typing"), 800);
      }
    }

    return clear;
  }, [text, phase]);

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
        </div>
      </div>
      <div className="rounded-lg bg-white/[0.06] px-4 py-2.5 font-body text-sm text-[#9CA3AF] flex items-center min-h-[36px]">
        <span>{text}</span>
        <span className="w-[2px] h-4 bg-[#4EB5A3] ml-[1px] animate-pulse" />
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   Vignette 2 – The Disconnect (split + scan line)
   ═══════════════════════════════════════════════ */
const DisconnectVignette = () => (
  <div className="rounded-xl border border-white/10 overflow-hidden relative h-[140px]">
    {/* Real-world half */}
    <div
      className="absolute inset-x-0 top-0 h-1/2"
      style={{
        background:
          "repeating-linear-gradient(135deg, rgba(78,181,163,0.08) 0px, rgba(78,181,163,0.08) 1px, transparent 1px, transparent 12px)",
        backgroundColor: "rgba(249,250,251,0.04)",
      }}
    >
      <div className="p-3 font-body text-xs text-[#F9FAFB]/60 tracking-wide uppercase">
        Real-world quality
      </div>
    </div>
    {/* Digital half */}
    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-white/[0.02]">
      <div className="p-3 flex flex-col gap-1.5">
        <div className="h-2 w-3/4 bg-white/10 rounded" />
        <div className="h-2 w-1/2 bg-white/[0.06] rounded" />
        <div className="h-2 w-2/3 bg-white/[0.04] rounded" />
      </div>
    </div>
    {/* Scan line */}
    <motion.div
      className="absolute inset-x-0 h-[1px] bg-[#4EB5A3]/60"
      animate={{ top: ["30%", "70%", "30%"] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

/* ═══════════════════════════════════════════════
   Vignette 3 – The Cost (cursor → leave)
   ═══════════════════════════════════════════════ */
const CostVignette = () => {
  const CYCLE = 8; // seconds

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm relative h-[140px] overflow-hidden">
      {/* Blurred bg elements */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="px-5 py-2 rounded-md bg-[#4EB5A3]/20 text-[#4EB5A3] font-body text-sm">
          Contact Us
        </div>
      </div>
      {/* Close icon */}
      <div className="absolute top-3 right-3 text-white/30 text-xs">✕</div>

      {/* Cursor */}
      <motion.svg
        width="16"
        height="20"
        viewBox="0 0 16 20"
        fill="none"
        className="absolute"
        animate={{
          left: ["20%", "48%", "48%", "48%", "90%", "90%"],
          top: ["70%", "50%", "50%", "50%", "10%", "10%"],
          opacity: [0, 1, 1, 1, 1, 0],
        }}
        transition={{
          duration: CYCLE,
          repeat: Infinity,
          times: [0, 0.25, 0.5, 0.65, 0.8, 1],
          ease: "easeInOut",
        }}
      >
        <path
          d="M1 1L1 14L4.5 10.5L8.5 17L10.5 16L6.5 9L11.5 9L1 1Z"
          fill="white"
          stroke="black"
          strokeWidth="0.5"
        />
      </motion.svg>

      {/* Ripple at button */}
      <motion.div
        className="absolute rounded-full border border-[#4EB5A3]/40"
        style={{ left: "calc(50% - 12px)", top: "calc(50% - 12px)" }}
        animate={{
          width: [0, 24, 24],
          height: [0, 24, 24],
          opacity: [0.6, 0, 0],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatDelay: CYCLE - 1,
          delay: 4,
          ease: "easeOut",
        }}
      />
    </div>
  );
};

const VIGNETTES = [HesitationVignette, DisconnectVignette, CostVignette];

/* ═══════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════ */
const ProblemSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const ActiveVignette = VIGNETTES[activeTab];

  return (
    <section
      className="sticky top-0 h-screen w-full flex flex-col pt-20 px-8 md:px-16 overflow-hidden"
      style={{ backgroundColor: "#121212", zIndex: 0 }}
    >
      {/* ─── Header ─── */}
      <div className="max-w-7xl mx-auto w-full">
        <h2
          className="text-4xl md:text-5xl font-normal leading-tight"
          style={{ fontFamily: "var(--font-display)", color: "#F9FAFB" }}
        >
          Your expertise is real.
        </h2>
        <h2
          className="text-4xl md:text-5xl font-extrabold leading-tight"
          style={{ fontFamily: "var(--font-display)", color: "#4EB5A3" }}
        >
          Your digital presence isn't.
        </h2>
      </div>

      {/* ─── Split Layout ─── */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 h-full mt-12 pb-12">
        {/* Left Column */}
        <div className="md:col-span-5 flex flex-col">
          {/* Tab Nav */}
          <div className="flex gap-6 relative mb-8">
            {TABS.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(i)}
                className="relative pb-3 font-body text-sm uppercase tracking-widest transition-opacity duration-300"
                style={{
                  color: "#F9FAFB",
                  opacity: activeTab === i ? 1 : 0.4,
                }}
              >
                {tab.label}
                {activeTab === i && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{ backgroundColor: "#4EB5A3" }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[120px] mb-8">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={TRANSITION}
                className="text-lg leading-relaxed font-body"
                style={{ color: "#9CA3AF" }}
              >
                {TABS[activeTab].content}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Feature Vignette */}
          <div className="mt-auto mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={TRANSITION}
              >
                <ActiveVignette />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column – Image */}
        <div className="md:col-span-7 relative rounded-2xl overflow-hidden hidden md:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <div
                className="w-full h-full"
                style={{
                  background:
                    activeTab === 0
                      ? "linear-gradient(135deg, rgba(78,181,163,0.08) 0%, rgba(18,18,18,1) 60%)"
                      : activeTab === 1
                        ? "linear-gradient(135deg, rgba(78,181,163,0.12) 0%, rgba(18,18,18,1) 70%)"
                        : "linear-gradient(135deg, rgba(78,181,163,0.05) 0%, rgba(18,18,18,1) 50%)",
                }}
              />
              {/* Organic texture overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "repeating-conic-gradient(rgba(249,250,251,0.015) 0% 25%, transparent 0% 50%) 0 0 / 60px 60px",
                }}
              />
              {/* Bottom fade */}
              <div
                className="absolute inset-x-0 bottom-0 h-1/3"
                style={{
                  background:
                    "linear-gradient(to top, #121212, transparent)",
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
