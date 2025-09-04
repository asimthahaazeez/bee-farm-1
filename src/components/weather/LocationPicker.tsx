import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Search, Crosshair } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface LocationPickerProps {
  onLocationChange?: (location: string, lat?: number, lon?: number) => void;
}

const LocationPicker = ({ onLocationChange }: LocationPickerProps) => {
  const [location, setLocation] = useState("Default Location");
  const [isEditing, setIsEditing] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { toast } = useToast();

  const handleLocationUpdate = () => {
    if (searchValue.trim()) {
      setLocation(searchValue);
      setIsEditing(false);
      onLocationChange?.(searchValue);
      toast({
        title: "Location Updated",
        description: `Weather data will now show for ${searchValue}`,
      });
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationString = `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
          setLocation(locationString);
          onLocationChange?.(locationString, latitude, longitude);
          toast({
            title: "Location Detected",
            description: "Using your current location for weather data",
          });
        },
        (error) => {
          toast({
            title: "Location Error",
            description: "Unable to detect your current location",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Not Supported",
        description: "Geolocation is not supported by this browser",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-gradient-to-r from-sky/10 to-honey-light/10 border-sky/20">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-sky/20">
              <MapPin className="w-5 h-5 text-sky-dark" />
            </div>
            <div>
              <p className="text-sm font-medium text-dark-brown">Current Location</p>
              {isEditing ? (
                <div className="flex items-center gap-2 mt-1">
                  <Input
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Enter city, state or coordinates"
                    className="h-8 text-sm"
                    onKeyDown={(e) => e.key === 'Enter' && handleLocationUpdate()}
                  />
                  <Button size="sm" onClick={handleLocationUpdate}>
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <p className="text-lg font-semibold text-sky-dark">{location}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCurrentLocation}
              className="border-sky/30 hover:bg-sky/10"
            >
              <Crosshair className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsEditing(!isEditing);
                setSearchValue(location);
              }}
              className="border-sky/30 hover:bg-sky/10"
            >
              {isEditing ? "Cancel" : "Change"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationPicker;