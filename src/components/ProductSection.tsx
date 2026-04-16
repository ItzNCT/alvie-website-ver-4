import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const tabs = ["Strategy", "Identity", "Design", "Solutions"] as const;

const tabContent: Record<string, { label: string; image: string }[]> = {
  Strategy: [
    { label: "Digital Transformation", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80" },
    { label: "Market Research", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80" },
    { label: "Sustainable Development", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80" },
    { label: "Brand Positioning", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80" },
  ],
  Identity: [
    { label: "Brand Identity", image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&q=80" },
    { label: "Logo Suite", image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&q=80" },
    { label: "Brand Storytelling", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80" },
    { label: "Voice & Tone", image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=80" },
  ],
  Design: [
    { label: "Website Design", image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&q=80" },
    { label: "User Experience (UX)", image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1200&q=80" },
    { label: "User Interface (UI)", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80" },
    { label: "Dashboard", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80" },
  ],
  Solutions: [
    { label: "Problem Solving", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80" },
    { label: "BIM", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80" },
    { label: "AI Solution", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80" },
    { label: "Full-stack Development", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80" },
  ],
};

const ProductSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);

  const currentTab = tabs[activeTab];
  const items = tabContent[currentTab];

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
        minHeight: "100vh",
      }}
    >
      {/* Top 34vh — Header + Tabs */}
      <div
        className="flex flex-col items-center justify-center"
        style={{ height: "34vh", paddingTop: 48, paddingBottom: 0 }}
      >
        {/* Overline */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 20,
            color: "#9CA3AF",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Our Solutions
        </p>

        {/* Headline */}
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 64,
            fontWeight: 700,
            color: "#F9FAFB",
            textAlign: "center",
            letterSpacing: "-0.02em",
            lineHeight: "110%",
            marginBottom: 40,
          }}
        >
          For Your True Expertise
          <br />
          To Be Seen
        </h2>

        {/* Tab Bar */}
        <div
          className="flex items-center justify-center"
          style={{ maxWidth: 1200, width: "100%", gap: 48 }}
        >
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => handleTabChange(i)}
              className="relative pb-3 transition-colors duration-300"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 20,
                fontWeight: activeTab === i ? 600 : 400,
                color: activeTab === i ? "#F9FAFB" : "#6B7280",
                background: "none",
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.01em",
              }}
            >
              {tab}
              {/* Active underline */}
              {activeTab === i && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0"
                  style={{
                    height: 2,
                    background: "#4EB5A3",
                    borderRadius: 1,
                  }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom 66vh — Image Gallery */}
      <div
        className="flex w-full"
        style={{
          height: "66vh",
          gap: 2,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            className="flex w-full"
            style={{ gap: 2 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {items.map((item, i) => {
              const isSelected = selectedImage === i;
              return (
                <motion.div
                  key={`${currentTab}-${i}`}
                  className="relative overflow-hidden cursor-pointer"
                  style={{
                    height: "66vh",
                  }}
                  animate={{
                    flex: isSelected ? 2 : 1,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  onClick={() => setSelectedImage(i)}
                >
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.label}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />

                  {/* Bottom gradient overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%)",
                    }}
                  />

                  {/* Bottom-left label */}
                  <div
                    className="absolute"
                    style={{
                      bottom: 48,
                      left: 48,
                      right: 48,
                    }}
                  >
                    <div className="flex items-end justify-between">
                      <motion.p
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: 36,
                          fontWeight: 700,
                          color: "#F9FAFB",
                          lineHeight: "120%",
                          maxWidth: "60%",
                        }}
                        animate={{
                          opacity: isSelected ? 1 : 0.7,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {item.label}
                      </motion.p>

                      {/* Bottom-right CTA */}
                      <motion.div
                        className="flex items-center gap-2"
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: 28,
                          fontWeight: 400,
                          color: "#F9FAFB",
                          whiteSpace: "nowrap",
                        }}
                        animate={{
                          opacity: isSelected ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        Explore more
                        <ArrowRight size={28} />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProductSection;
