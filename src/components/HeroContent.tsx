import { ChevronDown } from "lucide-react";

const chapters = [
  { name: "Introduction", numeral: "I" },
  { name: "The problem", numeral: "II" },
  { name: "The necessity", numeral: "III" },
  { name: "Our solution", numeral: "IV" },
  { name: "How we work", numeral: "V" },
  { name: "About us", numeral: "VI" },
  { name: "Frequently asked questions", numeral: "VII" },
];

const HeroContent = () => {
  return (
    <div className="relative z-10 flex items-center justify-center h-screen w-full">
      <div className="flex flex-col" style={{ marginLeft: 32 }}>
        {/* Framed container */}
        <div
          className="animate-hero-fade-in hero-content-frame"
          style={{
            maxWidth: 560,
            width: "90%",
            border: "1px solid rgba(247, 244, 235, 0.25)",
            padding: 48,
            background: "rgba(26, 26, 24, 0.15)",
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(2px)",
            animationDelay: "0.4s",
          }}
        >
          {/* ALVIE */}
          <h1
            className="font-display animate-hero-slide-up"
            style={{
              fontWeight: 700,
              fontSize: "clamp(28px, 3.5vw, 44px)",
              color: "#F7F4EB",
              lineHeight: 1.0,
              animationDelay: "0.6s",
            }}
          >
            ALVIE
          </h1>

          {/* Tagline */}
          <p
            className="font-display animate-hero-slide-up"
            style={{
              fontWeight: 700,
              fontSize: "clamp(24px, 3vw, 40px)",
              color: "#F7F4EB",
              lineHeight: 1.1,
              marginTop: 4,
              animationDelay: "0.8s",
            }}
          >
            To not just exist
          </p>

          {/* Body */}
          <p
            className="font-body font-light animate-hero-fade-in"
            style={{
              fontSize: "clamp(13px, 1.4vw, 16px)",
              color: "#F7F4EB",
              lineHeight: 1.7,
              maxWidth: 440,
              marginTop: 32,
              animationDelay: "1.1s",
            }}
          >
            Bespoke digital solutions to reflect your true business value
          </p>

          {/* Divider */}
          <div
            className="animate-hero-line-scale origin-left"
            style={{
              height: 1,
              background: "rgba(247, 244, 235, 0.20)",
              marginTop: 32,
              animationDelay: "1.3s",
            }}
          />

          {/* Chapter list — hero version with hero-toc-row class */}
          <div className="hero-toc-container" style={{ marginTop: 20 }}>
            {chapters.map((ch, i) => (
              <a
                key={ch.numeral}
                href="#"
                data-toc-index={i}
                className="hero-toc-row flex items-center justify-between cursor-pointer group animate-hero-slide-up"
                style={{
                  height: 36,
                  animationDelay: `${1.5 + i * 0.08}s`,
                }}
              >
                <span
                  className="font-body font-medium transition-all duration-[250ms] ease-out group-hover:translate-x-1"
                  style={{
                    fontSize: "clamp(12px, 1.3vw, 15px)",
                    color: "#F7F4EB",
                  }}
                >
                  {ch.name}
                </span>
                <span
                  className="font-body font-normal transition-colors duration-[250ms] ease-out"
                  style={{
                    fontSize: "clamp(12px, 1.3vw, 15px)",
                    color: "#D49A5A",
                  }}
                >
                  {ch.numeral}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Scroll indicator — below the frame, centered */}
        <div
          className="flex flex-col items-center animate-hero-fade-in"
          style={{ marginTop: 24, animationDelay: "2.2s", alignSelf: "center" }}
        >
          <div
            className="animate-scroll-pulse"
            style={{
              width: 1,
              height: 20,
              background: "rgba(247, 244, 235, 0.25)",
            }}
          />
          <ChevronDown
            size={14}
            style={{ color: "rgba(247, 244, 235, 0.25)", marginTop: 4 }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
