import { useRef, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const LAST_FRAME_URL =
  "https://uwzjmdrwqizokkxjnlpv.supabase.co/storage/v1/object/public/frames-lovable/intro1/frame_0200.webp";

const ACT2_BODY =
  "Every disconnect between your real-world expertise and your digital presence triggers a vicious cycle that compounds over time.";

const ScrollytellingFreezeFrame = () => {
  const isMobile = useIsMobile();
  const freezeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: any;

    const initGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const el = freezeRef.current;
      if (!el) return;

      ctx = gsap.context(() => {
        // Show freeze frame near end of scrollytelling
        ScrollTrigger.create({
          trigger: ".scrollytelling-track",
          start: "88% top",
          onEnter: () => {
            el.style.visibility = "visible";
            el.style.opacity = "1";
          },
          onLeaveBack: () => {
            el.style.visibility = "hidden";
            el.style.opacity = "0";
          },
        });

        // Hide freeze frame when canvas section covers it
        ScrollTrigger.create({
          trigger: ".canvas-section",
          start: "top 95%",
          onEnter: () => {
            el.style.visibility = "hidden";
            el.style.opacity = "0";
          },
          onLeaveBack: () => {
            el.style.visibility = "visible";
            el.style.opacity = "1";
          },
        });
      });
    };

    initGSAP();
    return () => ctx?.revert();
  }, []);

  const elasticStyle: React.CSSProperties = {
    marginLeft: isMobile ? 0 : "var(--nav-width, 64px)",
    width: isMobile ? "100%" : "calc(100vw - var(--nav-width, 64px))",
    paddingLeft: isMobile ? 24 : "var(--safe-space, 48px)",
    paddingRight: isMobile ? 24 : "var(--safe-space, 48px)",
    transition:
      "margin-left 400ms cubic-bezier(0.4,0,0.2,1), width 400ms cubic-bezier(0.4,0,0.2,1)",
  };

  return (
    <div
      ref={freezeRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 5,
        visibility: "hidden",
        opacity: 0,
        transition: "opacity 300ms ease, visibility 300ms ease",
        pointerEvents: "none",
      }}
    >
      {/* Background — last frame as static image */}
      <img
        src={LAST_FRAME_URL}
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Dark overlay — 40% (matching scrollytelling) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.4)",
        }}
      />

      {/* Vignette (matching scrollytelling) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%)",
        }}
      />

      {/* Content — replicates Phase 3 layout */}
      <div
        style={{
          ...elasticStyle,
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ maxWidth: 600 }}>
          {/* Header */}
          <div style={{ marginBottom: 24 }}>
            <h2
              className="font-display font-bold"
              style={{
                fontSize: "clamp(32px, 5vw, 56px)",
                color: "hsl(var(--primary-foreground))",
                lineHeight: 1.15,
              }}
            >
              The problems
            </h2>
            <div
              style={{
                width: 48,
                height: 2,
                background: "hsl(var(--secondary))",
                marginTop: 16,
              }}
            />
          </div>

          {/* Body text */}
          <p
            className="font-body"
            style={{
              fontSize: "clamp(15px, 1.5vw, 18px)",
              color: "hsl(var(--primary-foreground) / 0.75)",
              lineHeight: 1.8,
              maxWidth: 480,
            }}
          >
            {ACT2_BODY}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScrollytellingFreezeFrame;
