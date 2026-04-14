import { useRef, useEffect, useState, useCallback } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Data ── */
const CARDS = [
  {
    number: "75%",
    fact: "Judge a company's credibility based on its website alone.",
    source: "— Stanford, 2023",
  },
  {
    number: "70%",
    fact: "Of consumers say a poorly designed website makes them distrust a brand.",
    source: "— Blue Corona, 2023",
  },
  {
    number: "94%",
    fact: "Of first impressions are design-related, not content-related.",
    source: "— ResearchGate, 2022",
  },
  {
    number: "84%",
    fact: "Of people believe a website makes a business more credible than social media.",
    source: "— Verisign, 2023",
  },
];

/* ── Spotlight Card ── */
const DataCard = ({
  card,
  mouseX,
  mouseY,
}: {
  card: (typeof CARDS)[0];
  mouseX: number;
  mouseY: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [localX, setLocalX] = useState(0);
  const [localY, setLocalY] = useState(0);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setLocalX(mouseX - rect.left);
    setLocalY(mouseY - rect.top);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={cardRef}
      className="relative w-[350px] lg:w-[450px] shrink-0 mr-12 rounded-2xl overflow-hidden"
      style={
        {
          "--mouse-x": `${localX}px`,
          "--mouse-y": `${localY}px`,
        } as React.CSSProperties
      }
    >
      {/* Base layer */}
      <div className="relative bg-[#1E1E1E]/40 backdrop-blur-md border border-[#2D3748] p-10 h-full">
        <p
          className="font-display leading-[1.1] tracking-[-0.03em] text-[#2D3748]"
          style={{ fontSize: "clamp(100px, 10vw, 160px)" }}
        >
          {card.number}
        </p>
        <div className="h-[1px] w-12 bg-[#2D3748] my-6" />
        <p className="font-body text-base leading-relaxed text-[#9CA3AF]">
          {card.fact}
        </p>
        <span className="absolute bottom-6 right-6 font-body text-xs tracking-widest text-[#6B7280]">
          {card.source}
        </span>
      </div>

      {/* Spotlight reveal layer */}
      <div
        className="absolute inset-0 bg-[#1E1E1E]/80 backdrop-blur-md border border-[#2D3748] p-10 pointer-events-none"
        style={{
          maskImage:
            "radial-gradient(circle 150px at var(--mouse-x) var(--mouse-y), black, transparent)",
          WebkitMaskImage:
            "radial-gradient(circle 150px at var(--mouse-x) var(--mouse-y), black, transparent)",
        }}
      >
        <p
          className="font-display leading-[1.1] tracking-[-0.03em] text-[#4EB5A3]"
          style={{ fontSize: "clamp(100px, 10vw, 160px)" }}
        >
          {card.number}
        </p>
        <div className="h-[1px] w-12 bg-[#4EB5A3]/40 my-6" />
        <p className="font-body text-base leading-relaxed text-[#F9FAFB]">
          {card.fact}
        </p>
        <span className="absolute bottom-6 right-6 font-body text-xs tracking-widest text-[#9CA3AF]">
          {card.source}
        </span>
      </div>
    </div>
  );
};

