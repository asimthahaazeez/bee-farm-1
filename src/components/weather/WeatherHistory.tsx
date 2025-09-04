import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Calendar, TrendingUp, Thermometer, Droplets } from "lucide-react";

const WeatherHistory = () => {
  // Mock historical data
  const temperatureData = [
    { date: "Jan", avg: 15, min: 8, max: 22 },
    { date: "Feb", avg: 18, min: 12, max: 24 },
    { date: "Mar", avg: 22, min: 16, max: 28 },
    { date: "Apr", avg: 25, min: 19, max: 31 },
    { date: "May", avg: 28, min: 22, max: 34 },
    { date: "Jun", avg: 32, min: 26, max: 38 },
  ];

  const precipitationData = [
    { date: "Jan", rainfall: 45 },
    { date: "Feb", rainfall: 38 },
    { date: "Mar", rainfall: 62 },
    { date: "Apr", rainfall: 28 },
    { date: "May", rainfall: 15 },
    { date: "Jun", rainfall: 8 },
  ];

  const hiveCorrelationData = [
    { date: "Jan", temperature: 15, hiveActivity: 20, honeyProduction: 2 },
    { date: "Feb", temperature: 18, hiveActivity: 35, honeyProduction: 4 },
    { date: "Mar", temperature: 22, hiveActivity: 65, honeyProduction: 8 },
    { date: "Apr", temperature: 25, hiveActivity: 85, honeyProduction: 12 },
    { date: "May", temperature: 28, hiveActivity: 95, honeyProduction: 18 },
    { date: "Jun", temperature: 32, hiveActivity: 88, honeyProduction: 15 },
  ];

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
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={temperatureData}>
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
                  <p className="text-2xl font-bold text-destructive">38°C</p>
                  <p className="text-sm text-muted-foreground">Highest Recorded</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-honey/10">
                  <p className="text-2xl font-bold text-honey-dark">24°C</p>
                  <p className="text-sm text-muted-foreground">Average</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-sky/10">
                  <p className="text-2xl font-bold text-sky-dark">8°C</p>
                  <p className="text-sm text-muted-foreground">Lowest Recorded</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="precipitation" className="space-y-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={precipitationData}>
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
                  <p className="text-2xl font-bold text-sky-dark">62mm</p>
                  <p className="text-sm text-muted-foreground">Wettest Month</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-amber/10">
                  <p className="text-2xl font-bold text-amber-dark">8mm</p>
                  <p className="text-sm text-muted-foreground">Driest Month</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="correlation" className="space-y-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={hiveCorrelationData}>
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
                    Highest hive activity correlates with temperatures between 25-28°C
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-honey/10">
                  <h4 className="font-semibold text-honey-dark mb-2">Optimal Production</h4>
                  <p className="text-sm text-muted-foreground">
                    Maximum honey production occurs during moderate temperature periods
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherHistory;