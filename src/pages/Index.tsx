import HeroSection from "@/components/HeroSection";
import ScrollytellingUnified from "@/components/ScrollytellingUnified";
import ProblemReframe from "@/components/ProblemReframe";
import ProductSection from "@/components/ProductSection";

const Index = () => {
  return (
    <div className="min-h-screen page-wrapper">
      <HeroSection />
      <ScrollytellingUnified />
      <ProblemReframe />
      <ProductSection />
    </div>
  );
};

export default Index;
