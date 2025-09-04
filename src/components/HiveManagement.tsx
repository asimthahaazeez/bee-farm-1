import { useState } from "react";
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
import { useHives } from "@/hooks/useHives";
import { useInspectionLogs } from "@/hooks/useInspectionLogs";
import { HiveForm } from "@/components/hives/HiveForm";
import { InspectionForm } from "@/components/hives/InspectionForm";
import { HiveDetailsModal } from "@/components/hives/HiveDetailsModal";
import { useAuth } from "@/components/auth/AuthProvider";
import type { Database } from "@/integrations/supabase/types";

type Hive = Database['public']['Tables']['hives']['Row'];

const getHiveStatus = (hive: Hive, lastLog: any) => {
  if (!lastLog) return 'attention';
  
  const daysSinceInspection = Math.floor(
    (Date.now() - new Date(lastLog.inspection_date).getTime()) / (1000 * 60 * 60 * 24)
  );
  
  if (daysSinceInspection > 14) return 'attention';
  if (lastLog.queen_status === 'missing') return 'attention';
  if (lastLog.population_estimate === 'very_weak' || lastLog.honey_stores === 'critical') return 'attention';
  if (lastLog.brood_pattern === 'excellent' && lastLog.queen_status === 'present') return 'excellent';
  
  return 'good';
};

const getLastInspectionText = (lastLog: any) => {
  if (!lastLog) return 'Never inspected';
  
  const daysSince = Math.floor(
    (Date.now() - new Date(lastLog.inspection_date).getTime()) / (1000 * 60 * 60 * 24)
  );
  
  if (daysSince === 0) return 'Today';
  if (daysSince === 1) return 'Yesterday';
  if (daysSince < 7) return `${daysSince} days ago`;
  if (daysSince < 14) return '1 week ago';
  return `${Math.floor(daysSince / 7)} weeks ago`;
};

