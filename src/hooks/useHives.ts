import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Database } from '@/integrations/supabase/types';

type Hive = Database['public']['Tables']['hives']['Row'];
type HiveInsert = Database['public']['Tables']['hives']['Insert'];
type HiveUpdate = Database['public']['Tables']['hives']['Update'];

export const useHives = () => {
  const [hives, setHives] = useState<Hive[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchHives = async () => {
    try {
      const { data, error } = await supabase
        .from('hives')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setHives(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching hives",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createHive = async (hiveData: HiveInsert) => {
    try {
      const { data, error } = await supabase
        .from('hives')
        .insert(hiveData)
        .select()
        .single();

      if (error) throw error;

      setHives(prev => [data, ...prev]);
      toast({
        title: "Hive created successfully",
        description: `${hiveData.name} has been added to your apiary.`,
      });
      
      return data;
    } catch (error: any) {
      toast({
        title: "Error creating hive",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateHive = async (id: string, updates: HiveUpdate) => {
    try {
      const { data, error } = await supabase
        .from('hives')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setHives(prev => prev.map(hive => hive.id === id ? data : hive));
      toast({
        title: "Hive updated successfully",
        description: "Your hive information has been updated.",
      });
      
      return data;
    } catch (error: any) {
      toast({
        title: "Error updating hive",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteHive = async (id: string) => {
    try {
      const { error } = await supabase
        .from('hives')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setHives(prev => prev.filter(hive => hive.id !== id));
      toast({
        title: "Hive deleted successfully",
        description: "The hive has been removed from your apiary.",
      });
    } catch (error: any) {
      toast({
        title: "Error deleting hive",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchHives();
  }, []);

  return {
    hives,
    loading,
    createHive,
    updateHive,
    deleteHive,
    refetch: fetchHives,
  };
};