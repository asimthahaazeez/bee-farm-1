import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeatureShowcase from "@/components/landing/FeatureShowcase";
import LiveStatsPreview from "@/components/landing/LiveStatsPreview";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import InteractiveCTA from "@/components/landing/InteractiveCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <FeatureShowcase />
        <LiveStatsPreview />
        <TestimonialsSection />
        <InteractiveCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