const HiveManagement = () => {
  const { user } = useAuth();
  const { hives, loading, createHive, updateHive, deleteHive } = useHives();
  const { logs, createLog } = useInspectionLogs();
  
  const [showHiveForm, setShowHiveForm] = useState(false);
  const [editingHive, setEditingHive] = useState<Hive | null>(null);
  const [selectedHive, setSelectedHive] = useState<Hive | null>(null);
  const [showInspectionForm, setShowInspectionForm] = useState(false);
  const [inspectionHiveId, setInspectionHiveId] = useState<string>('');

  // Get the most recent inspection log for each hive
  const getLastInspection = (hiveId: string) => {
    return logs.find(log => log.hive_id === hiveId);
  };

  const handleCreateHive = async (hiveData: any) => {
    if (!user?.id) return;
    await createHive({ ...hiveData, user_id: user.id });
  };

  const handleUpdateHive = async (hiveData: any) => {
    if (editingHive) {
      await updateHive(editingHive.id, hiveData);
      setEditingHive(null);
    }
  };

  const handleDeleteHive = async (hiveId: string) => {
    if (confirm('Are you sure you want to delete this hive? This action cannot be undone.')) {
      await deleteHive(hiveId);
      setSelectedHive(null);
    }
  };

  const startInspection = (hiveId: string) => {
    setInspectionHiveId(hiveId);
    setShowInspectionForm(true);
  };

  if (!user) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Your Hives
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Please sign in to manage your bee colonies
          </p>
        </div>
      </section>
    );
  }

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
          <Button 
            className="bg-honey text-dark-brown hover:bg-honey-dark hover:text-cream px-6 py-3 rounded-2xl font-semibold"
            onClick={() => setShowHiveForm(true)}
          >
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
              {hives.filter(h => {
                const lastLog = getLastInspection(h.id);
                return getHiveStatus(h, lastLog) === 'excellent';
              }).length}
            </div>
            <div className="text-sm text-muted-foreground">Excellent Status</div>
          </Card>
          <Card className="p-4 text-center hover-lift bg-amber/10">
            <div className="text-2xl font-bold text-amber-dark">
              {hives.filter(h => {
                const lastLog = getLastInspection(h.id);
                return getHiveStatus(h, lastLog) === 'attention';
              }).length}
            </div>
            <div className="text-sm text-muted-foreground">Need Attention</div>
          </Card>
          <Card className="p-4 text-center hover-lift bg-sky/10">
            <div className="text-2xl font-bold text-sky-dark">{hives.filter(h => h.is_active).length}</div>
            <div className="text-sm text-muted-foreground">Active Hives</div>
          </Card>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-honey mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your hives...</p>
          </div>
        ) : hives.length === 0 ? (
          <div className="text-center py-12">
            <Activity className="w-24 h-24 mx-auto mb-6 text-muted-foreground opacity-50" />
            <h3 className="text-2xl font-semibold text-foreground mb-2">No hives yet</h3>
            <p className="text-muted-foreground mb-6">Start by adding your first hive to begin tracking</p>
            <Button 
              className="bg-honey text-dark-brown hover:bg-honey-dark hover:text-cream"
              onClick={() => setShowHiveForm(true)}
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Your First Hive
            </Button>
          </div>
        ) : (
          /* Hive Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hives.map((hive) => {
              const lastLog = getLastInspection(hive.id);
              const status = getHiveStatus(hive, lastLog);
              const statusColors = {
                excellent: 'bg-sage text-sage-dark',
                good: 'bg-honey text-dark-brown',
                attention: 'bg-amber text-dark-brown',
                inactive: 'bg-warm-gray text-dark-brown'
              };

              return (
                <Card key={hive.id} className="overflow-hidden hover-lift transition-all duration-300 group">
                  {/* Hive Image Header */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={beehiveImage} 
                      alt={hive.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={statusColors[status as keyof typeof statusColors]}>
                        {status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="bg-white/80 backdrop-blur-sm"
                        onClick={() => setEditingHive(hive)}
                      >
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
                        <span>{hive.location || 'Location not set'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>Last checked {getLastInspectionText(lastLog)}</span>
                      </div>
                    </div>

                    {lastLog && (
                      <div className="grid grid-cols-2 gap-3">
                        {lastLog.queen_status && (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Crown className="w-4 h-4 text-amber" />
                              <span className="text-muted-foreground">Queen</span>
                            </div>
                            <Badge variant="secondary" className={
                              lastLog.queen_status === 'present' ? 'bg-sage/20 text-sage-dark' :
                              lastLog.queen_status === 'missing' ? 'bg-destructive/20 text-destructive' :
                              'bg-amber/20 text-amber-dark'
                            }>
                              {lastLog.queen_status.replace('_', ' ')}
                            </Badge>
                          </div>
                        )}
                        {lastLog.temperament && (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Activity className="w-4 h-4 text-sage" />
                              <span className="text-muted-foreground">Temperament</span>
                            </div>
                            <Badge variant="secondary" className={
                              lastLog.temperament === 'calm' || lastLog.temperament === 'docile' ? 'bg-sage/20 text-sage-dark' :
                              lastLog.temperament === 'aggressive' || lastLog.temperament === 'defensive' ? 'bg-destructive/20 text-destructive' :
                              'bg-honey/20 text-dark-brown'
                            }>
                              {lastLog.temperament}
                            </Badge>
                          </div>
                        )}
                      </div>
                    )}

                    {lastLog?.population_estimate && (
                      <div className="flex items-center justify-between p-3 bg-honey-light/20 rounded-xl">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-honey-dark" />
                          <span className="text-sm text-muted-foreground">Population</span>
                        </div>
                        <span className="font-semibold text-foreground">
                          {lastLog.population_estimate.replace('_', ' ')}
                        </span>
                      </div>
                    )}

                    {hive.notes && (
                      <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-xl">
                        <p>{hive.notes}</p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 border-honey text-honey-dark hover:bg-honey hover:text-dark-brown"
                        onClick={() => setSelectedHive(hive)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1 bg-sage text-white hover:bg-sage-dark"
                        onClick={() => startInspection(hive.id)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Log Inspection
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Forms and Modals */}
        <HiveForm
          open={showHiveForm}
          onOpenChange={setShowHiveForm}
          onSubmit={handleCreateHive}
          mode="create"
        />

        <HiveForm
          open={!!editingHive}
          onOpenChange={(open) => !open && setEditingHive(null)}
          onSubmit={handleUpdateHive}
          hive={editingHive}
          mode="edit"
        />

        <HiveDetailsModal
          open={!!selectedHive}
          onOpenChange={(open) => !open && setSelectedHive(null)}
          hive={selectedHive}
          onEdit={setEditingHive}
          onDelete={handleDeleteHive}
        />

        {inspectionHiveId && (
          <InspectionForm
            open={showInspectionForm}
            onOpenChange={setShowInspectionForm}
            onSubmit={async (data) => {
              if (!user?.id) return;
              await createLog({ ...data, user_id: user.id });
            }}
            hiveId={inspectionHiveId}
            hiveName={hives.find(h => h.id === inspectionHiveId)?.name || ''}
          />
        )}
      </div>
    </section>
  );
};

export default HiveManagement;