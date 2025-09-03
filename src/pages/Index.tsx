import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import WeatherDashboard from "@/components/WeatherDashboard";
import HiveManagement from "@/components/HiveManagement";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <WeatherDashboard />
        <HiveManagement />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
