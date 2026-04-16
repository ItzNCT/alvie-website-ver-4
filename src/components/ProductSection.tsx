import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const TABS = ["Strategy", "Identity", "Design", "Solutions"] as const;

const TAB_DATA: Record<string, { labels: string[]; images: string[] }> = {
  Strategy: {
    labels: ["Digital Transformation", "Market Research", "Sustainable Development", "Brand Positioning"],
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1200&q=80",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
    ],
  },
  Identity: {
    labels: ["Brand Identity", "Logo Suite", "Brand Storytelling", "Voice & Tone"],
    images: [
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&q=80",
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&q=80",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=80",
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1200&q=80",
    ],
  },
  Design: {
    labels: ["Website Design", "User Experience (UX)", "User Interface (UI)", "Dashboard"],
    images: [
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80",
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1200&q=80",
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=1200&q=80",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80",
    ],
  },
  Solutions: {
    labels: ["Problem Solving", "BIM", "AI Solution", "Full-stack Development"],
    images: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80",
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80",
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80",
    ],
  },
};

const ProductSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);

  const currentTab = TABS[activeTab];
  const data = TAB_DATA[currentTab];

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    setSelectedImage(0);
  };

  return (
    <section
      className="relative flex flex-col"
      style={{
        zIndex: 45,
        background: "#121212",
        height: "100vh",
      }}
    >
      {/* Top 50vh — Header + Tabs */}
      <div
        className="flex flex-col items-center justify-center"
        style={{ height: "40vh" }}
      >
        {/* Overline */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "16px",
            color: "#9CA3AF",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "24px",
          }}
        >
          Our Solutions
        </p>

        {/* Headline */}
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "42px",
            fontWeight: 700,
            color: "#F9FAFB",
            textAlign: "center",
            letterSpacing: "-0.02em",
            lineHeight: "115%",
            marginBottom: "32px",
          }}
        >
          For Your True Expertise
          <br />
          To Be Seen
        </h2>

        {/* Tab Bar */}
        <div
          className="flex items-center justify-center"
          style={{ maxWidth: "1200px", gap: "48px" }}
        >
          {TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => handleTabChange(i)}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "20px",
                fontWeight: activeTab === i ? 600 : 400,
                color: activeTab === i ? "#F9FAFB" : "#6B7280",
                background: "none",
                border: "none",
                paddingBottom: "8px",
                cursor: "pointer",
                transition: "color 300ms, border-color 300ms",
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom 50vh — Image Gallery */}
      <div
        className="flex"
        style={{
          height: "60vh",
          gap: "2px",
        }}
      >
        {data.labels.map((label, i) => (
          <motion.div
            key={`${currentTab}-${i}`}
            className="relative overflow-hidden cursor-pointer"
            style={{ height: "100%" }}
            animate={{ flex: selectedImage === i ? 2 : 1 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            onClick={() => setSelectedImage(i)}
          >
            {/* Image */}
            <img
              src={data.images[i]}
              alt={label}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />

            {/* Bottom gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%)",
              }}
            />

            {/* Bottom-left label */}
            <span
              className="absolute"
              style={{
                bottom: "48px",
                left: "48px",
                fontFamily: "var(--font-display)",
                fontSize: "36px",
                fontWeight: 700,
                color: "#F9FAFB",
                lineHeight: "115%",
                letterSpacing: "-0.02em",
              }}
            >
              {label}
            </span>

            {/* Bottom-right CTA — only on selected */}
            {selectedImage === i && (
              <span
                className="absolute flex items-center"
                style={{
                  bottom: "48px",
                  right: "48px",
                  fontFamily: "var(--font-body)",
                  fontSize: "28px",
                  color: "#F9FAFB",
                  gap: "8px",
                }}
              >
                Explore <ArrowRight size={28} />
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
