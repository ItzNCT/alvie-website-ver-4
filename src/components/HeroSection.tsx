import { useEffect, useRef } from "react";
import HeroContent from "./HeroContent";

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: any;

    const initGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      if (!section) return;

      ctx = gsap.context(() => {
        // Hero text fades out faster (first 30vh)
        if (contentRef.current) {
          gsap.to(contentRef.current, {
            opacity: 0,
            y: -40,
            scrollTrigger: {
              trigger: ".page-wrapper",
              start: "top top",
              end: "30vh top",
              scrub: true,
            },
          });
        }

        // Entire hero section fades out over first 50vh
        gsap.to(section, {
          opacity: 0,
          scrollTrigger: {
            trigger: ".page-wrapper",
            start: "top top",
            end: "50vh top",
            scrub: true,
            onUpdate: (self) => {
              if (section) {
                section.style.pointerEvents =
                  self.progress > 0.95 ? "none" : "auto";
              }
            },
          },
        });
      });
    };

    initGSAP();
    return () => ctx?.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="fixed inset-0 w-screen h-screen overflow-hidden hero-section"
      style={{ zIndex: 30 }}
    >
      {/* z-1: Video background */}
      <div
        className="absolute inset-0 animate-hero-fade-in hero-video-wrapper"
        style={{ zIndex: 1 }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/hero-loop.webm" type="video/webm" />
        </video>
      </div>

      {/* z-2: Dark overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(26, 26, 24, 0.40)", zIndex: 2 }}
      />

      {/* z-3: Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(247, 244, 235, 0.15) 100%)",
          zIndex: 3,
        }}
      />

      {/* z-4: Content — uses elastic layout */}
      <div
        ref={contentRef}
        className="relative"
        style={{
          zIndex: 4,
          marginLeft: "var(--nav-width, 64px)",
          width: "calc(100vw - var(--nav-width, 64px))",
          paddingLeft: "var(--safe-space, 48px)",
          paddingRight: "var(--safe-space, 48px)",
          transition: "margin-left 400ms cubic-bezier(0.4,0,0.2,1), width 400ms cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <HeroContent />
      </div>
    </div>
  );
};

export default HeroSection;
