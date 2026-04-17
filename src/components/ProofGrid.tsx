import { useEffect, useRef, useState } from "react";
import useReducedMotion from "@/hooks/useReducedMotion";

type Tile = {
  image: string;
  video: string;
  title: string;
  category: string;
};

const TILES: Tile[] = [
  {
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=2000&q=80",
    video:
      "https://videos.pexels.com/video-files/4836108/4836108-uhd_1440_2732_25fps.mp4",
    title: "Quiet Atelier",
    category: "Brand System · 2024",
  },
  {
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=2000&q=80",
    video:
      "https://videos.pexels.com/video-files/5076580/5076580-uhd_1440_2732_25fps.mp4",
    title: "Hinoki Group",
    category: "Editorial Site · 2024",
  },
  {
    image:
      "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?auto=format&fit=crop&w=1600&q=80",
    video:
      "https://videos.pexels.com/video-files/7414137/7414137-uhd_1440_2732_25fps.mp4",
    title: "Northbound Labs",
    category: "Product Launch · 2023",
  },
  {
    image:
      "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?auto=format&fit=crop&w=1600&q=80",
    video:
      "https://videos.pexels.com/video-files/4763824/4763824-uhd_1440_2732_25fps.mp4",
    title: "Solène Wellness",
    category: "Visual Identity · 2023",
  },
  {
    image:
      "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=2000&q=80",
    video:
      "https://videos.pexels.com/video-files/6981411/6981411-uhd_1440_2732_25fps.mp4",
    title: "Verdant Co.",
    category: "Strategic Narrative · 2024",
  },
];

const CARD_W = 240;
const CARD_H = 427;

const GalleryTile = ({ tile, flex }: { tile: Tile; flex: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const reduced = useReducedMotion();

  // Mouse + smoothed positions held in refs to avoid re-renders during rAF
  const targetPos = useRef({ x: 0, y: 0 });
  const smoothedPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  // Play / pause video on hover lifecycle
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (hovered) {
      v.play().catch(() => {});
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [hovered]);

  // Touch fallback: autoplay when in view, fill tile (no floating card)
  useEffect(() => {
    if (!isTouch || !ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => setHovered(entry.isIntersecting),
      { threshold: 0.5 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [isTouch]);

  // rAF lerp loop for cursor-pinned card
  useEffect(() => {
    if (!hovered || isTouch || reduced) return;

    const tick = () => {
      const dx = targetPos.current.x - smoothedPos.current.x;
      const dy = targetPos.current.y - smoothedPos.current.y;
      smoothedPos.current.x += dx * 0.18;
      smoothedPos.current.y += dy * 0.18;

      if (cardRef.current && ref.current) {
        const rect = ref.current.getBoundingClientRect();
        // Clamp so card stays inside tile bounds
        const halfW = CARD_W / 2;
        const halfH = CARD_H / 2;
        const cx = Math.max(halfW, Math.min(rect.width - halfW, smoothedPos.current.x));
        const cy = Math.max(halfH, Math.min(rect.height - halfH, smoothedPos.current.y));
        cardRef.current.style.transform = `translate3d(${cx - halfW}px, ${cy - halfH}px, 0)`;
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [hovered, isTouch, reduced]);

  const handleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Initialize both target and smoothed at cursor so card appears at the cursor
    targetPos.current = { x, y };
    smoothedPos.current = { x, y };
    setHovered(true);
  };

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || isTouch) return;
    const rect = ref.current.getBoundingClientRect();
    targetPos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleLeave = () => setHovered(false);

  return (
    <div
      ref={ref}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onMouseMove={handleMove}
      style={{
        flex,
        position: "relative",
        borderRadius: "24px",
        overflow: "hidden",
        height: "100%",
        cursor: "pointer",
        background: "#1E1E1E",
      }}
    >
      {/* Layer 1: base image (static — no transform) */}
      <img
        src={tile.image}
        alt={tile.title}
        loading="lazy"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Layer 2: ALVIE dark filter — DARKER on hover to focus the floating video */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(8,47,40,0.55) 0%, rgba(18,18,18,0.7) 100%)",
          mixBlendMode: "multiply",
          opacity: hovered ? 0.75 : 0.35,
          transition: "opacity 300ms cubic-bezier(0.4,0,0.2,1)",
          pointerEvents: "none",
        }}
      />

      {/* Layer 3: vignette — always on */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.65) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Layer 4: floating cursor-pinned 9:16 video card (desktop only) */}
      {!isTouch && (
        <div
          ref={cardRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: `${CARD_W}px`,
            height: `${CARD_H}px`,
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 200ms cubic-bezier(0.4,0,0.2,1)",
            pointerEvents: "none",
            willChange: "transform, opacity",
            // Initial centered placement before first move (reduced motion)
            transform: reduced
              ? `translate3d(calc(50% - ${CARD_W / 2}px), calc(50% - ${CARD_H / 2}px), 0)`
              : undefined,
          }}
        >
          <video
            ref={videoRef}
            src={tile.video}
            muted
            playsInline
            loop
            preload="metadata"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      )}

      {/* Touch fallback: full-tile video */}
      {isTouch && (
        <video
          ref={videoRef}
          src={tile.video}
          muted
          playsInline
          loop
          preload="metadata"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: hovered ? 1 : 0,
            transition: "opacity 300ms cubic-bezier(0.4,0,0.2,1)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Layer 5: caption */}
      <div
        style={{
          position: "absolute",
          left: "32px",
          bottom: "32px",
          right: "32px",
          color: "#F9FAFB",
          transform: hovered ? "translateY(0)" : "translateY(8px)",
          opacity: hovered ? 1 : 0.75,
          transition:
            "transform 300ms cubic-bezier(0.4,0,0.2,1), opacity 300ms cubic-bezier(0.4,0,0.2,1)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "32px",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: "115%",
            marginBottom: "6px",
          }}
        >
          {tile.title}
        </p>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            color: "#9CA3AF",
            letterSpacing: "0.05em",
          }}
        >
          {tile.category}
        </p>
      </div>
    </div>
  );
};

const ProofGrid = () => {
  return (
    <section
      className="relative"
      style={{
        zIndex: 50,
        background: "#121212",
        padding: "48px",
      }}
    >
      {/* Header strip — coupled to gallery (24px below) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "24px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            fontWeight: 400,
            color: "#9CA3AF",
          }}
        >
          gallery
        </span>
        <a
          href="#"
          className="group"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            fontWeight: 400,
            color: "#F9FAFB",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          observe our work
          <span
            style={{
              display: "inline-block",
              transition: "transform 300ms cubic-bezier(0.4,0,0.2,1)",
            }}
            className="group-hover:translate-x-1"
          >
            →
          </span>
        </a>
      </div>

      {/* Row 1: full width */}
      <div style={{ height: "100vh", display: "flex", marginBottom: "48px" }}>
        <GalleryTile tile={TILES[0]} flex={1} />
      </div>

      {/* Row 2: 60 / 40 */}
      <div
        style={{
          height: "100vh",
          display: "flex",
          gap: "48px",
          marginBottom: "48px",
        }}
      >
        <GalleryTile tile={TILES[1]} flex={6} />
        <GalleryTile tile={TILES[2]} flex={4} />
      </div>

      {/* Row 3: 40 / 60 */}
      <div style={{ height: "100vh", display: "flex", gap: "48px" }}>
        <GalleryTile tile={TILES[3]} flex={4} />
        <GalleryTile tile={TILES[4]} flex={6} />
      </div>
    </section>
  );
};

export default ProofGrid;
