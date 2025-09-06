import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ReportForm } from "@/components/ReportForm";
import { TrackingSection } from "@/components/TrackingSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <ReportForm />
      <TrackingSection />
      <Footer />
    </div>
  );
};

export default Index;
