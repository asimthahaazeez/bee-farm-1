import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  Wind, 
  Thermometer, 
  Droplets,
  Eye,
  AlertTriangle,
  RefreshCw
} from "lucide-react";
import { useWeatherData } from "@/hooks/useWeatherData";
import { Button } from "@/components/ui/button";

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
  const { weatherData, loading, error, refetch } = useWeatherData();

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'success': return 'default';
      case 'warning': return 'secondary';  
      case 'danger': return 'destructive';
      case 'info': return 'outline';
      default: return 'secondary';
    }
  };

  const getHumidityStatus = (humidity: number) => {
    if (humidity > 70) return 'High';
    if (humidity < 40) return 'Low';
    return 'Comfortable';
  };

  const getWindStatus = (speed: number) => {
    if (speed <= 5) return 'Calm';
    if (speed <= 15) return 'Light breeze';
    if (speed <= 25) return 'Moderate wind';
    return 'Strong wind';
  };

  if (error) {
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
          <Card className="p-8 text-center">
            <AlertTriangle className="w-12 h-12 text-amber mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-dark-brown mb-2">Weather Data Unavailable</h3>
            <p className="text-dark-brown/70 mb-4">Unable to fetch weather information at this time.</p>
            <Button onClick={refetch} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </Card>
        </div>
      </section>
    );
  }

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
        {loading ? (
          <Card className="mb-8 p-6">
            <div className="flex items-start gap-4">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-28" />
                  <Skeleton className="h-6 w-20" />
                </div>
              </div>
            </div>
          </Card>
        ) : weatherData && (
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
                  {weatherData.aiRecommendation.message}
                </p>
                <div className="flex flex-wrap gap-2">
                  {weatherData.aiRecommendation.badges.map((badge, index) => (
                    <Badge 
                      key={index} 
                      variant={getBadgeVariant(badge.type)}
                      className="bg-sage/20 text-sage-dark"
                    >
                      {badge.text}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Current Weather Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="p-6 text-center">
                <Skeleton className="w-8 h-8 mx-auto mb-3" />
                <Skeleton className="h-5 w-24 mx-auto mb-1" />
                <Skeleton className="h-8 w-16 mx-auto mb-2" />
                <Skeleton className="h-4 w-20 mx-auto" />
              </Card>
            ))
          ) : weatherData && (
            <>
              <Card className="p-6 text-center hover-lift bg-white/80 backdrop-blur-sm">
                <Thermometer className="w-8 h-8 text-amber mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-dark-brown mb-1">Temperature</h3>
                <p className="text-3xl font-bold text-dark-brown">{weatherData.current.temperature}°C</p>
                <p className="text-sm text-dark-brown/60">Feels like {weatherData.current.feelsLike}°C</p>
              </Card>
              
              <Card className="p-6 text-center hover-lift bg-white/80 backdrop-blur-sm">
                <Droplets className="w-8 h-8 text-sky mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-dark-brown mb-1">Humidity</h3>
                <p className="text-3xl font-bold text-dark-brown">{weatherData.current.humidity}%</p>
                <p className="text-sm text-dark-brown/60">{getHumidityStatus(weatherData.current.humidity)}</p>
              </Card>
              
              <Card className="p-6 text-center hover-lift bg-white/80 backdrop-blur-sm">
                <Wind className="w-8 h-8 text-sage mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-dark-brown mb-1">Wind Speed</h3>
                 <p className="text-3xl font-bold text-dark-brown">{weatherData.current.windSpeed} km/h</p>
                 <p className="text-sm text-dark-brown/60">{getWindStatus(weatherData.current.windSpeed)}</p>
              </Card>
              
              <Card className="p-6 text-center hover-lift bg-white/80 backdrop-blur-sm">
                <Eye className="w-8 h-8 text-honey mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-dark-brown mb-1">Visibility</h3>
                <p className="text-3xl font-bold text-dark-brown">{weatherData.current.visibility} km</p>
                <p className="text-sm text-dark-brown/60">
                  {weatherData.current.visibility >= 10 ? 'Excellent' : 
                   weatherData.current.visibility >= 5 ? 'Good' : 'Limited'}
                </p>
              </Card>
            </>
          )}
        </div>

        {/* Hourly Forecast */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-dark-brown">
              Today's Hourly Forecast
            </h3>
            {!loading && (
              <Button onClick={refetch} variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="text-center p-4 rounded-2xl bg-honey-light/20">
                  <Skeleton className="h-4 w-12 mx-auto mb-2" />
                  <Skeleton className="w-8 h-8 mx-auto mb-3" />
                  <Skeleton className="h-6 w-12 mx-auto mb-1" />
                  <Skeleton className="h-3 w-16 mx-auto mb-2" />
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-12 mx-auto" />
                    <Skeleton className="h-3 w-12 mx-auto" />
                  </div>
                </div>
              ))
            ) : weatherData && (
              weatherData.hourly.map((hour, index) => (
                <div 
                  key={index} 
                  className="text-center p-4 rounded-2xl bg-honey-light/20 hover:bg-honey-light/30 transition-all duration-300 hover-lift"
                >
                  <p className="text-sm text-dark-brown/70 mb-2">{hour.time}</p>
                  <WeatherIcon 
                    icon={hour.icon} 
                    className="w-8 h-8 mx-auto mb-3 text-amber-dark" 
                  />
                  <p className="text-xl font-bold text-dark-brown mb-1">{hour.temp}°C</p>
                  <p className="text-xs text-dark-brown/60 mb-2 capitalize">{hour.condition}</p>
                  <div className="space-y-1 text-xs text-dark-brown/60">
                    <div className="flex items-center justify-center gap-1">
                      <Droplets className="w-3 h-3" />
                      <span>{hour.humidity}%</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Wind className="w-3 h-3" />
                      <span>{hour.windSpeed} km/h</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default WeatherDashboard;