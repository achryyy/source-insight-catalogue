
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { DataSource, DataPoints } from '@/types/database';
import { toast } from 'sonner';

export const useDataSources = () => {
  return useQuery({
    queryKey: ['data-sources'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('data_sources')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as DataSource[];
    },
  });
};

export const useDataSourcesWithPoints = () => {
  return useQuery({
    queryKey: ['data-sources-with-points'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('data_sources')
        .select(`
          *,
          data_points (*)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useCreateDataSource = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (sourceData: Partial<DataSource>) => {
      const { data, error } = await supabase
        .from('data_sources')
        .insert([sourceData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['data-sources'] });
      queryClient.invalidateQueries({ queryKey: ['data-sources-with-points'] });
      toast.success('Data source created successfully');
    },
    onError: (error) => {
      toast.error('Failed to create data source: ' + error.message);
    },
  });
};

export const useUpdateDataSource = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<DataSource> }) => {
      const { data, error } = await supabase
        .from('data_sources')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['data-sources'] });
      queryClient.invalidateQueries({ queryKey: ['data-sources-with-points'] });
      toast.success('Data source updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update data source: ' + error.message);
    },
  });
};

export const useDeleteDataSource = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('data_sources')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['data-sources'] });
      queryClient.invalidateQueries({ queryKey: ['data-sources-with-points'] });
      toast.success('Data source deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete data source: ' + error.message);
    },
  });
};
