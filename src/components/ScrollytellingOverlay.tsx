import { useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const ScrollytellingOverlay = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLParagraphElement>(null);
  const hesitationLabelRef = useRef<HTMLHeadingElement>(null);
  const hesitationBodyRef = useRef<HTMLParagraphElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 10 }}
    >
      {/* ── Targeted Progressive Glassmorphism ── */}
      <div
        ref={glassRef}
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.6) 0%, transparent 60%)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          maskImage:
            "radial-gradient(circle at 50% 50%, black 20%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 50%, black 20%, transparent 70%)",
          zIndex: 1,
        }}
      />

      {/* ── Text content ── */}
      <div
        className="absolute inset-0 flex flex-col justify-center"
        style={{
          zIndex: 2,
          paddingLeft: isMobile ? 24 : "clamp(48px, 6vw, 96px)",
          paddingRight: isMobile ? 24 : "clamp(48px, 6vw, 96px)",
          gap: isMobile ? 48 : 64,
        }}
      >
        {/* ── Top: Large editorial statement ── */}
        <p
          ref={statementRef}
          className="font-display"
          style={{
            fontWeight: 800,
            fontSize: isMobile
              ? "clamp(28px, 8vw, 40px)"
              : "clamp(40px, 4.5vw, 72px)",
            lineHeight: isMobile ? 1.15 : 1.1,
            letterSpacing: "-0.02em",
            color: "#F9FAFB",
            textAlign: "justify",
            textIndent: isMobile ? "2em" : "3em",
            maxWidth: 1100,
          }}
        >
          ALVIE bridge the trust gap create by the disconnection of real-world
          expertise and digital reputation to display founder's true value to
          the audience.
        </p>

        {/* ── Bottom: Two-column explanation ── */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: isMobile ? "1fr" : "minmax(120px, 200px) 1fr",
            gap: isMobile ? 16 : 32,
            maxWidth: 900,
          }}
        >
          {/* Left column — label */}
          <h3
            ref={hesitationLabelRef}
            className="font-body"
            style={{
              fontWeight: 600,
              fontSize: isMobile ? 14 : 16,
              color: "#F9FAFB",
              textAlign: "left",
              lineHeight: 1.6,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              opacity: 0.7,
            }}
          >
            The Hesitation
          </h3>

          {/* Right column — body */}
          <p
            ref={hesitationBodyRef}
            className="font-body"
            style={{
              fontWeight: 300,
              fontSize: isMobile
                ? "clamp(13px, 3.5vw, 15px)"
                : "clamp(14px, 1.2vw, 17px)",
              color: "#F9FAFB",
              textAlign: "left",
              lineHeight: 1.75,
              opacity: 0.8,
            }}
          >
            You've probably noticed this before. The hesitation to share your
            website or business materials. Because you know that your digital
            platforms don't accurately represent the quality of your operations.
            If you recognize this inconsistency, the market observes it as well.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScrollytellingOverlay;
