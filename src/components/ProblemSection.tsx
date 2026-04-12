import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Tab data ── */
const TABS = [
  {
    id: "hesitation",
    title: "The Hesitation",
    body: "You already know this. It's the hesitation you feel before sharing your website. The slight discomfort when a partner asks for your portfolio. If you can sense that gap, your audience feels it too.",
  },
  {
    id: "disconnect",
    title: "The Disconnect",
    body: "You've spent years building something of genuine value. Your team delivers exceptional work. Your clients trust you deeply. But when a new prospect searches for you online, they don't see any of that.",
  },
  {
    id: "cost",
    title: "The Cost",
    body: "This isn't just about aesthetics. An outdated digital presence actively pushes away the partners who would value your work the most. They visit. They judge. They leave. Three seconds. That's all it takes.",
  },
] as const;

/* ── Smooth transition presets ── */
const FADE = { duration: 0.7, ease: [0.4, 0, 0.2, 1] as const };

/* ═══════════════════════════════════════════
   Vignette 1 — Hesitation Typing Bar
   ═══════════════════════════════════════════ */
const HesitationVignette = () => {
  const TEXT = "www.mycom";
  const [display, setDisplay] = useState("");
  const [phase, setPhase] = useState<"typing" | "pause" | "deleting">("typing");
  const idx = useRef(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (idx.current < TEXT.length) {
        timer = setTimeout(() => {
          idx.current += 1;
          setDisplay(TEXT.slice(0, idx.current));
        }, 140 + Math.random() * 80);
      } else {
        timer = setTimeout(() => setPhase("pause"), 100);
      }
    } else if (phase === "pause") {
      timer = setTimeout(() => setPhase("deleting"), 2000);
    } else {
      if (idx.current > 0) {
        timer = setTimeout(() => {
          idx.current -= 1;
          setDisplay(TEXT.slice(0, idx.current));
        }, 60);
      } else {
        timer = setTimeout(() => setPhase("typing"), 800);
      }
    }

    return () => clearTimeout(timer);
  }, [display, phase]);

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-md px-5 py-3 flex items-center gap-3 font-body text-sm">
      <div className="flex gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
      </div>
      <div className="flex-1 bg-white/[0.06] rounded-md px-3 py-1.5 text-[#9CA3AF] tracking-wide">
        {display}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.7 }}
          className="inline-block w-[2px] h-4 bg-[#4EB5A3] ml-0.5 align-middle"
        />
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   Vignette 2 — The Disconnect Scanner
   ═══════════════════════════════════════════ */
const DisconnectVignette = () => (
  <div className="rounded-xl border border-white/10 overflow-hidden relative h-36">
    {/* Real-world half */}
    <div
      className="absolute inset-x-0 top-0 h-1/2"
      style={{
        background:
          "repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 8px)",
        backgroundSize: "100% 8px",
      }}
    >
      <div className="p-3 font-body text-xs text-[#F9FAFB]/60 tracking-wide uppercase">
        Real-World Quality
      </div>
      <div className="mx-3 h-2 rounded bg-[#4EB5A3]/30 w-3/4" />
      <div className="mx-3 mt-1.5 h-2 rounded bg-[#4EB5A3]/20 w-1/2" />
    </div>
    {/* Digital half */}
    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-white/[0.02]">
      <div className="p-3 font-body text-xs text-[#F9FAFB]/30 tracking-wide uppercase">
        Digital Presence
      </div>
      <div className="mx-3 flex gap-2">
        <div className="h-2 rounded bg-white/10 w-1/3" />
        <div className="h-2 rounded bg-white/5 w-1/4" />
      </div>
      <div className="mx-3 mt-1.5 h-2 rounded bg-white/[0.07] w-2/5" />
    </div>
    {/* Scanning line */}
    <motion.div
      className="absolute inset-x-0 h-[1px] bg-[#4EB5A3]/70 shadow-[0_0_12px_rgba(78,181,163,0.5)]"
      animate={{ top: ["0%", "100%", "0%"] }}
      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
    />
  </div>
);

/* ═══════════════════════════════════════════
   Vignette 3 — The Cost (Cursor Abandonment)
   ═══════════════════════════════════════════ */
