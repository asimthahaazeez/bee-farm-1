import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

const trendingTopics = [
  { tag: "#SwarmSeason", posts: 127 },
  { tag: "#HoneyHarvest", posts: 89 },
  { tag: "#BeginnerTips", posts: 76 },
  { tag: "#QueenRearing", posts: 54 },
  { tag: "#WinterPrep", posts: 43 },
  { tag: "#OrganicHoney", posts: 38 },
  { tag: "#PollinatorGarden", posts: 32 },
  { tag: "#HiveInspection", posts: 28 }
];

const TrendingTopics = () => {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg">
          <TrendingUp className="h-5 w-5 mr-2 text-primary" />
          Trending Topics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {trendingTopics.map((topic, index) => (
          <div key={index} className="flex items-center justify-between hover:bg-muted/50 p-2 rounded-md cursor-pointer transition-colors">
            <div>
              <p className="font-medium text-foreground">{topic.tag}</p>
              <p className="text-sm text-muted-foreground">{topic.posts} posts</p>
            </div>
            <Badge variant="secondary" className="text-xs">
              #{index + 1}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TrendingTopics;