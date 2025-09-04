import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  MapPin, 
  Calendar, 
  Crown, 
  Activity, 
  Thermometer,
  Edit,
  Trash2,
  Plus,
  Eye,
  Clock
} from 'lucide-react';
import { format } from 'date-fns';
import { useInspectionLogs } from '@/hooks/useInspectionLogs';
import { InspectionForm } from './InspectionForm';
import type { Database } from '@/integrations/supabase/types';

type Hive = Database['public']['Tables']['hives']['Row'];
type InspectionLog = Database['public']['Tables']['inspection_logs']['Row'];

interface HiveDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hive: Hive | null;
  onEdit: (hive: Hive) => void;
  onDelete: (hiveId: string) => void;
}

export const HiveDetailsModal = ({ 
  open, 
  onOpenChange, 
  hive, 
  onEdit, 
  onDelete 
}: HiveDetailsModalProps) => {
  const [showInspectionForm, setShowInspectionForm] = useState(false);
  const { logs, createLog } = useInspectionLogs(hive?.id);

  if (!hive) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-sage text-sage-dark';
      case 'good': return 'bg-honey text-dark-brown';
      case 'attention': return 'bg-amber text-dark-brown';
      default: return 'bg-warm-gray text-dark-brown';
    }
  };

  const formatInspectionValue = (value: string | null) => {
    if (!value) return 'Not recorded';
    return value.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{hive.name}</span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(hive)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowInspectionForm(true)}
                  className="bg-sage text-white hover:bg-sage-dark"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Log Inspection
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(hive.id)}
                  className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Hive Information */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Hive Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Location: {hive.location || 'Not specified'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Type: {formatInspectionValue(hive.hive_type)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      Installed: {hive.installation_date 
                        ? format(new Date(hive.installation_date), 'PPP')
                        : 'Not specified'
                      }
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      Queen: {formatInspectionValue(hive.queen_color)}
                      {hive.queen_marked && <Badge variant="secondary" className="ml-2 text-xs">Marked</Badge>}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Active: {hive.is_active ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>
              {hive.notes && (
                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">{hive.notes}</p>
                </div>
              )}
            </Card>

            {/* Recent Inspections */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Recent Inspections</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowInspectionForm(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Inspection
                </Button>
              </div>
              
              {logs.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No inspections logged yet</p>
                  <p className="text-sm">Start by logging your first hive inspection</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {logs.map((log) => (
                    <Card key={log.id} className="p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">
                            {format(new Date(log.inspection_date), 'PPP')}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          {log.queen_status && (
                            <Badge variant="secondary" className="text-xs">
                              Queen: {formatInspectionValue(log.queen_status)}
                            </Badge>
                          )}
                          {log.temperament && (
                            <Badge variant="secondary" className="text-xs">
                              {formatInspectionValue(log.temperament)}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-muted-foreground mb-3">
                        <div>Brood: {formatInspectionValue(log.brood_pattern)}</div>
                        <div>Population: {formatInspectionValue(log.population_estimate)}</div>
                        <div>Honey: {formatInspectionValue(log.honey_stores)}</div>
                        <div>Weather: {formatInspectionValue(log.weather_conditions)}</div>
                      </div>
                      
                      {log.notes && (
                        <div className="text-sm bg-muted/30 p-2 rounded">
                          {log.notes}
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      <InspectionForm
        open={showInspectionForm}
        onOpenChange={setShowInspectionForm}
        onSubmit={async (data) => {
          await createLog(data);
        }}
        hiveId={hive.id}
        hiveName={hive.name}
      />
    </>
  );
};