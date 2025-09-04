import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, AlertTriangle, Thermometer, Droplets, Wind, Sun } from "lucide-react";
import { useWeatherData } from "@/hooks/useWeatherData";
import { useState, useEffect } from "react";

interface WeatherAlert {
  id: string;
  type: string;
  icon: any;
  title: string;
  description: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
}

interface LocationPickerProps {
  location?: string;
  lat?: number;
  lon?: number;
}

const WeatherAlerts = ({ location, lat, lon }: LocationPickerProps) => {
  const { weatherData, loading } = useWeatherData(location, lat, lon);
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);

  // Generate alerts based on real weather data
  useEffect(() => {
    if (!weatherData) return;

    const newAlerts: WeatherAlert[] = [];
    const { current, hourly } = weatherData;

    // High temperature alert
    if (current.temperature > 35) {
      newAlerts.push({
        id: 'temp-high',
        type: 'high',
        icon: AlertTriangle,
        title: 'High Temperature Warning',
        description: `Current temperature is ${current.temperature}°C. Consider providing extra ventilation for hives.`,
        time: 'Now',
        priority: 'high'
      });
    }

    // Rain expected alert
    const rainInNext6Hours = hourly.slice(0, 2).some(h => h.condition.includes('rain'));
    if (rainInNext6Hours) {
      newAlerts.push({
        id: 'rain',
        type: 'medium',
        icon: Droplets,
        title: 'Rain Expected',
        description: 'Rain forecasted in the next few hours. Reduced foraging activity expected.',
        time: 'Next 6 hours',
        priority: 'medium'
      });
    }

    // High wind alert
    if (current.windSpeed > 25) {
      newAlerts.push({
        id: 'wind',
        type: 'low',
        icon: Wind,
        title: 'Windy Conditions',
        description: `Strong winds (${current.windSpeed} mph) detected. Monitor hive stability.`,
        time: 'Now',
        priority: 'low'
      });
    }

    // Low temperature alert for bee activity
    if (current.temperature < 10) {
      newAlerts.push({
        id: 'temp-low',
        type: 'medium',
        icon: Thermometer,
        title: 'Low Temperature Alert',
        description: `Temperature is ${current.temperature}°C. Bees may cluster in hives.`,
        time: 'Now',
        priority: 'medium'
      });
    }

    setAlerts(newAlerts);
  }, [weatherData]);

  const alertSettings = [
    {
      id: "temperature",
      label: "Temperature Alerts",
      description: "Notify when temperatures exceed safe ranges",
      icon: Thermometer,
      enabled: true,
    },
    {
      id: "precipitation",
      label: "Rain & Storm Alerts",
      description: "Get notified about upcoming weather that affects foraging",
      icon: Droplets,
      enabled: true,
    },
    {
      id: "wind",
      label: "Wind Alerts",
      description: "Alerts for high winds that may impact hive stability",
      icon: Wind,
      enabled: false,
    },
    {
      id: "sun",
      label: "UV & Solar Alerts",
      description: "Notifications about intense sun and heat conditions",
      icon: Sun,
      enabled: true,
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive";
      case "medium": return "bg-amber";
      case "low": return "bg-sky";
      default: return "bg-muted";
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Alerts */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-amber" />
              Active Alerts
            </CardTitle>
            <CardDescription>
              Current weather conditions that may affect your hives
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-16 bg-muted rounded-lg"></div>
                  </div>
                ))}
              </div>
            ) : alerts.length > 0 ? (
              alerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                  <div className={`p-2 rounded-lg ${getPriorityColor(alert.priority)}/20`}>
                    <alert.icon className={`w-4 h-4 ${getPriorityColor(alert.priority).replace('bg-', 'text-')}`} />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-dark-brown">{alert.title}</h4>
                      <Badge variant="outline" className={`${getPriorityColor(alert.priority)}/20 border-${getPriorityColor(alert.priority).replace('bg-', '')}/30`}>
                        {alert.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No active weather alerts</p>
                <p className="text-sm text-muted-foreground">Current conditions are safe for your hives</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Alert Settings */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-honey" />
              Alert Preferences
            </CardTitle>
            <CardDescription>
              Customize which weather alerts you want to receive
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {alertSettings.map((setting) => (
              <div key={setting.id} className="flex items-center justify-between space-y-2">
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-2 rounded-lg bg-honey-light/20">
                    <setting.icon className="w-4 h-4 text-honey-dark" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor={setting.id} className="font-medium cursor-pointer">
                      {setting.label}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {setting.description}
                    </p>
                  </div>
                </div>
                <Switch
                  id={setting.id}
                  checked={setting.enabled}
                  className="data-[state=checked]:bg-honey"
                />
              </div>
            ))}
            <Button className="w-full bg-gradient-to-r from-honey to-amber hover:from-honey-dark hover:to-amber-dark">
              Save Preferences
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WeatherAlerts;