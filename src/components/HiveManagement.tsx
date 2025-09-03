import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  MapPin, 
  Calendar, 
  Activity,
  Crown,
  Thermometer,
  TrendingUp,
  Eye,
  MoreVertical
} from "lucide-react";
import beehiveImage from "@/assets/beehive-nature.jpg";

interface Hive {
  id: string;
  name: string;
  location: string;
  lastInspection: string;
  status: 'excellent' | 'good' | 'attention' | 'inactive';
  queenStatus: 'present' | 'missing' | 'new';
  temperament: 'calm' | 'active' | 'aggressive';
  population: number;
  notes: string;
}

const hives: Hive[] = [
  {
    id: '1',
    name: 'Hive Alpha',
    location: 'North Garden',
    lastInspection: '2 days ago',
    status: 'excellent',
    queenStatus: 'present',
    temperament: 'calm',
    population: 45000,
    notes: 'Strong colony, good brood pattern'
  },
  {
    id: '2',
    name: 'Hive Beta',
    location: 'South Field',
    lastInspection: '5 days ago',
    status: 'good',
    queenStatus: 'present',
    temperament: 'active',
    population: 35000,
    notes: 'Building up nicely for spring'
  },
  {
    id: '3',
    name: 'Hive Gamma',
    location: 'East Meadow',
    lastInspection: '1 week ago',
    status: 'attention',
    queenStatus: 'missing',
    temperament: 'aggressive',
    population: 25000,
    notes: 'Need to check for queen cells'
  }
];

const statusColors = {
  excellent: 'bg-sage text-sage-dark',
  good: 'bg-honey text-dark-brown',
  attention: 'bg-amber text-dark-brown',
  inactive: 'bg-warm-gray text-dark-brown'
};

const queenStatusColors = {
  present: 'bg-sage/20 text-sage-dark',
  missing: 'bg-destructive/20 text-destructive',
  new: 'bg-amber/20 text-amber-dark'
};

const temperamentColors = {
  calm: 'bg-sage/20 text-sage-dark',
  active: 'bg-honey/20 text-dark-brown',
  aggressive: 'bg-destructive/20 text-destructive'
};

const HiveManagement = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Your Hives
            </h2>
            <p className="text-lg text-muted-foreground">
              Monitor and manage your bee colonies with ease
            </p>
          </div>
          <Button className="bg-honey text-dark-brown hover:bg-honey-dark hover:text-cream px-6 py-3 rounded-2xl font-semibold">
            <Plus className="w-5 h-5 mr-2" />
            Add New Hive
          </Button>
        </div>

        {/* Hive Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 text-center hover-lift bg-sage/10">
            <div className="text-2xl font-bold text-sage-dark">{hives.length}</div>
            <div className="text-sm text-muted-foreground">Total Hives</div>
          </Card>
          <Card className="p-4 text-center hover-lift bg-honey/10">
            <div className="text-2xl font-bold text-dark-brown">
              {hives.filter(h => h.status === 'excellent').length}
            </div>
            <div className="text-sm text-muted-foreground">Excellent Status</div>
          </Card>
          <Card className="p-4 text-center hover-lift bg-amber/10">
            <div className="text-2xl font-bold text-amber-dark">
              {hives.filter(h => h.status === 'attention').length}
            </div>
            <div className="text-sm text-muted-foreground">Need Attention</div>
          </Card>
          <Card className="p-4 text-center hover-lift bg-sky/10">
            <div className="text-2xl font-bold text-sky-dark">105K</div>
            <div className="text-sm text-muted-foreground">Total Population</div>
          </Card>
        </div>

        {/* Hive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hives.map((hive) => (
            <Card key={hive.id} className="overflow-hidden hover-lift transition-all duration-300 group">
              {/* Hive Image Header */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={beehiveImage} 
                  alt={hive.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={statusColors[hive.status]}>
                    {hive.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Button variant="ghost" size="sm" className="bg-white/80 backdrop-blur-sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Hive Details */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {hive.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <MapPin className="w-4 h-4" />
                    <span>{hive.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Last checked {hive.lastInspection}</span>
                  </div>
                </div>

                {/* Status Indicators */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Crown className="w-4 h-4 text-amber" />
                      <span className="text-muted-foreground">Queen</span>
                    </div>
                    <Badge variant="secondary" className={queenStatusColors[hive.queenStatus]}>
                      {hive.queenStatus}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Activity className="w-4 h-4 text-sage" />
                      <span className="text-muted-foreground">Temperament</span>
                    </div>
                    <Badge variant="secondary" className={temperamentColors[hive.temperament]}>
                      {hive.temperament}
                    </Badge>
                  </div>
                </div>

                {/* Population */}
                <div className="flex items-center justify-between p-3 bg-honey-light/20 rounded-xl">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-honey-dark" />
                    <span className="text-sm text-muted-foreground">Population</span>
                  </div>
                  <span className="font-semibold text-foreground">
                    {(hive.population / 1000).toFixed(0)}K bees
                  </span>
                </div>

                {/* Notes */}
                <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-xl">
                  <p>{hive.notes}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 border-honey text-honey-dark hover:bg-honey hover:text-dark-brown"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1 bg-sage text-white hover:bg-sage-dark"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Log Inspection
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HiveManagement;