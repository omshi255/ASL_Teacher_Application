import HeroSection from "./HeroSection.jsx";
import TestFlowSection from "./TestFlowSection.jsx";
import BenefitsSection from "./BenefitsSection.jsx";
import HowItWorksSection from "./HowItWorksSection.jsx";

const HomePage = () => {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <TestFlowSection />
      <BenefitsSection />
      <HowItWorksSection />
    </main>
  );
};

export default HomePage;
