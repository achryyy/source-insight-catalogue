
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { SourceDiscoveryLog } from '@/types/database';
import { toast } from 'sonner';

export const useSourceDiscoveryLogs = () => {
  return useQuery({
    queryKey: ['source-discovery-logs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('source_discovery_logs')
        .select('*')
        .order('analyzed_at', { ascending: false });
      
      if (error) throw error;
      return data as SourceDiscoveryLog[];
    },
  });
};

export const useCreateDiscoveryLog = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (logData: Partial<SourceDiscoveryLog>) => {
      const { data, error } = await supabase
        .from('source_discovery_logs')
        .insert([logData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['source-discovery-logs'] });
      toast.success('Discovery log created successfully');
    },
  });
};

export const useUpdateDiscoveryLog = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<SourceDiscoveryLog> }) => {
      const { data, error } = await supabase
        .from('source_discovery_logs')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['source-discovery-logs'] });
      toast.success('Discovery log updated successfully');
    },
  });
};
