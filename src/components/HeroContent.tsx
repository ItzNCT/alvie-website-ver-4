import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import alvieLogo from "@/assets/alvie-logo.svg";

const navItems = ["Home", "About", "Gallery"];

const megaMenuColumns = [
  { title: "We are ALVIE", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80" },
  { title: "Services", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80" },
  { title: "Blogs", image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80" },
];

const HeroContent = () => {
  const [megaOpen, setMegaOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const aboutTimeout = useRef<ReturnType<typeof setTimeout>>();

  const handleAboutEnter = () => {
    clearTimeout(aboutTimeout.current);
    setMegaOpen(true);
  };

  const handleAboutLeave = () => {
    aboutTimeout.current = setTimeout(() => setMegaOpen(false), 200);
  };

  return (
    <div className="relative z-10 w-full h-screen">
      {/* ─── Vignette + Edge Blur Overlay ─── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      >
        {/* Top edge */}
        <div
          className="absolute top-0 left-0 right-0 h-[30%]"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)",
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(2px)",
            maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
          }}
        />
        {/* Bottom edge */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[35%]"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(2px)",
            maskImage: "linear-gradient(to top, black 0%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 100%)",
          }}
        />
        {/* Left edge */}
        <div
          className="absolute top-0 bottom-0 left-0 w-[25%]"
          style={{
            background: "linear-gradient(to right, rgba(0,0,0,0.45) 0%, transparent 100%)",
            backdropFilter: "blur(1.5px)",
            WebkitBackdropFilter: "blur(1.5px)",
            maskImage: "linear-gradient(to right, black 0%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, black 0%, transparent 100%)",
          }}
        />
        {/* Right edge */}
        <div
          className="absolute top-0 bottom-0 right-0 w-[25%]"
          style={{
            background: "linear-gradient(to left, rgba(0,0,0,0.45) 0%, transparent 100%)",
            backdropFilter: "blur(1.5px)",
            WebkitBackdropFilter: "blur(1.5px)",
            maskImage: "linear-gradient(to left, black 0%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to left, black 0%, transparent 100%)",
          }}
        />
      </div>

      {/* ─── Top-Left: Logo ─── */}
      <div className="absolute top-8 left-10" style={{ zIndex: 5 }}>
        <img
          src={alvieLogo}
          alt="ALVIE"
          className="h-8 brightness-0 invert opacity-90"
        />
      </div>

      {/* ─── Top-Right: Navigation ─── */}
      <div
        ref={navRef}
        className="absolute top-8 right-10"
        style={{ zIndex: 5 }}
      >
        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <div
              key={item}
              className="relative"
              onMouseEnter={item === "About" ? handleAboutEnter : undefined}
              onMouseLeave={item === "About" ? handleAboutLeave : undefined}
            >
              <button
                className="px-4 py-2 text-[13px] font-medium tracking-wide text-[#F9FAFB]/80 hover:text-[#F9FAFB] transition-all duration-300"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {item}
                {item === "About" && (
                  <motion.span
                    className="inline-block ml-1"
                    animate={{ rotate: megaOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    ▾
                  </motion.span>
                )}
              </button>
            </div>
          ))}
          <a
            href="#contact"
            className="ml-2 px-5 py-2 text-[13px] font-medium tracking-wide rounded-full border border-[#F9FAFB]/20 text-[#F9FAFB]/90 hover:bg-[#0F5C4E] hover:border-[#0F5C4E] hover:text-[#F9FAFB] transition-all duration-300 backdrop-blur-sm"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Craft w/ ALVIE
          </a>
        </nav>

        {/* ─── Mega Menu ─── */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="absolute top-full right-0 mt-3 overflow-hidden rounded-xl"
              style={{
                width: navRef.current?.offsetWidth
                  ? `${navRef.current.offsetWidth}px`
                  : "100%",
                background: "rgba(18, 18, 18, 0.75)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(249, 250, 251, 0.08)",
              }}
              onMouseEnter={handleAboutEnter}
              onMouseLeave={handleAboutLeave}
            >
              <div className="grid grid-cols-3 gap-4 p-5">
                {megaMenuColumns.map((col) => (
                  <div key={col.title} className="group cursor-pointer">
                    <div className="overflow-hidden rounded-lg aspect-video mb-3">
                      <img
                        src={col.image}
                        alt={col.title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </div>
                    <p
                      className="text-[13px] font-medium text-[#F9FAFB]/70 group-hover:text-[#F9FAFB] transition-colors duration-300"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {col.title}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── Bottom-Left: Slogan ─── */}
      <div className="absolute bottom-12 left-10" style={{ zIndex: 5 }}>
        <h1
          className="text-6xl font-extrabold leading-none text-[#F9FAFB] tracking-tight"
          style={{
            fontFamily: "var(--font-display)",
            letterSpacing: "-0.03em",
            lineHeight: "1.05",
          }}
        >
          Not Just
          <br />
          Exist
        </h1>
      </div>

      {/* ─── Middle-Right: Tagline ─── */}
      <div
        className="absolute right-10 top-1/2 -translate-y-1/2"
        style={{ zIndex: 5, maxWidth: 320 }}
      >
        <p
          className="text-[15px] text-[#F9FAFB]/75 text-right leading-relaxed font-light"
          style={{ fontFamily: "var(--font-body)" }}
        >
          We bridge the gap between real-world expertise and digital reputation.
        </p>
      </div>

      {/* ─── Bottom-Right: Scroll Indicator ─── */}
      <div
        className="absolute bottom-12 right-10 flex flex-col items-center gap-3"
        style={{ zIndex: 5 }}
      >
        <span
          className="text-[11px] font-medium tracking-[0.2em] text-[#F9FAFB]/50 uppercase"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Scroll
        </span>
        <div className="relative w-px h-12 overflow-hidden bg-[#F9FAFB]/10">
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-[#F9FAFB]/60 to-transparent"
            animate={{ y: ["-50%", "150%"] }}
            transition={{
              duration: 1.8,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
