import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Zap, 
  Play,
  Sparkles,
  Rocket,
  Shield,
  Heart,
  Users,
  Activity,
  Cloud,
  BookOpen,
  ShoppingCart
} from "lucide-react";
import { Link } from "react-router-dom";

const InteractiveCTA = () => {
  const [hoveredPath, setHoveredPath] = useState<number | null>(null);

  const pathways = [
    {
      title: "Start Monitoring",
      subtitle: "Begin your smart beekeeping journey",
      description: "Set up your first hive, get weather alerts, and join the community",
      icon: Activity,
      color: "sage",
      href: "/diagnostics",
      features: ["AI Health Analysis", "Weather Monitoring", "Expert Community"],
      cta: "Start Free Trial"
    },
    {
      title: "Explore Marketplace", 
      subtitle: "Find everything you need",
      description: "Browse quality equipment, connect with local suppliers, sell your honey",
      icon: ShoppingCart,
      color: "honey",
      href: "/marketplace", 
      features: ["Premium Equipment", "Local Suppliers", "Honey Sales"],
      cta: "Browse Products"
    },
    {
      title: "Learn & Grow",
      subtitle: "Master beekeeping techniques", 
      description: "Access expert guides, video tutorials, and best practices from pros",
      icon: BookOpen,
      color: "amber",
      href: "/knowledge",
      features: ["Expert Guides", "Video Tutorials", "Best Practices"],
      cta: "Start Learning"
    }
  ];

  const getColorClasses = (color: string) => {
    const classes = {
      sage: {
        bg: "bg-sage/10 hover:bg-sage/20",
        border: "border-sage/30 hover:border-sage/50",
        icon: "text-sage",
        accent: "bg-sage text-white",
        glow: "shadow-sage/20"
      },
      honey: {
        bg: "bg-honey/10 hover:bg-honey/20", 
        border: "border-honey/30 hover:border-honey/50",
        icon: "text-honey-dark",
        accent: "bg-honey text-dark-brown",
        glow: "shadow-honey/20"
      },
      amber: {
        bg: "bg-amber/10 hover:bg-amber/20",
        border: "border-amber/30 hover:border-amber/50", 
        icon: "text-amber-dark",
        accent: "bg-amber text-white",
        glow: "shadow-amber/20"
      }
    };
    return classes[color as keyof typeof classes];
  };

  const benefits = [
    { icon: Shield, text: "30-day free trial" },
    { icon: Users, text: "Join 15K+ beekeepers" },
    { icon: Zap, text: "AI-powered insights" },
    { icon: Heart, text: "Expert support included" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-background via-honey-light/5 to-sage/5 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Hexagons */}
        <div className="absolute top-20 left-10 w-16 h-16 hexagon bg-honey/5 animate-float" />
        <div className="absolute top-40 right-20 w-20 h-20 hexagon bg-sage/5 animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-32 left-1/4 w-12 h-12 hexagon bg-amber/5 animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-20 right-10 w-24 h-24 hexagon bg-sky/5 animate-float" style={{ animationDelay: "0.5s" }} />
        
        {/* Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" aria-hidden="true">
          <defs>
            <pattern id="dots" patternUnits="userSpaceOnUse" width="50" height="50">
              <circle cx="25" cy="25" r="2" fill="currentColor" className="text-honey" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-6 h-6 text-honey animate-pulse" />
            <Badge className="bg-gradient-to-r from-honey/20 to-amber/20 text-honey-dark border-honey/30">
              <Rocket className="w-3 h-3 mr-1" />
              Ready to Transform Your Beekeeping?
            </Badge>
            <Sparkles className="w-6 h-6 text-amber animate-pulse" style={{ animationDelay: "0.5s" }} />
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Choose Your{" "}
            <span className="text-transparent bg-gradient-to-r from-honey via-amber to-honey-dark bg-clip-text">
              Path Forward
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            Start your journey with the tools and knowledge that fit your goals
          </p>
        </div>

        {/* Pathways Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {pathways.map((pathway, index) => {
            const isHovered = hoveredPath === index;
            const colorClasses = getColorClasses(pathway.color);
            
            return (
              <Card
                key={index}
                className={`group relative overflow-hidden transition-all duration-500 cursor-pointer ${colorClasses.bg} ${colorClasses.border} border-2 ${isHovered ? colorClasses.glow + ' shadow-2xl scale-105' : 'hover:shadow-xl'}`}
                onMouseEnter={() => setHoveredPath(index)}
                onMouseLeave={() => setHoveredPath(null)}
              >
                <CardContent className="p-8 text-center relative z-10">
                  {/* Icon */}
                  <div className={`w-20 h-20 ${colorClasses.bg} rounded-3xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 ${isHovered ? 'scale-110 rotate-6' : ''}`}>
                    <pathway.icon className={`w-10 h-10 ${colorClasses.icon}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {pathway.title}
                  </h3>
                  
                  <p className="text-lg font-medium text-honey-dark mb-4">
                    {pathway.subtitle}
                  </p>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {pathway.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-8">
                    {pathway.features.map((feature, i) => (
                      <div key={i} className="flex items-center justify-center gap-2 text-sm text-foreground/80">
                        <div className={`w-1.5 h-1.5 rounded-full ${colorClasses.accent}`} />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link to={pathway.href}>
                    <Button
                      className={`w-full ${colorClasses.accent} hover:scale-105 transition-all duration-300 font-semibold shadow-lg text-lg py-6 group/btn`}
                    >
                      {pathway.cta}
                      <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </Link>
                </CardContent>

                {/* Hover Glow Effect */}
                {isHovered && (
                  <div className={`absolute inset-0 ${colorClasses.bg} opacity-20 pointer-events-none`} />
                )}

                {/* Animated Border */}
                <div className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r ${pathway.color === 'sage' ? 'from-sage/20 to-transparent' : pathway.color === 'honey' ? 'from-honey/20 to-transparent' : 'from-amber/20 to-transparent'} pointer-events-none`} />
              </Card>
            );
          })}
        </div>

        {/* Benefits Strip */}
        <Card className="bg-card/90 backdrop-blur-sm border-2 border-honey/20 max-w-4xl mx-auto">
          <CardContent className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex flex-col items-center text-center gap-3">
                  <div className="p-3 bg-honey/10 rounded-full">
                    <benefit.icon className="w-6 h-6 text-honey-dark" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{benefit.text}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Demo CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Want to see BeeWise in action first?</p>
          <Button variant="outline" size="lg" className="group border-honey/30 hover:bg-honey/10">
            <Play className="w-5 h-5 mr-2 text-honey" />
            Watch 2-Minute Demo
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform text-honey" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InteractiveCTA;