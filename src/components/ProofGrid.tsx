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
      "https://cdn.coverr.co/videos/coverr-a-designer-working-on-a-laptop-2633/1080p.mp4",
    title: "Quiet Atelier",
    category: "Brand System · 2024",
  },
  {
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=2000&q=80",
    video:
      "https://cdn.coverr.co/videos/coverr-pouring-coffee-in-a-cup-3633/1080p.mp4",
    title: "Hinoki Group",
    category: "Editorial Site · 2024",
  },
  {
    image:
      "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?auto=format&fit=crop&w=1600&q=80",
    video:
      "https://cdn.coverr.co/videos/coverr-hands-typing-on-a-keyboard-1573/1080p.mp4",
    title: "Northbound Labs",
    category: "Product Launch · 2023",
  },
  {
    image:
      "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?auto=format&fit=crop&w=1600&q=80",
    video:
      "https://cdn.coverr.co/videos/coverr-a-woman-walking-through-a-forest-1572/1080p.mp4",
    title: "Solène Wellness",
    category: "Visual Identity · 2023",
  },
  {
    image:
      "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=2000&q=80",
    video:
      "https://cdn.coverr.co/videos/coverr-fog-rolling-over-mountains-3633/1080p.mp4",
    title: "Verdant Co.",
    category: "Strategic Narrative · 2024",
  },
];

const GalleryTile = ({ tile, flex }: { tile: Tile; flex: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const reduced = useReducedMotion();

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

  // Touch fallback: autoplay when in view
  useEffect(() => {
    if (!ref.current) return;
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (!isTouch) return;
    const v = videoRef.current;
    if (!v) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHovered(true);
        } else {
          setHovered(false);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setOffset({ x, y });
  };

  const videoTransform = reduced
    ? "translate3d(0,0,0) scale(1)"
    : `translate3d(${offset.x * -12}px, ${offset.y * -12}px, 0) scale(1.04)`;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setOffset({ x: 0, y: 0 });
      }}
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
      {/* Layer 1: base image */}
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

      {/* Layer 2: video */}
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
          transform: videoTransform,
          transition:
            "opacity 300ms cubic-bezier(0.4,0,0.2,1), transform 400ms cubic-bezier(0.4,0,0.2,1)",
          willChange: "transform, opacity",
        }}
      />

      {/* Layer 3: ALVIE dark filter */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(8,47,40,0.55) 0%, rgba(18,18,18,0.7) 100%)",
          mixBlendMode: "multiply",
          opacity: hovered ? 0.15 : 0.55,
          transition: "opacity 300ms cubic-bezier(0.4,0,0.2,1)",
          pointerEvents: "none",
        }}
      />

      {/* Layer 4: vignette (always on top of media) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.65) 100%)",
          pointerEvents: "none",
        }}
      />

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
        padding: "96px 48px",
      }}
    >
      {/* Header strip */}
      <div
        style={{
          height: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "48px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "16px",
            fontWeight: 500,
            color: "#9CA3AF",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Gallery
        </span>
        <a
          href="#"
          className="group"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "16px",
            fontWeight: 500,
            color: "#F9FAFB",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          Observe our work
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
          gap: "24px",
          marginBottom: "48px",
        }}
      >
        <GalleryTile tile={TILES[1]} flex={6} />
        <GalleryTile tile={TILES[2]} flex={4} />
      </div>

      {/* Row 3: 40 / 60 */}
      <div style={{ height: "100vh", display: "flex", gap: "24px" }}>
        <GalleryTile tile={TILES[3]} flex={4} />
        <GalleryTile tile={TILES[4]} flex={6} />
      </div>
    </section>
  );
};

export default ProofGrid;
