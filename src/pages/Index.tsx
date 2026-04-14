import HeroSection from "@/components/HeroSection";
import ScrollytellingUnified from "@/components/ScrollytellingUnified";
import ScrollytellingFreezeFrame from "@/components/ScrollytellingFreezeFrame";
import TrustGapSection from "@/components/TrustGapSection";

const Index = () => {
  return (
    <div className="min-h-screen page-wrapper">
      <HeroSection />
      <ScrollytellingUnified />
      <ScrollytellingFreezeFrame />
      <TrustGapSection />
    </div>
  );
};

export default Index;
