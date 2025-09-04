import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Star, 
  Quote, 
  ChevronLeft, 
  ChevronRight,
  Award,
  TrendingUp,
  Users,
  Target
} from "lucide-react";

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Commercial Beekeeper",
      location: "Montana, USA",
      image: "/api/placeholder/80/80",
      rating: 5,
      quote: "BeeWise's AI diagnostics caught a varroa mite issue before I even noticed symptoms. Saved my entire operation this season.",
      metrics: {
        hives: 85,
        healthImprovement: "+23%",
        revenue: "$15K saved"
      },
      badge: "Top Contributor"
    },
    {
      name: "Marcus Chen",
      role: "Hobbyist Beekeeper",
      location: "California, USA", 
      image: "/api/placeholder/80/80",
      rating: 5,
      quote: "The weather predictions are incredibly accurate. I time my inspections perfectly now and my bees are thriving like never before.",
      metrics: {
        hives: 12,
        healthImprovement: "+45%", 
        revenue: "3x honey yield"
      },
      badge: "Rising Star"
    },
    {
      name: "Dr. Emma Rodriguez",
      role: "Research Entomologist",
      location: "Texas, USA",
      image: "/api/placeholder/80/80", 
      rating: 5,
      quote: "The community knowledge sharing is unparalleled. I've learned techniques here that aren't in any textbook.",
      metrics: {
        hives: 156,
        healthImprovement: "+31%",
        revenue: "Research grants"
      },
      badge: "Expert Mentor"
    },
    {
      name: "James Thompson",
      role: "Organic Farmer",
      location: "Vermont, USA",
      image: "/api/placeholder/80/80",
      rating: 5,
      quote: "Integrating BeeWise with my farm operations has increased pollination efficiency by 40%. My crop yields have never been better.",
      metrics: {
        hives: 28,
        healthImprovement: "+52%",
        revenue: "$8K increase"
      },
      badge: "Sustainability Leader"
    }
  ];

  const stats = [
    { label: "Average Health Score Increase", value: "38%", icon: TrendingUp, color: "text-sage" },
    { label: "Active Community Members", value: "15K+", icon: Users, color: "text-amber-dark" },
    { label: "Success Rate", value: "94%", icon: Target, color: "text-honey-dark" },
    { label: "Awards & Recognition", value: "12", icon: Award, color: "text-sky-dark" }
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const getBadgeColor = (badge: string) => {
    const colors = {
      "Top Contributor": "bg-sage text-white",
      "Rising Star": "bg-amber text-white",
      "Expert Mentor": "bg-honey-dark text-white",
      "Sustainability Leader": "bg-sky text-white"
    };
    return colors[badge as keyof typeof colors] || "bg-muted text-foreground";
  };

  return (
    <section className="py-20 bg-gradient-to-br from-honey-light/10 via-background to-sage/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-32 h-32 hexagon bg-honey/5 animate-float" />
        <div className="absolute bottom-20 left-10 w-24 h-24 hexagon bg-sage/5 animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 hexagon bg-amber/5 animate-float" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge className="mb-4 bg-honey/20 text-honey-dark border-honey/30">
            <Star className="w-3 h-3 mr-1" />
            Success Stories
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Trusted by{" "}
            <span className="text-transparent bg-gradient-to-r from-honey via-amber to-honey-dark bg-clip-text">
              Thousands
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            Real beekeepers, real results. See how BeeWise is transforming apiaries worldwide.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-6 bg-card/80 backdrop-blur-sm border hover-lift">
              <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
              <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground leading-tight">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-3xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <Card className="mx-4 bg-card/90 backdrop-blur-sm border-2 border-honey/20 overflow-hidden">
                    <CardContent className="p-8 md:p-12">
                      <div className="grid md:grid-cols-3 gap-8 items-center">
                        {/* Testimonial Content */}
                        <div className="md:col-span-2">
                          <Quote className="w-12 h-12 text-honey/40 mb-6" />
                          
                          <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed mb-8 italic">
                            "{testimonial.quote}"
                          </blockquote>

                          <div className="flex items-center gap-4 mb-6">
                            <img 
                              src={testimonial.image} 
                              alt={testimonial.name}
                              className="w-16 h-16 rounded-full border-4 border-honey/20"
                            />
                            <div>
                              <div className="font-semibold text-lg text-foreground">{testimonial.name}</div>
                              <div className="text-muted-foreground">{testimonial.role}</div>
                              <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                            </div>
                            <Badge className={`ml-auto ${getBadgeColor(testimonial.badge)}`}>
                              {testimonial.badge}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 fill-amber text-amber" />
                            ))}
                          </div>
                        </div>

                        {/* Metrics */}
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-foreground mb-4">Impact Metrics</h4>
                          
                          <div className="space-y-4">
                            <div className="p-4 bg-sage/10 rounded-2xl">
                              <div className="text-2xl font-bold text-sage">{testimonial.metrics.hives}</div>
                              <div className="text-sm text-muted-foreground">Hives Managed</div>
                            </div>
                            
                            <div className="p-4 bg-honey/10 rounded-2xl">
                              <div className="text-2xl font-bold text-honey-dark">{testimonial.metrics.healthImprovement}</div>
                              <div className="text-sm text-muted-foreground">Health Improvement</div>
                            </div>
                            
                            <div className="p-4 bg-amber/10 rounded-2xl">
                              <div className="text-2xl font-bold text-amber-dark">{testimonial.metrics.revenue}</div>
                              <div className="text-sm text-muted-foreground">Revenue Impact</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-card/90 backdrop-blur-sm border-honey/30 hover:bg-honey/10"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-card/90 backdrop-blur-sm border-honey/30 hover:bg-honey/10"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? "bg-honey scale-125" 
                    : "bg-muted hover:bg-honey/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;