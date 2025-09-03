import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Crown, 
  Flower, 
  Activity, 
  Thermometer, 
  Stethoscope, 
  ShoppingBag,
  Zap,
  Leaf
} from "lucide-react";

const categories = [
  {
    name: "Queen Rearing",
    description: "Master the art of raising quality queens",
    icon: Crown,
    articleCount: 24,
    color: "text-amber"
  },
  {
    name: "Pollination",
    description: "Understanding bee pollination services",
    icon: Flower,
    articleCount: 18,
    color: "text-sage"
  },
  {
    name: "Hive Management",
    description: "Best practices for healthy colonies",
    icon: Activity,
    articleCount: 32,
    color: "text-primary"
  },
  {
    name: "Seasonal Care",
    description: "Year-round beekeeping strategies",
    icon: Thermometer,
    articleCount: 28,
    color: "text-sky"
  },
  {
    name: "Disease Prevention",
    description: "Keep your colonies healthy and strong",
    icon: Stethoscope,
    articleCount: 21,
    color: "text-destructive"
  },
  {
    name: "Honey Production",
    description: "From harvest to market strategies",
    icon: ShoppingBag,
    articleCount: 35,
    color: "text-honey"
  },
  {
    name: "Equipment & Tools",
    description: "Essential beekeeping equipment guide",
    icon: Zap,
    articleCount: 19,
    color: "text-amber-dark"
  },
  {
    name: "Natural Beekeeping",
    description: "Treatment-free and organic methods",
    icon: Leaf,
    articleCount: 16,
    color: "text-sage-dark"
  }
];

const CategoryGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category, index) => (
        <Card key={index} className="hover-lift bg-card border-border cursor-pointer group">
          <CardContent className="p-6 text-center space-y-4">
            <div className={`inline-flex p-4 rounded-lg bg-muted/50 group-hover:bg-muted/70 transition-colors ${category.color}`}>
              <category.icon className="h-8 w-8" />
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-2">{category.name}</h3>
              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                {category.description}
              </p>
              <Badge variant="outline" className="text-xs">
                {category.articleCount} articles
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CategoryGrid;