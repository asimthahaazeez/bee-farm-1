import { Heart, MessageCircle, Share2, MoreHorizontal, MapPin, Badge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge as UIBadge } from "@/components/ui/badge";
import { useState } from "react";

interface SocialPostProps {
  post: {
    id: string;
    author: {
      name: string;
      avatar: string;
      verified: boolean;
      location: string;
    };
    content: string;
    images: string[];
    timestamp: string;
    likes: number;
    comments: number;
    shares: number;
    tags: string[];
  };
}

const SocialPost = ({ post }: SocialPostProps) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <Card className="hover-lift bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold text-foreground">{post.author.name}</h4>
                {post.author.verified && (
                  <Badge className="h-4 w-4 text-primary" />
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>{post.author.location}</span>
                <span>•</span>
                <span>{post.timestamp}</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Post Content */}
        <p className="text-foreground leading-relaxed">{post.content}</p>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <UIBadge key={index} variant="secondary" className="text-xs">
                {tag}
              </UIBadge>
            ))}
          </div>
        )}

        {/* Images */}
        {post.images.length > 0 && (
          <div className="grid grid-cols-2 gap-2 rounded-lg overflow-hidden">
            {post.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Post image ${index + 1}`}
                className="w-full aspect-square object-cover hover:scale-105 transition-transform cursor-pointer"
              />
            ))}
          </div>
        )}

        {/* Engagement Actions */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`hover:bg-primary/10 ${liked ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <Heart className={`h-4 w-4 mr-2 ${liked ? 'fill-current' : ''}`} />
              {likesCount}
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:bg-primary/10">
              <MessageCircle className="h-4 w-4 mr-2" />
              {post.comments}
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:bg-primary/10">
              <Share2 className="h-4 w-4 mr-2" />
              {post.shares}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialPost;