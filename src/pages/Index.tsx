import HeroSection from "@/components/HeroSection";
import ScrollytellingUnified from "@/components/ScrollytellingUnified";
import ScrollytellingTextOverlay from "@/components/ScrollytellingTextOverlay";
import ScrollytellingFreezeFrame from "@/components/ScrollytellingFreezeFrame";
import ProblemSection from "@/components/ProblemSection";

const Index = () => {
  return (
    <div className="min-h-screen page-wrapper">
      <HeroSection />
      <ScrollytellingUnified />
      <ScrollytellingTextOverlay />
      <ScrollytellingFreezeFrame />
      <ProblemSection />
    </div>
  );
};

export default Index;
