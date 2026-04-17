import HeroSection from "@/components/HeroSection";
import ScrollytellingUnified from "@/components/ScrollytellingUnified";
import ProblemReframe from "@/components/ProblemReframe";
import ProductSection from "@/components/ProductSection";
import ProofGrid from "@/components/ProofGrid";

const Index = () => {
  return (
    <div className="min-h-screen page-wrapper">
      <HeroSection />
      <ScrollytellingUnified />
      <ProblemReframe />
      <ProductSection />
      <ProofGrid />
    </div>
  );
};

export default Index;
