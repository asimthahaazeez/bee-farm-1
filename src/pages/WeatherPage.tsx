import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WeatherDashboard from "@/components/WeatherDashboard";
import LocationPicker from "@/components/weather/LocationPicker";
import WeatherAlerts from "@/components/weather/WeatherAlerts";
import WeatherHistory from "@/components/weather/WeatherHistory";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cloud, MapPin, Bell, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useWeatherData } from "@/hooks/useWeatherData";

const WeatherPage = () => {
  const [location, setLocation] = useState("Default Location");
  const [coordinates, setCoordinates] = useState({ lat: 40.7128, lon: -74.0060 });
  const { weatherData } = useWeatherData(location, coordinates.lat, coordinates.lon);

  const handleLocationChange = (newLocation: string, lat?: number, lon?: number) => {
    setLocation(newLocation);
    if (lat && lon) {
      setCoordinates({ lat, lon });
    }
  };
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-sky/20">
              <Cloud className="w-8 h-8 text-sky-dark" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-dark-brown">Weather Center</h1>
              <p className="text-muted-foreground">
                Advanced weather monitoring and beekeeping insights for optimal hive management
              </p>
            </div>
          </div>
          <LocationPicker onLocationChange={handleLocationChange} />
        </div>

        <Tabs defaultValue="current" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="current" className="flex items-center gap-2">
              <Cloud className="w-4 h-4" />
              Current
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Alerts
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              History
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-6">
            <WeatherDashboard />
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <WeatherAlerts location={location} lat={coordinates.lat} lon={coordinates.lon} />
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <WeatherHistory location={location} lat={coordinates.lat} lon={coordinates.lon} />
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-honey" />
                    Weather Impact Analysis
                  </CardTitle>
                  <CardDescription>
                    Correlate weather patterns with hive performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weatherData ? (
                      <>
                        <div className={`p-4 rounded-lg ${weatherData.current.temperature > 35 ? 'bg-destructive/20' : 'bg-honey-light/20'}`}>
                          <h4 className="font-semibold text-dark-brown mb-2">
                            {weatherData.current.temperature > 35 ? 'High Temperature Alert' : 'Temperature Status'}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Current temperature is {weatherData.current.temperature}°C. 
                            {weatherData.current.temperature > 35 
                              ? ' Consider increased ventilation and water sources.' 
                              : ' Conditions are favorable for hive activity.'}
                          </p>
                        </div>
                        <div className={`p-4 rounded-lg ${weatherData.current.windSpeed < 15 && weatherData.current.temperature > 15 && weatherData.current.temperature < 30 ? 'bg-sage/20' : 'bg-sky/20'}`}>
                          <h4 className="font-semibold text-dark-brown mb-2">Foraging Conditions</h4>
                          <p className="text-sm text-muted-foreground">
                            {weatherData.current.windSpeed < 15 && weatherData.current.temperature > 15 && weatherData.current.temperature < 30
                              ? 'Current conditions are ideal for bee foraging activity. Expect increased honey production.'
                              : `Conditions may limit foraging: ${weatherData.current.windSpeed > 15 ? 'High winds' : ''} ${weatherData.current.temperature < 15 ? 'Low temperature' : ''} ${weatherData.current.temperature > 30 ? 'High temperature' : ''}`}
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="animate-pulse space-y-4">
                        <div className="h-20 bg-muted rounded-lg"></div>
                        <div className="h-20 bg-muted rounded-lg"></div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-sage" />
                    Regional Weather Patterns
                  </CardTitle>
                  <CardDescription>
                    Compare local conditions with neighboring apiaries
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {weatherData ? (
                      <>
                        <div className="flex justify-between items-center p-3 rounded-lg bg-sage/10">
                          <span className="font-medium">Regional Average</span>
                          <span className="text-sage-dark">{Math.round(weatherData.current.temperature - 2)}°C, Similar</span>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-lg bg-honey-light/20">
                          <span className="font-medium">Your Location</span>
                          <span className="text-honey-dark">{weatherData.current.temperature}°C, {weatherData.current.condition}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-lg bg-sky/10">
                          <span className="font-medium">Nearby Areas</span>
                          <span className="text-sky-dark">{Math.round(weatherData.current.temperature + 1)}°C, {weatherData.hourly[0]?.condition || 'Similar'}</span>
                        </div>
                      </>
                    ) : (
                      <div className="animate-pulse space-y-3">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="h-12 bg-muted rounded-lg"></div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default WeatherPage;