import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, Filter, X, MapPin, Award } from "lucide-react";

const DirectoryFilters = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState([0]);
  const [verified, setVerified] = useState(false);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const specialtyOptions = [
    "Organic Honey",
    "Queen Rearing", 
    "Pollination Services",
    "Urban Beekeeping",
    "Swarm Removal",
    "Education",
    "Commercial Production",
    "Natural Beekeeping",
    "Treatment-Free",
    "Cold Climate",
    "Desert Beekeeping"
  ];

  const toggleSpecialty = (specialty: string) => {
    setSpecialties(prev => 
      prev.includes(specialty) 
        ? prev.filter(s => s !== specialty)
        : [...prev, specialty]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setLocation("");
    setExperience([0]);
    setVerified(false);
    setSpecialties([]);
  };

  const hasActiveFilters = searchTerm || location || experience[0] > 0 || verified || specialties.length > 0;

  return (
    <div className="space-y-4">
      {/* Main Search Bar */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search beekeepers by name, specialty, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative min-w-[200px]">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  !
                </Badge>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Filters */}
      {showFilters && (
        <Card className="bg-card border-border">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Advanced Filters</h3>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Experience Level */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">
                  Minimum Experience: {experience[0]} years
                </label>
                <Slider
                  value={experience}
                  onValueChange={setExperience}
                  max={30}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Verification Status */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Verification Status</label>
                <Button
                  variant={verified ? "default" : "outline"}
                  size="sm"
                  onClick={() => setVerified(!verified)}
                  className="w-full justify-start"
                >
                  <Award className="h-4 w-4 mr-2" />
                  Verified Only
                </Button>
              </div>

              {/* Sort By */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Sort By</label>
                <Select defaultValue="rating">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="experience">Most Experience</SelectItem>
                    <SelectItem value="reviews">Most Reviews</SelectItem>
                    <SelectItem value="distance">Nearest</SelectItem>
                    <SelectItem value="recent">Recently Joined</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Specialties */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">Specialties</label>
              <div className="flex flex-wrap gap-2">
                {specialtyOptions.map((specialty) => (
                  <Badge
                    key={specialty}
                    variant={specialties.includes(specialty) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/90"
                    onClick={() => toggleSpecialty(specialty)}
                  >
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="space-y-3 pt-4 border-t">
                <label className="text-sm font-medium text-foreground">Active Filters</label>
                <div className="flex flex-wrap gap-2">
                  {searchTerm && (
                    <Badge variant="secondary">
                      Search: {searchTerm}
                      <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setSearchTerm("")} />
                    </Badge>
                  )}
                  {location && (
                    <Badge variant="secondary">
                      Location: {location}
                      <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setLocation("")} />
                    </Badge>
                  )}
                  {experience[0] > 0 && (
                    <Badge variant="secondary">
                      Experience: {experience[0]}+ years
                      <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setExperience([0])} />
                    </Badge>
                  )}
                  {verified && (
                    <Badge variant="secondary">
                      Verified Only
                      <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setVerified(false)} />
                    </Badge>
                  )}
                  {specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary">
                      {specialty}
                      <X 
                        className="h-3 w-3 ml-1 cursor-pointer" 
                        onClick={() => toggleSpecialty(specialty)} 
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DirectoryFilters;