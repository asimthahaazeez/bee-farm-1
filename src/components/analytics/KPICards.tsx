import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Eye } from "lucide-react";

const kpiData = [
  {
    title: "Total Revenue",
    value: "$12,847",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    description: "vs last month"
  },
  {
    title: "Average Order Value",
    value: "$34.60",
    change: "+3.2%", 
    trend: "up",
    icon: ShoppingCart,
    description: "per transaction"
  },
  {
    title: "Customer Acquisition Cost",
    value: "$18.40",
    change: "-8.1%",
    trend: "down",
    icon: Users,
    description: "cost per customer"
  },
  {
    title: "Conversion Rate",
    value: "3.8%",
    change: "+0.7%",
    trend: "up", 
    icon: Eye,
    description: "visitor to customer"
  }
];

const KPICards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiData.map((kpi, index) => (
        <Card key={index} className="bg-card border-border hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {kpi.title}
            </CardTitle>
            <kpi.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground mb-1">
              {kpi.value}
            </div>
            <div className="flex items-center space-x-1 text-sm">
              {kpi.trend === "up" ? (
                <TrendingUp className="h-3 w-3 text-sage" />
              ) : (
                <TrendingDown className="h-3 w-3 text-destructive" />
              )}
              <span className={kpi.trend === "up" ? "text-sage" : "text-destructive"}>
                {kpi.change}
              </span>
              <span className="text-muted-foreground">{kpi.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default KPICards;