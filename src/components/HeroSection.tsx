import { Button } from "@/components/ui/button";
import { Cloud, Sun, Thermometer } from "lucide-react";
import heroImage from "@/assets/hero-beehive.jpg";
import beeMascot from "@/assets/bee-mascot.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-honey-light via-honey to-amber overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="hexagon-pattern"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 hexagon w-12 h-12 bg-honey-light opacity-30 float"></div>
      <div className="absolute top-40 right-20 hexagon w-8 h-8 bg-amber opacity-40 float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-40 left-20 hexagon w-10 h-10 bg-honey opacity-20 float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                <img 
                  src={beeMascot} 
                  alt="Bee Mascot" 
                  className="w-16 h-16 bee-trail"
                />
                <h1 className="text-5xl lg:text-7xl font-bold text-dark-brown leading-tight">
                  BeeWise
                </h1>
              </div>
              <p className="text-xl lg:text-2xl text-dark-brown/80 max-w-2xl">
                AI-powered beekeeping insights that help you make the right decisions at the right time
              </p>
            </div>
            
            {/* Weather Preview Card */}
            <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 max-w-md mx-auto lg:mx-0 hover-lift">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-dark-brown">Today's Forecast</h3>
                <Sun className="w-6 h-6 text-amber-dark" />
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-1">
                  <Thermometer className="w-5 h-5 text-dark-brown mx-auto" />
                  <p className="text-sm text-dark-brown/70">Temp</p>
                  <p className="font-bold text-dark-brown">72°F</p>
                </div>
                <div className="space-y-1">
                  <Cloud className="w-5 h-5 text-dark-brown mx-auto" />
                  <p className="text-sm text-dark-brown/70">Rain</p>
                  <p className="font-bold text-dark-brown">20%</p>
                </div>
                <div className="space-y-1">
                  <div className="w-5 h-5 bg-sage rounded-full mx-auto"></div>
                  <p className="text-sm text-dark-brown/70">Hives</p>
                  <p className="font-bold text-dark-brown">Active</p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-sage/20 rounded-xl">
                <p className="text-sm text-dark-brown font-medium">Perfect weather for hive inspection today!</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-dark-brown text-honey-light hover:bg-dark-brown/90 px-8 py-6 text-lg font-semibold rounded-2xl shadow-lg">
                Start Monitoring
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-dark-brown text-dark-brown hover:bg-dark-brown hover:text-honey-light px-8 py-6 text-lg font-semibold rounded-2xl"
              >
                View Demo
              </Button>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="flex-1 relative">
            <div className="relative max-w-lg mx-auto">
              <img 
                src={heroImage} 
                alt="Beautiful beehive in nature" 
                className="w-full h-auto rounded-3xl shadow-2xl hover-lift"
              />
              <div className="absolute -top-4 -right-4 w-24 h-24 hexagon bg-gradient-to-br from-honey to-amber pulse-glow"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 hexagon bg-gradient-to-br from-sage to-sage-dark opacity-80"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;