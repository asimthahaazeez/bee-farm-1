import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import type { Database } from '@/integrations/supabase/types';

type InspectionLogInsert = Database['public']['Tables']['inspection_logs']['Insert'];

interface InspectionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: InspectionLogInsert) => Promise<any>;
  hiveId: string;
  hiveName: string;
}

export const InspectionForm = ({ open, onOpenChange, onSubmit, hiveId, hiveName }: InspectionFormProps) => {
  const [formData, setFormData] = useState<Partial<InspectionLogInsert>>({
    hive_id: hiveId,
    inspection_date: new Date().toISOString(),
    queen_status: '',
    brood_pattern: '',
    population_estimate: '',
    temperament: '',
    honey_stores: '',
    weather_conditions: '',
    temperature_f: undefined,
    notes: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    try {
      await onSubmit({
        ...formData,
        hive_id: hiveId,
      } as InspectionLogInsert);
      onOpenChange(false);
      // Reset form
      setFormData({
        hive_id: hiveId,
        inspection_date: new Date().toISOString(),
        queen_status: '',
        brood_pattern: '',
        population_estimate: '',
        temperament: '',
        honey_stores: '',
        weather_conditions: '',
        temperature_f: undefined,
        notes: '',
      });
    } catch (error) {
      console.error('Error submitting inspection log:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Log Inspection - {hiveName}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Inspection Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.inspection_date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.inspection_date ? (
                    format(new Date(formData.inspection_date), "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.inspection_date ? new Date(formData.inspection_date) : undefined}
                  onSelect={(date) => setFormData(prev => ({ 
                    ...prev, 
                    inspection_date: date ? date.toISOString() : new Date().toISOString()
                  }))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="queen_status">Queen Status</Label>
              <Select
                value={formData.queen_status || ''}
                onValueChange={(value) => setFormData(prev => ({ ...prev, queen_status: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select queen status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="present">Present & Active</SelectItem>
                  <SelectItem value="present_poor">Present but Poor</SelectItem>
                  <SelectItem value="missing">Missing</SelectItem>
                  <SelectItem value="new">New Queen</SelectItem>
                  <SelectItem value="queen_cells">Queen Cells Present</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="temperament">Temperament</Label>
              <Select
                value={formData.temperament || ''}
                onValueChange={(value) => setFormData(prev => ({ ...prev, temperament: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select temperament" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="calm">Very Calm</SelectItem>
                  <SelectItem value="docile">Docile</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="defensive">Defensive</SelectItem>
                  <SelectItem value="aggressive">Aggressive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="brood_pattern">Brood Pattern</Label>
              <Select
                value={formData.brood_pattern || ''}
                onValueChange={(value) => setFormData(prev => ({ ...prev, brood_pattern: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select brood pattern" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excellent - Solid Pattern</SelectItem>
                  <SelectItem value="good">Good - Mostly Solid</SelectItem>
                  <SelectItem value="fair">Fair - Some Gaps</SelectItem>
                  <SelectItem value="poor">Poor - Many Gaps</SelectItem>
                  <SelectItem value="spotty">Spotty Pattern</SelectItem>
                  <SelectItem value="none">No Brood</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="population_estimate">Population Estimate</Label>
              <Select
                value={formData.population_estimate || ''}
                onValueChange={(value) => setFormData(prev => ({ ...prev, population_estimate: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select population" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="very_strong">Very Strong (60K+)</SelectItem>
                  <SelectItem value="strong">Strong (40-60K)</SelectItem>
                  <SelectItem value="moderate">Moderate (20-40K)</SelectItem>
                  <SelectItem value="weak">Weak (10-20K)</SelectItem>
                  <SelectItem value="very_weak">Very Weak (&lt;10K)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="honey_stores">Honey Stores</Label>
              <Select
                value={formData.honey_stores || ''}
                onValueChange={(value) => setFormData(prev => ({ ...prev, honey_stores: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select honey stores" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="abundant">Abundant</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="adequate">Adequate</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="critical">Critical - Need Feeding</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="weather_conditions">Weather Conditions</Label>
              <Select
                value={formData.weather_conditions || ''}
                onValueChange={(value) => setFormData(prev => ({ ...prev, weather_conditions: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select weather" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sunny_calm">Sunny & Calm</SelectItem>
                  <SelectItem value="sunny_windy">Sunny & Windy</SelectItem>
                  <SelectItem value="partly_cloudy">Partly Cloudy</SelectItem>
                  <SelectItem value="overcast">Overcast</SelectItem>
                  <SelectItem value="light_rain">Light Rain</SelectItem>
                  <SelectItem value="cold">Cold</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="temperature_f">Temperature (°F)</Label>
            <Input
              id="temperature_f"
              type="number"
              value={formData.temperature_f || ''}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                temperature_f: e.target.value ? parseInt(e.target.value) : undefined 
              }))}
              placeholder="e.g., 75"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Inspection Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Detailed observations, concerns, actions taken..."
              rows={4}
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Log Inspection'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};