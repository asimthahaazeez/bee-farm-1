import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const DirectoryMap = () => {
  return (
    <div className="space-y-6">
      {/* Map Container */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-primary" />
            Beekeeper Locations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-[600px] bg-muted/30 rounded-lg flex items-center justify-center">
            <div className="text-center space-y-4">
              <MapPin className="h-16 w-16 text-muted-foreground mx-auto" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">Interactive Map Coming Soon</h3>
                <p className="text-muted-foreground max-w-md">
                  We're working on an interactive map to help you find beekeepers near you. 
                  In the meantime, use the grid view with location filters.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Map Legend/Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4 text-center">
            <div className="w-4 h-4 bg-primary rounded-full mx-auto mb-2"></div>
            <p className="text-sm font-medium">Verified Beekeepers</p>
            <p className="text-xs text-muted-foreground">127 locations</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardContent className="p-4 text-center">
            <div className="w-4 h-4 bg-sage rounded-full mx-auto mb-2"></div>
            <p className="text-sm font-medium">New Members</p>
            <p className="text-xs text-muted-foreground">43 locations</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardContent className="p-4 text-center">
            <div className="w-4 h-4 bg-amber rounded-full mx-auto mb-2"></div>
            <p className="text-sm font-medium">Commercial Operations</p>
            <p className="text-xs text-muted-foreground">89 locations</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DirectoryMap;