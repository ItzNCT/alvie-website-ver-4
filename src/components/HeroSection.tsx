import { useEffect, useRef } from "react";
import HeroContent from "./HeroContent";

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: any;

    const initGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      if (!section) return;

      ctx = gsap.context(() => {
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
      {/* Video background */}
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

      {/* Content layer with integrated vignette */}
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        <HeroContent />
      </div>
    </div>
  );
};

export default HeroSection;
