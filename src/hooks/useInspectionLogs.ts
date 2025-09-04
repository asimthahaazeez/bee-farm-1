import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Database } from '@/integrations/supabase/types';

type InspectionLog = Database['public']['Tables']['inspection_logs']['Row'];
type InspectionLogInsert = Database['public']['Tables']['inspection_logs']['Insert'];

export const useInspectionLogs = (hiveId?: string) => {
  const [logs, setLogs] = useState<InspectionLog[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchLogs = async () => {
    try {
      let query = supabase
        .from('inspection_logs')
        .select('*')
        .order('inspection_date', { ascending: false });

      if (hiveId) {
        query = query.eq('hive_id', hiveId);
      }

      const { data, error } = await query;

      if (error) throw error;
      setLogs(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching inspection logs",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createLog = async (logData: InspectionLogInsert) => {
    try {
      const { data, error } = await supabase
        .from('inspection_logs')
        .insert(logData)
        .select()
        .single();

      if (error) throw error;

      setLogs(prev => [data, ...prev]);
      toast({
        title: "Inspection logged successfully",
        description: "Your hive inspection has been recorded.",
      });
      
      return data;
    } catch (error: any) {
      toast({
        title: "Error logging inspection",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [hiveId]);

  return {
    logs,
    loading,
    createLog,
    refetch: fetchLogs,
  };
};