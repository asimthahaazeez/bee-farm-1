import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WeatherDashboard from "@/components/WeatherDashboard";
import LocationPicker from "@/components/weather/LocationPicker";
import WeatherAlerts from "@/components/weather/WeatherAlerts";
import WeatherHistory from "@/components/weather/WeatherHistory";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cloud, MapPin, Bell, TrendingUp } from "lucide-react";

const WeatherPage = () => {
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
          <LocationPicker />
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
            <WeatherAlerts />
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <WeatherHistory />
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
                    <div className="p-4 rounded-lg bg-honey-light/20">
                      <h4 className="font-semibold text-dark-brown mb-2">High Temperature Alert</h4>
                      <p className="text-sm text-muted-foreground">
                        Temperatures above 35°C detected. Consider increased ventilation and water sources.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-sky/20">
                      <h4 className="font-semibold text-dark-brown mb-2">Optimal Foraging Conditions</h4>
                      <p className="text-sm text-muted-foreground">
                        Current conditions are ideal for bee foraging activity. Expect increased honey production.
                      </p>
                    </div>
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
                    <div className="flex justify-between items-center p-3 rounded-lg bg-sage/10">
                      <span className="font-medium">North Region</span>
                      <span className="text-sage-dark">22°C, Clear</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-honey-light/20">
                      <span className="font-medium">Your Location</span>
                      <span className="text-honey-dark">24°C, Sunny</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-sky/10">
                      <span className="font-medium">South Region</span>
                      <span className="text-sky-dark">20°C, Cloudy</span>
                    </div>
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