const CostVignette = () => {
  const CYCLE = 8; // seconds total

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] relative h-36 overflow-hidden">
      {/* Blurred background suggestion */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="px-6 py-2.5 rounded-lg bg-[#4EB5A3]/20 font-body text-sm text-[#4EB5A3] tracking-wide">
          Contact Us
        </div>
      </div>

      {/* Close button */}
      <div className="absolute top-3 right-3 w-5 h-5 rounded-sm border border-white/20 flex items-center justify-center text-white/30 text-xs">
        ✕
      </div>

      {/* Animated cursor */}
      <motion.svg
        width="16"
        height="20"
        viewBox="0 0 16 20"
        className="absolute"
        style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))" }}
        animate={{
          left: ["10%", "48%", "48%", "48%", "90%", "90%", "10%"],
          top: ["20%", "52%", "52%", "52%", "8%", "8%", "20%"],
        }}
        transition={{
          repeat: Infinity,
          duration: CYCLE,
          times: [0, 0.25, 0.4, 0.65, 0.75, 0.9, 1],
          ease: "easeInOut",
        }}
      >
        <path
          d="M0 0L12 10L6 10L9 18L6 19L3 11L0 14Z"
          fill="#F9FAFB"
          stroke="#121212"
          strokeWidth="0.5"
        />
      </motion.svg>

      {/* Ripple at hover point */}
      <motion.div
        className="absolute w-8 h-8 rounded-full border border-[#4EB5A3]/40"
        style={{ left: "calc(48% - 16px)", top: "calc(52% - 16px)" }}
        animate={{
          scale: [0, 2, 0],
          opacity: [0.6, 0, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: CYCLE,
          times: [0.3, 0.6, 0.65],
          ease: "easeOut",
        }}
      />
    </div>
  );
};

const VIGNETTES = [HesitationVignette, DisconnectVignette, CostVignette];

/* ═══════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════ */
const ProblemSection = () => {
  const [active, setActive] = useState(0);

  return (
    <section
      className="canvas-section sticky top-0 h-screen w-full z-0 flex flex-col pt-20 px-8 md:px-16 overflow-hidden"
      style={{ backgroundColor: "#121212" }}
    >
      {/* ── Header ── */}
      <div className="max-w-7xl w-full mx-auto">
        <h2 className="font-display text-4xl md:text-5xl font-normal text-[#F9FAFB] leading-tight">
          Your expertise is real.
        </h2>
        <h2 className="font-display text-4xl md:text-5xl font-extrabold leading-tight" style={{ color: "#4EB5A3" }}>
          Your digital presence isn't.
        </h2>
      </div>

      {/* ── Split layout ── */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 h-full mt-12 pb-12">
        {/* Left column */}
        <div className="md:col-span-5 flex flex-col">
          {/* Tab nav */}
          <div className="flex gap-6 relative pb-3">
            {TABS.map((tab, i) => (
              <button
                key={tab.id}
                onClick={() => setActive(i)}
                className={`font-body text-sm uppercase tracking-widest transition-all duration-300 bg-transparent border-none cursor-pointer relative pb-2 ${
                  active === i ? "text-[#F9FAFB]" : "text-[#F9FAFB]/40"
                }`}
              >
                {tab.title}
                {active === i && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{ backgroundColor: "#4EB5A3" }}
                    transition={{ type: "tween", duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="mt-8 min-h-[120px]">
            <AnimatePresence mode="wait">
              <motion.p
                key={TABS[active].id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={FADE}
                className="font-body text-lg leading-relaxed text-[#9CA3AF]"
              >
                {TABS[active].body}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Vignette */}
          <div className="mt-auto mb-8 min-h-[160px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={TABS[active].id + "-vig"}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={FADE}
              >
                {(() => {
                  const Comp = VIGNETTES[active];
                  return <Comp />;
                })()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right column — image */}
        <div className="md:col-span-7 relative rounded-2xl overflow-hidden hidden md:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0"
            >
              {/* Placeholder image with wabi-sabi texture */}
              <div
                className="w-full h-full"
                style={{
                  background:
                    active === 0
                      ? "linear-gradient(135deg, #1a1a1a 0%, #2a2520 50%, #1a1a1a 100%)"
                      : active === 1
                        ? "linear-gradient(135deg, #1a1a1a 0%, #1f2a28 50%, #1a1a1a 100%)"
                        : "linear-gradient(135deg, #1a1a1a 0%, #2a1f1f 50%, #1a1a1a 100%)",
                }}
              />
              {/* Gradient overlay for seamless blending */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to right, #121212 0%, transparent 30%), linear-gradient(to top, #121212 0%, transparent 40%)",
                }}
              />
              {/* Subtle texture noise */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
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
