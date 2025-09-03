import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  Wind, 
  Thermometer, 
  Droplets,
  Eye,
  AlertTriangle
} from "lucide-react";

interface WeatherData {
  time: string;
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: 'sun' | 'cloud' | 'rain';
}

const weatherData: WeatherData[] = [
  { time: "Now", temp: 72, condition: "Sunny", humidity: 45, windSpeed: 8, icon: "sun" },
  { time: "2PM", temp: 75, condition: "Partly Cloudy", humidity: 50, windSpeed: 12, icon: "cloud" },
  { time: "4PM", temp: 73, condition: "Light Rain", humidity: 65, windSpeed: 15, icon: "rain" },
  { time: "6PM", temp: 70, condition: "Cloudy", humidity: 70, windSpeed: 10, icon: "cloud" },
  { time: "8PM", temp: 68, condition: "Clear", humidity: 55, windSpeed: 6, icon: "sun" },
];

const WeatherIcon = ({ icon, className }: { icon: string; className?: string }) => {
  switch (icon) {
    case 'sun':
      return <Sun className={className} />;
    case 'cloud':
      return <Cloud className={className} />;
    case 'rain':
      return <CloudRain className={className} />;
    default:
      return <Sun className={className} />;
  }
};

const WeatherDashboard = () => {
  return (
    <section className="py-16 bg-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-dark-brown mb-4">
            Smart Weather Insights
          </h2>
          <p className="text-lg text-dark-brown/70 max-w-2xl mx-auto">
            AI-powered forecasting tailored specifically for your beekeeping needs
          </p>
        </div>

        {/* AI Recommendation Alert */}
        <Card className="mb-8 p-6 bg-gradient-to-r from-amber/20 to-honey-light/30 border-amber/30 hover-lift">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber rounded-full">
              <AlertTriangle className="w-6 h-6 text-dark-brown" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-dark-brown mb-2">
                🐝 AI Recommendation
              </h3>
              <p className="text-dark-brown/80 mb-3">
                Perfect conditions for hive inspection today! Light winds and moderate temperature make it ideal for checking on your colonies.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-sage/20 text-sage-dark">
                  Low Wind Speed
                </Badge>
                <Badge variant="secondary" className="bg-honey/20 text-dark-brown">
                  Optimal Temperature
                </Badge>
                <Badge variant="secondary" className="bg-sky/20 text-sky-dark">
                  No Rain Expected
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Current Weather Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 text-center hover-lift bg-white/80 backdrop-blur-sm">
            <Thermometer className="w-8 h-8 text-amber mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-dark-brown mb-1">Temperature</h3>
            <p className="text-3xl font-bold text-dark-brown">72°F</p>
            <p className="text-sm text-dark-brown/60">Feels like 75°F</p>
          </Card>
          
          <Card className="p-6 text-center hover-lift bg-white/80 backdrop-blur-sm">
            <Droplets className="w-8 h-8 text-sky mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-dark-brown mb-1">Humidity</h3>
            <p className="text-3xl font-bold text-dark-brown">45%</p>
            <p className="text-sm text-dark-brown/60">Comfortable</p>
          </Card>
          
          <Card className="p-6 text-center hover-lift bg-white/80 backdrop-blur-sm">
            <Wind className="w-8 h-8 text-sage mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-dark-brown mb-1">Wind Speed</h3>
            <p className="text-3xl font-bold text-dark-brown">8mph</p>
            <p className="text-sm text-dark-brown/60">Light breeze</p>
          </Card>
          
          <Card className="p-6 text-center hover-lift bg-white/80 backdrop-blur-sm">
            <Eye className="w-8 h-8 text-honey mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-dark-brown mb-1">Visibility</h3>
            <p className="text-3xl font-bold text-dark-brown">10mi</p>
            <p className="text-sm text-dark-brown/60">Excellent</p>
          </Card>
        </div>

        {/* Hourly Forecast */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm">
          <h3 className="text-2xl font-semibold text-dark-brown mb-6">
            Today's Hourly Forecast
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {weatherData.map((hour, index) => (
              <div 
                key={index} 
                className="text-center p-4 rounded-2xl bg-honey-light/20 hover:bg-honey-light/30 transition-all duration-300 hover-lift"
              >
                <p className="text-sm text-dark-brown/70 mb-2">{hour.time}</p>
                <WeatherIcon 
                  icon={hour.icon} 
                  className="w-8 h-8 mx-auto mb-3 text-amber-dark" 
                />
                <p className="text-xl font-bold text-dark-brown mb-1">{hour.temp}°</p>
                <p className="text-xs text-dark-brown/60 mb-2">{hour.condition}</p>
                <div className="space-y-1 text-xs text-dark-brown/60">
                  <div className="flex items-center justify-center gap-1">
                    <Droplets className="w-3 h-3" />
                    <span>{hour.humidity}%</span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <Wind className="w-3 h-3" />
                    <span>{hour.windSpeed}mph</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default WeatherDashboard;