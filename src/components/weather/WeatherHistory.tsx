import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Calendar, TrendingUp, Thermometer, Droplets } from "lucide-react";
import { useWeatherData } from "@/hooks/useWeatherData";
import { useState, useEffect } from "react";

interface LocationPickerProps {
  location?: string;
  lat?: number;
  lon?: number;
}

const WeatherHistory = ({ location, lat, lon }: LocationPickerProps) => {
  const { weatherData, loading } = useWeatherData(location, lat, lon);
  const [historyData, setHistoryData] = useState<any>(null);

  // Generate historical-like data from current weather data for demo
  useEffect(() => {
    if (!weatherData) return;

    const { current, hourly } = weatherData;
    
    // Generate temperature trend from hourly data
    const temperatureData = hourly.map((hour, index) => ({
      date: hour.time,
      avg: hour.temp,
      min: Math.max(hour.temp - 5, 0),
      max: hour.temp + 3,
    }));

    // Generate precipitation data from hourly forecast
    const precipitationData = hourly.map((hour) => ({
      date: hour.time,
      rainfall: hour.condition.includes('rain') ? hour.humidity * 0.5 : 0,
    }));

    // Generate correlation data using current weather as baseline
    const hiveCorrelationData = hourly.map((hour, index) => ({
      date: hour.time,
      temperature: hour.temp,
      hiveActivity: Math.max(0, Math.min(100, (hour.temp - 10) * 3 + (100 - hour.humidity))),
      honeyProduction: Math.max(0, Math.min(20, (hour.temp - 15) * 0.8)),
    }));

    setHistoryData({
      temperature: temperatureData,
      precipitation: precipitationData,
      correlation: hiveCorrelationData,
      stats: {
        maxTemp: Math.max(...temperatureData.map(d => d.max)),
        avgTemp: Math.round(temperatureData.reduce((sum, d) => sum + d.avg, 0) / temperatureData.length),
        minTemp: Math.min(...temperatureData.map(d => d.min)),
        maxRain: Math.max(...precipitationData.map(d => d.rainfall)),
        minRain: Math.min(...precipitationData.map(d => d.rainfall)),
      }
    });
  }, [weatherData]);

  return (
    <div className="space-y-6">
      <Card className="hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-honey" />
            Weather History & Analytics
          </CardTitle>
          <CardDescription>
            Historical weather patterns and their correlation with hive performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="temperature" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="temperature" className="flex items-center gap-2">
                <Thermometer className="w-4 h-4" />
                Temperature
              </TabsTrigger>
              <TabsTrigger value="precipitation" className="flex items-center gap-2">
                <Droplets className="w-4 h-4" />
                Precipitation
              </TabsTrigger>
              <TabsTrigger value="correlation" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Hive Impact
              </TabsTrigger>
            </TabsList>

            <TabsContent value="temperature" className="space-y-4">
              {loading || !historyData ? (
                <div className="h-[300px] flex items-center justify-center">
                  <div className="animate-pulse text-muted-foreground">Loading temperature data...</div>
                </div>
              ) : (
                <>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={historyData.temperature}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                        />
                        <Line type="monotone" dataKey="max" stroke="hsl(var(--destructive))" strokeWidth={2} name="Max Temp" />
                        <Line type="monotone" dataKey="avg" stroke="hsl(var(--honey))" strokeWidth={2} name="Avg Temp" />
                        <Line type="monotone" dataKey="min" stroke="hsl(var(--sky))" strokeWidth={2} name="Min Temp" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 rounded-lg bg-destructive/10">
                      <p className="text-2xl font-bold text-destructive">{historyData.stats.maxTemp}°C</p>
                      <p className="text-sm text-muted-foreground">Highest Recorded</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-honey/10">
                      <p className="text-2xl font-bold text-honey-dark">{historyData.stats.avgTemp}°C</p>
                      <p className="text-sm text-muted-foreground">Average</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-sky/10">
                      <p className="text-2xl font-bold text-sky-dark">{historyData.stats.minTemp}°C</p>
                      <p className="text-sm text-muted-foreground">Lowest Recorded</p>
                    </div>
                  </div>
                </>
              )}
            </TabsContent>

            <TabsContent value="precipitation" className="space-y-4">
              {loading || !historyData ? (
                <div className="h-[300px] flex items-center justify-center">
                  <div className="animate-pulse text-muted-foreground">Loading precipitation data...</div>
                </div>
              ) : (
                <>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={historyData.precipitation}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                        />
                        <Bar dataKey="rainfall" fill="hsl(var(--sky))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 rounded-lg bg-sky/10">
                      <p className="text-2xl font-bold text-sky-dark">{Math.round(historyData.stats.maxRain)}mm</p>
                      <p className="text-sm text-muted-foreground">Highest Expected</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-amber/10">
                      <p className="text-2xl font-bold text-amber-dark">{Math.round(historyData.stats.minRain)}mm</p>
                      <p className="text-sm text-muted-foreground">Lowest Expected</p>
                    </div>
                  </div>
                </>
              )}
            </TabsContent>

            <TabsContent value="correlation" className="space-y-4">
              {loading || !historyData ? (
                <div className="h-[300px] flex items-center justify-center">
                  <div className="animate-pulse text-muted-foreground">Loading correlation data...</div>
                </div>
              ) : (
                <>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={historyData.correlation}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                        />
                        <Line type="monotone" dataKey="temperature" stroke="hsl(var(--amber))" strokeWidth={2} name="Temperature (°C)" />
                        <Line type="monotone" dataKey="hiveActivity" stroke="hsl(var(--sage))" strokeWidth={2} name="Hive Activity (%)" />
                        <Line type="monotone" dataKey="honeyProduction" stroke="hsl(var(--honey))" strokeWidth={2} name="Honey Production (kg)" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-sage/10">
                      <h4 className="font-semibold text-sage-dark mb-2">Peak Activity Period</h4>
                      <p className="text-sm text-muted-foreground">
                        Based on forecast, optimal activity expected when temperatures reach 25-28°C
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-honey/10">
                      <h4 className="font-semibold text-honey-dark mb-2">Production Forecast</h4>
                      <p className="text-sm text-muted-foreground">
                        Current weather patterns suggest {weatherData?.current.temperature > 20 ? 'favorable' : 'reduced'} honey production conditions
                      </p>
                    </div>
                  </div>
                </>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherHistory;