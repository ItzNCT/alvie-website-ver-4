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

        /* Phase 1: Word-by-word reveal (5–35% of track — faster) */
        wordEls.forEach((el, i) => {
          const startP = 5 + (i / wordEls.length) * 30;
          const endP = startP + 2.5;
          gsap.fromTo(
            el,
            { y: 40, opacity: 0 },
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

        /* Phase 1: Vignette dimming (5–35%) */
        if (filterRef.current) {
          gsap.fromTo(
            filterRef.current,
            { opacity: 0 },
            {
              opacity: 1,
              scrollTrigger: {
                trigger: track,
                start: "5% top",
                end: "35% top",
                scrub: 0.5,
              },
            }
          );
        }

        /* Explanation fade-in (33–40%) */
        if (bottomRef.current) {
          gsap.fromTo(
            bottomRef.current,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: track,
                start: "33% top",
                end: "40% top",
                scrub: 0.5,
              },
            }
          );
        }

        /* Phase 2: Global fade-out — container + filter (42–65%) */
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            opacity: 0,
            scrollTrigger: {
              trigger: track,
              start: "42% top",
              end: "65% top",
              scrub: 0.5,
            },
          });
        }

        if (filterRef.current) {
          gsap.to(filterRef.current, {
            opacity: 0,
            scrollTrigger: {
              trigger: track,
              start: "42% top",
              end: "65% top",
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
    <>
      {/* ─── Immersive Vignette Filter ─── */}
      <div
        ref={filterRef}
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 9,
          background:
            "radial-gradient(circle at center, rgba(0,0,0,0.3) 0%, rgba(18,18,18,0.85) 100%)",
          opacity: 0,
        }}
      />

      {/* ─── Text Container ─── */}
      <div
        ref={containerRef}
        className="fixed inset-0 pointer-events-none flex flex-col justify-center w-full"
        style={{ zIndex: 10 }}
      >
        <div className="w-full max-w-7xl mx-auto px-8 md:px-16 text-left">
          {/* Top Part: Large Statement */}
          <h2
            className="text-4xl md:text-5xl lg:text-[4rem] font-extrabold leading-[1.1] mb-20"
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
            className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16"
            style={{ opacity: 0 }}
          >
            <div className="md:col-span-4">
              <h3
                className="text-lg md:text-xl font-semibold leading-relaxed"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "#F9FAFB",
                }}
              >
                The Hesitation
              </h3>
            </div>

            <div className="md:col-span-8">
              <p
                className="text-lg md:text-xl font-light leading-relaxed"
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
    </>
  );
};

export default ScrollytellingTextOverlay;
