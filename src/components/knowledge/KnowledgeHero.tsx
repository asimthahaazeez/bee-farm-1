import { Search, BookOpen, Users, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const KnowledgeHero = () => {
  const stats = [
    { label: "Articles", value: "200+", icon: BookOpen },
    { label: "Contributors", value: "45", icon: Users },
    { label: "Expert Authors", value: "12", icon: Award }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-sage/20 via-honey-light/20 to-amber/20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Knowledge Base
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
            Learn from expert beekeepers, discover advanced techniques, and grow your apiary with confidence
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-card/80 backdrop-blur-sm border-border hover-lift">
                <CardContent className="p-6 text-center">
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeHero;