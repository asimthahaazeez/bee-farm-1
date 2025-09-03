import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Eye, Heart, User } from "lucide-react";

const featuredArticles = [
  {
    id: "1",
    title: "Advanced Queen Rearing Techniques for Commercial Operations",
    excerpt: "Master the art of queen rearing with proven methods used by commercial beekeepers worldwide. Learn about timing, selection, and optimal conditions.",
    author: {
      name: "Dr. Sarah Mitchell",
      avatar: "/placeholder.svg"
    },
    category: "Advanced Techniques",
    readingTime: 12,
    views: 2840,
    likes: 187,
    publishedAt: "2 days ago",
    image: "/placeholder.svg",
    difficulty: "Advanced"
  },
  {
    id: "2", 
    title: "Organic Honey Production: From Hive to Market",
    excerpt: "Complete guide to producing certified organic honey, including hive management, harvesting techniques, and certification requirements.",
    author: {
      name: "Mike Johnson",
      avatar: "/placeholder.svg"
    },
    category: "Production",
    readingTime: 8,
    views: 1920,
    likes: 143,
    publishedAt: "5 days ago",
    image: "/placeholder.svg",
    difficulty: "Intermediate"
  },
  {
    id: "3",
    title: "Understanding Bee Behavior: Seasonal Patterns and Responses",
    excerpt: "Deep dive into bee behavior throughout the year, helping beekeepers make informed decisions about hive management and intervention timing.",
    author: {
      name: "Emma Davis",
      avatar: "/placeholder.svg"
    },
    category: "Bee Biology",
    readingTime: 6,
    views: 3150,
    likes: 298,
    publishedAt: "1 week ago", 
    image: "/placeholder.svg",
    difficulty: "Beginner"
  }
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner": return "bg-sage text-sage-foreground";
    case "Intermediate": return "bg-amber text-amber-foreground";
    case "Advanced": return "bg-primary text-primary-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

const FeaturedArticles = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredArticles.map((article) => (
        <Card key={article.id} className="hover-lift bg-card border-border cursor-pointer">
          <div className="relative">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <Badge className={`absolute top-3 right-3 ${getDifficultyColor(article.difficulty)}`}>
              {article.difficulty}
            </Badge>
          </div>
          
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between mb-2">
              <Badge variant="secondary" className="text-xs">
                {article.category}
              </Badge>
              <span className="text-xs text-muted-foreground">{article.publishedAt}</span>
            </div>
            <h3 className="font-semibold text-foreground line-clamp-2 leading-tight">
              {article.title}
            </h3>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
              {article.excerpt}
            </p>

            {/* Author */}
            <div className="flex items-center space-x-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={article.author.avatar} alt={article.author.name} />
                <AvatarFallback className="text-xs">{article.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">{article.author.name}</span>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{article.readingTime} min</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-3 w-3" />
                  <span>{article.views.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="h-3 w-3" />
                <span>{article.likes}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeaturedArticles;