import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MapPin, 
  Star, 
  Award, 
  Calendar, 
  Users, 
  MessageCircle, 
  Heart,
  Share2,
  ShoppingBag
} from "lucide-react";

interface BeekeeperProfileProps {
  profileId?: string;
}

// Mock data - in real app, this would be fetched based on profileId
const mockProfile = {
  id: "1",
  name: "Sarah Johnson",
  avatar: "/placeholder.svg",
  coverImage: "/placeholder.svg", 
  location: "Vermont, USA",
  verified: true,
  rating: 4.8,
  reviewCount: 24,
  followerCount: 347,
  followingCount: 89,
  joinDate: "March 2021",
  bio: "Third-generation beekeeper passionate about sustainable practices and organic honey production. I maintain 45 hives across Vermont's beautiful countryside and specialize in wildflower and clover honey varieties.",
  specialties: ["Organic Honey", "Queen Rearing", "Pollination Services", "Education"],
  yearsExperience: 12,
  hiveCount: 45,
  totalSales: 1247,
  responseRate: 98,
  achievements: [
    { name: "Top Seller 2023", icon: Award },
    { name: "Verified Beekeeper", icon: Award },
    { name: "Community Contributor", icon: Users }
  ],
  socialLinks: {
    website: "https://sarahshoney.com",
    instagram: "@sarahshoney",
    facebook: "Sarah's Honey Farm"
  }
};

const BeekeeperProfile = ({ profileId }: BeekeeperProfileProps) => {
  const profile = mockProfile; // In real app, fetch by profileId

  return (
    <div className="space-y-6">
      {/* Cover Image */}
      <div className="relative h-64 bg-gradient-to-br from-honey-light/50 to-amber/50 rounded-lg overflow-hidden">
        <img 
          src={profile.coverImage} 
          alt="Cover" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Profile Header */}
      <div className="relative -mt-20 px-6">
        <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6">
          <Avatar className="h-32 w-32 border-4 border-background">
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback className="text-2xl">{profile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <h1 className="text-3xl font-bold text-foreground">{profile.name}</h1>
                  {profile.verified && (
                    <Award className="h-6 w-6 text-primary" />
                  )}
                </div>
                <div className="flex items-center space-x-4 text-muted-foreground mb-3">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{profile.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {profile.joinDate}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-amber fill-current" />
                    <span className="font-medium">{profile.rating}</span>
                    <span className="text-muted-foreground">({profile.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-4 text-muted-foreground">
                    <span><strong>{profile.followerCount}</strong> followers</span>
                    <span><strong>{profile.followingCount}</strong> following</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2 mt-4 md:mt-0">
                <Button variant="outline" size="sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button variant="outline" size="sm">
                  <Heart className="h-4 w-4 mr-2" />
                  Follow
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* About */}
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">About</h2>
              <p className="text-muted-foreground leading-relaxed">{profile.bio}</p>
              
              {/* Specialties */}
              <div className="mt-6">
                <h3 className="font-medium text-foreground mb-3">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary">{specialty}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Achievements</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {profile.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                    <achievement.icon className="h-8 w-8 text-primary" />
                    <span className="font-medium text-foreground">{achievement.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Experience</span>
                  <span className="font-medium text-foreground">{profile.yearsExperience} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Hives</span>
                  <span className="font-medium text-foreground">{profile.hiveCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Sales</span>
                  <span className="font-medium text-foreground">{profile.totalSales.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Response Rate</span>
                  <span className="font-medium text-sage">{profile.responseRate}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  View Products
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Heart className="h-4 w-4 mr-2" />
                  Add to Favorites
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BeekeeperProfile;