import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Cloud, 
  Activity, 
  Users, 
  ShoppingCart, 
  BookOpen,
  BarChart3,
  ArrowRight,
  Zap,
  Shield,
  Brain
} from "lucide-react";
import { Link } from "react-router-dom";

const FeatureShowcase = () => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      icon: Cloud,
      title: "Smart Weather Insights",
      description: "AI-powered weather forecasting specifically for beekeepers",
      highlights: ["Real-time alerts", "7-day forecasts", "Bee activity predictions"],
      color: "sky",
      href: "/weather",
      stats: "95% accuracy"
    },
    {
      icon: Activity,
      title: "AI Hive Diagnostics", 
      description: "Revolutionary computer vision for hive health analysis",
      highlights: ["Instant photo analysis", "Disease detection", "Population estimates"],
      color: "sage",
      href: "/diagnostics",
      stats: "42K+ analyses"
    },
    {
      icon: Users,
      title: "Thriving Community",
      description: "Connect with fellow beekeepers worldwide",
      highlights: ["Expert knowledge sharing", "Local connections", "Real-time help"],
      color: "amber",
      href: "/community",
      stats: "15K+ members"
    },
    {
      icon: ShoppingCart,
      title: "Integrated Marketplace",
      description: "Everything you need for successful beekeeping",
      highlights: ["Quality equipment", "Local honey sales", "Bulk discounts"],
      color: "honey",
      href: "/marketplace",
      stats: "500+ products"
    },
    {
      icon: BookOpen,
      title: "Knowledge Hub",
      description: "Comprehensive learning resources and guides", 
      highlights: ["Expert articles", "Video tutorials", "Best practices"],
      color: "sage",
      href: "/knowledge",
      stats: "200+ articles"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Data-driven insights for optimal hive management",
      highlights: ["Performance tracking", "Trend analysis", "Custom reports"],
      color: "sky",
      href: "/analytics",
      stats: "Real-time data"
    }
  ];

  const getColorClasses = (color: string, isHovered: boolean) => {
    const baseClasses = {
      sky: {
        bg: isHovered ? "bg-sky/20" : "bg-sky/10",
        border: "border-sky/30",
        icon: "text-sky-dark",
        accent: "bg-sky text-white"
      },
      sage: {
        bg: isHovered ? "bg-sage/20" : "bg-sage/10", 
        border: "border-sage/30",
        icon: "text-sage-dark",
        accent: "bg-sage text-white"
      },
      amber: {
        bg: isHovered ? "bg-amber/20" : "bg-amber/10",
        border: "border-amber/30", 
        icon: "text-amber-dark",
        accent: "bg-amber text-white"
      },
      honey: {
        bg: isHovered ? "bg-honey/20" : "bg-honey/10",
        border: "border-honey/30",
        icon: "text-honey-dark", 
        accent: "bg-honey text-dark-brown"
      }
    };
    return baseClasses[color as keyof typeof baseClasses];
  };

  return (
    <section className="py-20 bg-gradient-to-br from-background via-cream/30 to-honey-light/20 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 hexagon bg-honey/10 animate-float" style={{ animationDelay: "0s" }} />
        <div className="absolute top-40 right-20 w-16 h-16 hexagon bg-sage/10 animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-20 left-1/3 w-12 h-12 hexagon bg-amber/10 animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-40 right-10 w-24 h-24 hexagon bg-sky/10 animate-float" style={{ animationDelay: "3s" }} />
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge className="mb-4 bg-honey/20 text-honey-dark border-honey/30 hover:bg-honey/30">
            <Zap className="w-3 h-3 mr-1" />
            Powered by AI
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Everything You Need to{" "}
            <span className="text-transparent bg-gradient-to-r from-honey via-amber to-honey-dark bg-clip-text">
              Thrive
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            From AI-powered diagnostics to community wisdom, discover the complete beekeeping ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const isHovered = hoveredFeature === index;
            const colorClasses = getColorClasses(feature.color, isHovered);
            
            return (
              <Card 
                key={index}
                className={`group relative overflow-hidden transition-all duration-500 hover-lift cursor-pointer ${colorClasses.bg} ${colorClasses.border} border-2`}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <CardContent className="p-8">
                  {/* Stats Badge */}
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-4 rounded-2xl ${colorClasses.bg} transition-all duration-300`}>
                      <feature.icon className={`w-8 h-8 ${colorClasses.icon} transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`} />
                    </div>
                    <Badge className={`${colorClasses.accent} text-xs font-semibold px-3 py-1 shadow-lg`}>
                      {feature.stats}
                    </Badge>
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-honey-dark transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Feature Highlights */}
                  <div className="space-y-2 mb-6">
                    {feature.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                        <div className={`w-1.5 h-1.5 rounded-full ${colorClasses.accent}`} />
                        {highlight}
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link to={feature.href}>
                    <Button 
                      className={`w-full ${colorClasses.accent} hover:scale-105 transition-all duration-300 font-semibold shadow-lg group/btn`}
                    >
                      Explore Feature
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </Link>
                </CardContent>

                {/* Hover Glow Effect */}
                {isHovered && (
                  <div className={`absolute inset-0 ${colorClasses.bg} opacity-20 pointer-events-none transition-opacity duration-500`} />
                )}
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 p-4 bg-card/80 backdrop-blur-sm rounded-2xl border shadow-lg">
            <Shield className="w-6 h-6 text-sage" />
            <span className="text-muted-foreground">Trusted by 15,000+ beekeepers worldwide</span>
            <Brain className="w-6 h-6 text-honey-dark" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;