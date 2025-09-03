import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, Heart, Share2 } from "lucide-react";

const stats = [
  {
    title: "Active Beekeepers",
    value: "2,847",
    icon: Users,
    color: "text-primary"
  },
  {
    title: "Posts Today",
    value: "156",
    icon: MessageSquare,
    color: "text-sage"
  },
  {
    title: "Likes Given",
    value: "8.2k",
    icon: Heart,
    color: "text-amber"
  },
  {
    title: "Knowledge Shared",
    value: "423",
    icon: Share2,
    color: "text-honey"
  }
];

const CommunityStats = () => {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Community Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/30 transition-colors">
            <div className={`p-2 rounded-lg bg-muted/50 ${stat.color}`}>
              <stat.icon className="h-4 w-4" />
            </div>
            <div>
              <p className="font-semibold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CommunityStats;