import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, AlertTriangle, Thermometer, Droplets, Wind, Sun } from "lucide-react";

const WeatherAlerts = () => {
  const alerts = [
    {
      id: 1,
      type: "high",
      icon: AlertTriangle,
      title: "High Temperature Warning",
      description: "Expected temperatures above 35°C this afternoon. Consider providing extra ventilation for hives.",
      time: "2 hours ago",
      priority: "high" as const,
    },
    {
      id: 2,
      type: "medium",
      icon: Droplets,
      title: "Rain Expected",
      description: "Light rain forecasted for tomorrow morning. Reduced foraging activity expected.",
      time: "4 hours ago",
      priority: "medium" as const,
    },
    {
      id: 3,
      type: "low",
      icon: Wind,
      title: "Windy Conditions",
      description: "Strong winds (25+ mph) expected this evening. Monitor hive stability.",
      time: "1 day ago",
      priority: "low" as const,
    },
  ];

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
            {alerts.map((alert) => (
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
            ))}
            <Button variant="outline" className="w-full">
              View All Alerts
            </Button>
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