import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Image, MapPin, Hash, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CreatePostCard = () => {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [location, setLocation] = useState("");

  const handlePost = () => {
    if (!content.trim()) return;
    
    // Handle post submission
    console.log({ content, tags, location });
    
    // Reset form
    setContent("");
    setTags([]);
    setLocation("");
  };

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-6">
        <div className="flex space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder.svg" alt="Your avatar" />
            <AvatarFallback>YU</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-4">
            <Textarea
              placeholder="Share your beekeeping journey, tips, or ask questions..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[100px] resize-none border-none shadow-none focus:ring-0 text-base placeholder:text-muted-foreground"
            />

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => removeTag(tag)}
                  >
                    {tag} ×
                  </Badge>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                  <Image className="h-4 w-4 mr-2" />
                  Photo
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                  <MapPin className="h-4 w-4 mr-2" />
                  Location
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-muted-foreground hover:text-primary"
                  onClick={() => {
                    const tag = prompt("Enter a hashtag (without #):");
                    if (tag) addTag(`#${tag}`);
                  }}
                >
                  <Hash className="h-4 w-4 mr-2" />
                  Tag
                </Button>
              </div>
              
              <Button 
                onClick={handlePost}
                disabled={!content.trim()}
                className="bg-primary hover:bg-primary/90"
              >
                <Send className="h-4 w-4 mr-2" />
                Post
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreatePostCard;