import { useRef, useEffect } from "react";

const STATEMENT =
  "ALVIE bridge the trust gap create by the disconnection of real-world expertise and digital reputation to display founder's true value to the audience.";

const ScrollytellingTextOverlay = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const words = STATEMENT.split(/\s+/);

  useEffect(() => {
    let ctx: any;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const track = document.querySelector(".scrollytelling-track");
      if (!track || !containerRef.current) return;

      ctx = gsap.context(() => {
        const wordEls = gsap.utils.toArray<HTMLElement>(".st-word");

        /* Phase 1: Word-by-word reveal (0–40% of track) */
        wordEls.forEach((el, i) => {
          const startP = 5 + (i / wordEls.length) * 35;
          const endP = startP + 3;
          gsap.fromTo(
            el,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: track,
                start: `${startP}% top`,
                end: `${endP}% top`,
                scrub: 0.3,
              },
            }
          );
        });

        /* Phase 1: Filter dimming (0–40%) */
        if (filterRef.current) {
          gsap.fromTo(
            filterRef.current,
            { opacity: 0 },
            {
              opacity: 1,
              scrollTrigger: {
                trigger: track,
                start: "5% top",
                end: "40% top",
                scrub: 0.5,
              },
            }
          );
        }

        /* Phase 1 end: Explanation fade-in (38–45%) */
        if (bottomRef.current) {
          gsap.fromTo(
            bottomRef.current,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: track,
                start: "38% top",
                end: "45% top",
                scrub: 0.5,
              },
            }
          );
        }

        /* Phase 2: Global fade-out (50–70%) */
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            opacity: 0,
            scrollTrigger: {
              trigger: track,
              start: "50% top",
              end: "70% top",
              scrub: 0.5,
            },
          });
        }
      });
    };

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none flex items-center justify-center"
      style={{ zIndex: 10 }}
    >
      {/* ─── Cinematic Filter ─── */}
      <div
        ref={filterRef}
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,0,0,0.65) 0%, transparent 65%)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          maskImage:
            "radial-gradient(circle at center, black 30%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 30%, transparent 70%)",
          opacity: 0,
        }}
      />

      {/* ─── Text Container ─── */}
      <div className="max-w-5xl w-full mx-auto px-6 text-left relative" style={{ zIndex: 2 }}>
        {/* Top Part: Large Statement */}
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight"
          style={{
            fontFamily: "var(--font-display)",
            color: "#F9FAFB",
            letterSpacing: "-0.02em",
          }}
        >
          {words.map((word, i) => (
            <span
              key={i}
              className="st-word inline-block mr-[0.3em]"
              style={{ opacity: 0 }}
            >
              {word}
            </span>
          ))}
        </h2>

        {/* Bottom Part: Explanation Grid */}
        <div
          ref={bottomRef}
          className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-8"
          style={{ opacity: 0 }}
        >
          {/* Left Column */}
          <div className="md:col-span-4">
            <h3
              className="text-lg font-semibold"
              style={{
                fontFamily: "var(--font-body)",
                color: "#F9FAFB",
              }}
            >
              The Hesitation
            </h3>
          </div>

          {/* Right Column */}
          <div className="md:col-span-8">
            <p
              className="text-lg font-light leading-relaxed"
              style={{
                fontFamily: "var(--font-body)",
                color: "rgba(249, 250, 251, 0.8)",
              }}
            >
              You've probably noticed this before. The hesitation to share your
              website or business materials. Because you know that your digital
              platforms don't accurately represent the quality of your
              operations. If you recognize this inconsistency, the market
              observes it as well.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollytellingTextOverlay;
