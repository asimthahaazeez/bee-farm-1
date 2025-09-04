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

type Hive = Database['public']['Tables']['hives']['Row'];
type HiveInsert = Database['public']['Tables']['hives']['Insert'];

interface HiveFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: HiveInsert) => Promise<void>;
  hive?: Hive;
  mode: 'create' | 'edit';
}

export const HiveForm = ({ open, onOpenChange, onSubmit, hive, mode }: HiveFormProps) => {
  const [formData, setFormData] = useState<Partial<HiveInsert>>({
    name: hive?.name || '',
    location: hive?.location || '',
    hive_type: hive?.hive_type || '',
    queen_color: hive?.queen_color || '',
    queen_marked: hive?.queen_marked || false,
    installation_date: hive?.installation_date || null,
    notes: hive?.notes || '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    setLoading(true);
    try {
      await onSubmit(formData as HiveInsert);
      onOpenChange(false);
      setFormData({
        name: '',
        location: '',
        hive_type: '',
        queen_color: '',
        queen_marked: false,
        installation_date: null,
        notes: '',
      });
    } catch (error) {
      console.error('Error submitting hive form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Add New Hive' : 'Edit Hive'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Hive Name *</Label>
              <Input
                id="name"
                value={formData.name || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Hive Alpha"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="e.g., North Garden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hive_type">Hive Type</Label>
              <Select
                value={formData.hive_type || ''}
                onValueChange={(value) => setFormData(prev => ({ ...prev, hive_type: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select hive type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="langstroth">Langstroth</SelectItem>
                  <SelectItem value="top_bar">Top Bar</SelectItem>
                  <SelectItem value="warre">Warré</SelectItem>
                  <SelectItem value="flow_hive">Flow Hive</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="queen_color">Queen Color</Label>
              <Select
                value={formData.queen_color || ''}
                onValueChange={(value) => setFormData(prev => ({ ...prev, queen_color: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select queen color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="white">White (2021, 2026)</SelectItem>
                  <SelectItem value="yellow">Yellow (2022, 2027)</SelectItem>
                  <SelectItem value="red">Red (2023, 2028)</SelectItem>
                  <SelectItem value="green">Green (2024, 2029)</SelectItem>
                  <SelectItem value="blue">Blue (2025, 2030)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Installation Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.installation_date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.installation_date ? (
                      format(new Date(formData.installation_date), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.installation_date ? new Date(formData.installation_date) : undefined}
                    onSelect={(date) => setFormData(prev => ({ 
                      ...prev, 
                      installation_date: date ? date.toISOString().split('T')[0] : null 
                    }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.queen_marked || false}
                  onChange={(e) => setFormData(prev => ({ ...prev, queen_marked: e.target.checked }))}
                  className="rounded border border-input"
                />
                Queen Marked
              </Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Any additional notes about this hive..."
              rows={3}
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
              {loading ? 'Saving...' : mode === 'create' ? 'Create Hive' : 'Update Hive'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};