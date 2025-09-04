import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useWeatherData } from "@/hooks/useWeatherData";
import { Cloud, Thermometer, Droplets, Wind, Eye, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

interface WeatherWidgetProps {
  compact?: boolean;
  showRecommendation?: boolean;
}

const WeatherWidget = ({ compact = false, showRecommendation = true }: WeatherWidgetProps) => {
  const { weatherData, loading, error } = useWeatherData();

  if (loading) {
    return (
      <Card className={`${compact ? 'p-4' : ''} hover-lift shimmer`}>
        <div className="space-y-3">
          <div className="h-4 bg-muted rounded w-3/4"></div>
          <div className="h-8 bg-muted rounded w-1/2"></div>
          <div className="grid grid-cols-2 gap-2">
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded"></div>
          </div>
        </div>
      </Card>
    );
  }

  if (error || !weatherData) {
    return (
      <Card className={`${compact ? 'p-4' : ''} border-destructive/20 bg-destructive/5`}>
        <div className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="w-4 h-4" />
          <span className="text-sm">Weather data unavailable</span>
        </div>
      </Card>
    );
  }

  const WeatherIcon = ({ condition }: { condition: string }) => {
    const iconMap: { [key: string]: any } = {
      clear: Cloud,
      sunny: Cloud,
      cloudy: Cloud,
      rain: Droplets,
      storm: Wind,
    };
    const IconComponent = iconMap[condition.toLowerCase()] || Cloud;
    return <IconComponent className="w-5 h-5 text-sky-dark" />;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-amber text-dark-brown";
      case "low": return "bg-sky text-dark-brown";
      default: return "bg-muted text-muted-foreground";
    }
  };

  if (compact) {
    return (
      <Card className="hover-lift bg-gradient-to-br from-sky/10 to-honey-light/10 border-sky/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <WeatherIcon condition={weatherData.current.condition} />
              <span className="font-semibold text-dark-brown">
                {weatherData.current.temperature}°C
              </span>
            </div>
            <Badge variant="outline" className="text-xs">
              {weatherData.current.condition}
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Droplets className="w-3 h-3" />
              {weatherData.current.humidity}%
            </div>
             <div className="flex items-center gap-1">
               <Wind className="w-3 h-3" />
               {weatherData.current.windSpeed} km/h
             </div>
          </div>
          {showRecommendation && weatherData.aiRecommendation && (
            <div className="mt-3 pt-3 border-t border-border/30">
              <Badge 
                className={`text-xs ${getPriorityColor(weatherData.aiRecommendation.priority)} mb-2`}
              >
                {weatherData.aiRecommendation.priority} priority
              </Badge>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {weatherData.aiRecommendation.message}
              </p>
            </div>
          )}
          <Link to="/weather">
            <Button variant="ghost" size="sm" className="w-full mt-2 text-xs">
              View Details
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover-lift bg-gradient-to-br from-sky/10 to-honey-light/10 border-sky/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <WeatherIcon condition={weatherData.current.condition} />
            <span>Current Weather</span>
          </div>
          <Link to="/weather">
            <Button variant="ghost" size="sm">View Full</Button>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-dark-brown">
              {weatherData.current.temperature}°C
            </span>
            <Badge variant="outline" className="bg-white/50">
              {weatherData.current.condition}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-2 rounded-lg bg-white/30">
              <Droplets className="w-4 h-4 mx-auto mb-1 text-sky-dark" />
              <p className="text-sm font-medium">{weatherData.current.humidity}%</p>
              <p className="text-xs text-muted-foreground">Humidity</p>
            </div>
             <div className="text-center p-2 rounded-lg bg-white/30">
               <Wind className="w-4 h-4 mx-auto mb-1 text-sage-dark" />
               <p className="text-sm font-medium">{weatherData.current.windSpeed} km/h</p>
               <p className="text-xs text-muted-foreground">Wind</p>
             </div>
             <div className="text-center p-2 rounded-lg bg-white/30">
               <Eye className="w-4 h-4 mx-auto mb-1 text-amber-dark" />
               <p className="text-sm font-medium">{weatherData.current.visibility} km</p>
               <p className="text-xs text-muted-foreground">Visibility</p>
             </div>
            <div className="text-center p-2 rounded-lg bg-white/30">
              <Thermometer className="w-4 h-4 mx-auto mb-1 text-honey-dark" />
              <p className="text-sm font-medium">{weatherData.current.feelsLike}°C</p>
              <p className="text-xs text-muted-foreground">Feels Like</p>
            </div>
          </div>

          {showRecommendation && weatherData.aiRecommendation && (
            <div className="p-3 rounded-lg bg-white/50 border border-border/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-dark-brown">AI Recommendation</span>
                <Badge className={`text-xs ${getPriorityColor(weatherData.aiRecommendation.priority)}`}>
                  {weatherData.aiRecommendation.priority}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {weatherData.aiRecommendation.message}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;