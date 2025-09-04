import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Activity, 
  Users, 
  Zap,
  ArrowRight,
  Cloud,
  Thermometer,
  Droplets,
  Eye
} from "lucide-react";
import { Link } from "react-router-dom";

const LiveStatsPreview = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [animatedStats, setAnimatedStats] = useState({
    activeHives: 0,
    healthScore: 0,
    communityMembers: 0,
    temperature: 0
  });

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Animate counters on mount
  useEffect(() => {
    const targets = {
      activeHives: 156,
      healthScore: 94,
      communityMembers: 15247,
      temperature: 72
    };

    const duration = 2000; // 2 seconds
    const steps = 60; // 60fps
    const stepDuration = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setAnimatedStats({
        activeHives: Math.floor(targets.activeHives * easeOutQuart),
        healthScore: Math.floor(targets.healthScore * easeOutQuart),
        communityMembers: Math.floor(targets.communityMembers * easeOutQuart),
        temperature: Math.floor(targets.temperature * easeOutQuart)
      });

      if (step >= steps) {
        clearInterval(timer);
        setAnimatedStats(targets); // Ensure exact final values
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: true, 
      hour: 'numeric', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  const stats = [
    {
      label: "Active Hives Monitored",
      value: formatNumber(animatedStats.activeHives),
      icon: Activity,
      color: "text-sage",
      bgColor: "bg-sage/10",
      href: "/diagnostics"
    },
    {
      label: "Average Health Score",
      value: `${animatedStats.healthScore}%`,
      icon: TrendingUp, 
      color: "text-honey-dark",
      bgColor: "bg-honey/10",
      href: "/analytics"
    },
    {
      label: "Community Members",
      value: formatNumber(animatedStats.communityMembers),
      icon: Users,
      color: "text-amber-dark", 
      bgColor: "bg-amber/10",
      href: "/community"
    },
    {
      label: "Current Temperature",
      value: `${animatedStats.temperature}°F`,
      icon: Thermometer,
      color: "text-sky-dark",
      bgColor: "bg-sky/10", 
      href: "/weather"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-card/50 via-honey-light/10 to-card/50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 bg-sage rounded-full animate-pulse" />
            <Badge className="bg-sage/20 text-sage border-sage/30">
              <Zap className="w-3 h-3 mr-1" />
              Live Data
            </Badge>
            <div className="w-2 h-2 bg-sage rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Real-Time{" "}
            <span className="text-transparent bg-gradient-to-r from-sage via-honey to-amber bg-clip-text">
              Insights
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground mb-2">
            Join thousands of beekeepers monitoring their hives with BeeWise
          </p>
          
          <div className="text-2xl font-mono text-honey-dark font-bold">
            {formatTime(currentTime)}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Link key={index} to={stat.href}>
              <Card className="group hover-lift cursor-pointer bg-card/80 backdrop-blur-sm border-2 border-transparent hover:border-honey/30 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${stat.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  
                  <div className="text-3xl font-bold text-foreground mb-2 font-mono">
                    {stat.value}
                  </div>
                  
                  <div className="text-sm text-muted-foreground leading-tight">
                    {stat.label}
                  </div>

                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="w-4 h-4 mx-auto text-honey-dark" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Weather Preview Card */}
        <div className="max-w-2xl mx-auto">
          <Card className="bg-gradient-to-br from-sky/10 via-card/80 to-honey/10 backdrop-blur-sm border-2 border-sky/20 overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-sky/20 rounded-xl">
                    <Cloud className="w-6 h-6 text-sky-dark" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Today's Forecast</h3>
                    <p className="text-sm text-muted-foreground">Perfect conditions for bee activity</p>
                  </div>
                </div>
                <Badge className="bg-sage text-white">Excellent</Badge>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <Thermometer className="w-5 h-5 text-amber mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{animatedStats.temperature}°F</div>
                  <div className="text-xs text-muted-foreground">Temperature</div>
                </div>
                <div className="text-center">
                  <Droplets className="w-5 h-5 text-sky mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">65%</div>
                  <div className="text-xs text-muted-foreground">Humidity</div>
                </div>
                <div className="text-center">
                  <Activity className="w-5 h-5 text-sage mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">High</div>
                  <div className="text-xs text-muted-foreground">Bee Activity</div>
                </div>
              </div>

              <Link to="/weather">
                <Button className="w-full bg-sky hover:bg-sky-dark text-white group transition-all duration-300">
                  <Eye className="w-4 h-4 mr-2" />
                  View Full Weather Dashboard
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LiveStatsPreview;