/* ── Mobile Card ── */
const MobileCard = ({ card, index }: { card: (typeof CARDS)[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "start 50%"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className="relative bg-[#1E1E1E]/40 backdrop-blur-md border border-[#2D3748] p-8 rounded-2xl"
    >
      <p
        className="font-display leading-[1.1] tracking-[-0.03em] text-[#4EB5A3]"
        style={{ fontSize: "clamp(64px, 15vw, 100px)" }}
      >
        {card.number}
      </p>
      <div className="h-[1px] w-12 bg-[#2D3748] my-5" />
      <p className="font-body text-sm leading-relaxed text-[#9CA3AF]">
        {card.fact}
      </p>
      <span className="font-body text-[11px] tracking-widest text-[#6B7280] mt-4 block text-right">
        {card.source}
      </span>
    </motion.div>
  );
};

/* ── Main Section ── */
const TrustGapSection = () => {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouse = useCallback((e: React.MouseEvent) => {
    setMouse({ x: e.clientX, y: e.clientY });
  }, []);

  /* ── GSAP horizontal scroll (desktop only) ── */
  useEffect(() => {
    if (isMobile) return;

    const section = sectionRef.current;
    const pinned = pinnedRef.current;
    const track = trackRef.current;
    const intro = introRef.current;
    if (!section || !pinned || !track || !intro) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
          pin: false, // we use CSS sticky instead
        },
      });

      // Horizontal track movement
      tl.fromTo(
        track,
        { x: "10vw" },
        { x: "-150vw", ease: "none", duration: 1 },
        0.05
      );

      // Intro blur/fade
      tl.to(
        intro,
        {
          opacity: 0.3,
          filter: "blur(4px)",
          ease: "power3.out",
          duration: 0.4,
        },
        0.15
      );
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  /* ── Desktop ── */
  if (!isMobile) {
    return (
      <section
        id="trust-gap"
        ref={sectionRef}
        className="relative w-full bg-[#121212] text-[#F9FAFB] overflow-hidden"
        style={{ height: "300vh" }}
      >
        {/* Grain overlay */}
        <div
          className="fixed inset-0 pointer-events-none z-[1]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            opacity: 0.02,
            mixBlendMode: "overlay",
          }}
        />

        {/* Sticky viewport */}
        <div
          ref={pinnedRef}
          className="sticky top-0 h-screen w-full flex items-center"
          onMouseMove={handleMouse}
          style={{ cursor: "none" }}
        >
          {/* Custom cursor */}
          <div
            className="fixed pointer-events-none z-50 rounded-full border border-[#F9FAFB]/30"
            style={{
              width: 40,
              height: 40,
              left: mouse.x - 20,
              top: mouse.y - 20,
              mixBlendMode: "difference",
              transition: "transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />

          {/* Grid container */}
          <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 h-full grid grid-cols-12 gap-6 relative">
            {/* Component A: Observer Intro */}
            <div
              ref={introRef}
              className="col-span-12 lg:col-span-4 flex flex-col justify-center"
            >
              <p className="font-body text-xs uppercase tracking-widest text-[#9CA3AF] mb-6">
                [ OBSERVATION 01 : THE DISCONNECT ]
              </p>
              <h2
                className="font-display font-bold leading-[1.1] tracking-[-0.03em] text-[#F9FAFB] mb-8"
                style={{ fontSize: "clamp(48px, 5vw, 80px)" }}
              >
                The Silent
                <br />
                Judgment.
              </h2>
              <p className="font-body text-lg leading-relaxed text-[#9CA3AF] max-w-md">
                You hesitate to share your digital platforms, knowing they pale
                in comparison to your real-world excellence. It is a quiet
                frustration. But if you feel this disconnect, your market has
                already observed it.
              </p>
            </div>

            {/* Component B: Horizontal Track */}
            <div className="col-span-12 lg:col-span-8 lg:col-start-5 flex items-center overflow-visible">
              <div ref={trackRef} className="flex items-center will-change-transform">
                {CARDS.map((card, i) => (
                  <DataCard
                    key={i}
                    card={card}
                    mouseX={mouse.x}
                    mouseY={mouse.y}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ── Mobile ── */
  return (
    <section
      id="trust-gap"
      className="relative w-full bg-[#121212] text-[#F9FAFB] overflow-hidden py-20 px-6"
    >
      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          opacity: 0.02,
          mixBlendMode: "overlay",
        }}
      />

      <div className="relative z-10 max-w-lg mx-auto">
        {/* Intro */}
        <p className="font-body text-xs uppercase tracking-widest text-[#9CA3AF] mb-6">
          [ OBSERVATION 01 : THE DISCONNECT ]
        </p>
        <h2
          className="font-display font-bold leading-[1.1] tracking-[-0.03em] text-[#F9FAFB] mb-6"
          style={{ fontSize: "clamp(36px, 10vw, 56px)" }}
        >
          The Silent Judgment.
        </h2>
        <p className="font-body text-base leading-relaxed text-[#9CA3AF] mb-14">
          You hesitate to share your digital platforms, knowing they pale in
          comparison to your real-world excellence. It is a quiet frustration.
          But if you feel this disconnect, your market has already observed it.
        </p>

        {/* Stacked cards */}
        <div className="flex flex-col gap-8">
          {CARDS.map((card, i) => (
            <MobileCard key={i} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustGapSection;
