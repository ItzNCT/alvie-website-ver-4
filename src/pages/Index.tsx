import VerticalNav from "@/components/VerticalNav";
import HeroSection from "@/components/HeroSection";
import ScrollytellingUnified from "@/components/ScrollytellingUnified";
import ScrollytellingFreezeFrame from "@/components/ScrollytellingFreezeFrame";

const Index = () => {
  return (
    <div className="min-h-screen page-wrapper">
      <VerticalNav />
      <ScrollytellingUnified />
      <HeroSection />
      <ScrollytellingFreezeFrame />
    </div>
  );
};

export default Index;
