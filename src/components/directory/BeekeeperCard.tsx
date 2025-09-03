import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Award, MessageCircle, Eye } from "lucide-react";
import { Link } from "react-router-dom";

interface BeekeeperCardProps {
  beekeeper: {
    id: string;
    name: string;
    avatar: string;
    location: string;
    specialties: string[];
    rating: number;
    reviewCount: number;
    verified: boolean;
    yearsExperience: number;
    hiveCount: number;
    products: string[];
    bio: string;
  };
}

const BeekeeperCard = ({ beekeeper }: BeekeeperCardProps) => {
  return (
    <Card className="hover-lift bg-card border-border h-full">
      <CardHeader className="pb-4">
        <div className="flex items-start space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={beekeeper.avatar} alt={beekeeper.name} />
            <AvatarFallback>{beekeeper.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold text-foreground truncate">{beekeeper.name}</h3>
              {beekeeper.verified && (
                <Award className="h-4 w-4 text-primary flex-shrink-0" />
              )}
            </div>
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
              <span className="truncate">{beekeeper.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-amber fill-current" />
                <span className="ml-1 text-sm font-medium">{beekeeper.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">({beekeeper.reviewCount})</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{beekeeper.bio}</p>

        {/* Experience & Hives */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Experience:</span>
            <p className="font-medium">{beekeeper.yearsExperience} years</p>
          </div>
          <div>
            <span className="text-muted-foreground">Hives:</span>
            <p className="font-medium">{beekeeper.hiveCount}</p>
          </div>
        </div>

        {/* Specialties */}
        <div>
          <p className="text-sm text-muted-foreground mb-2">Specialties:</p>
          <div className="flex flex-wrap gap-1">
            {beekeeper.specialties.slice(0, 2).map((specialty, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {specialty}
              </Badge>
            ))}
            {beekeeper.specialties.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{beekeeper.specialties.length - 2} more
              </Badge>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <Button asChild size="sm" className="flex-1">
            <Link to={`/beekeeper/${beekeeper.id}`}>
              <Eye className="h-4 w-4 mr-2" />
              View Profile
            </Link>
          </Button>
          <Button variant="outline" size="sm">
            <MessageCircle className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BeekeeperCard;