
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { DataSource, DataPoints, AdvancedFilters } from '@/types/database';
import { toast } from 'sonner';

export const useDataSources = (filters?: AdvancedFilters) => {
  return useQuery({
    queryKey: ['data-sources', filters],
    queryFn: async () => {
      let query = supabase
        .from('data_sources')
        .select('*');

      // Apply filters
      if (filters?.approved !== undefined) {
        query = query.eq('approved', filters.approved);
      }
      if (filters?.adip_source !== undefined) {
        query = query.eq('adip_source', filters.adip_source);
      }
      if (filters?.needs_review !== undefined) {
        query = query.eq('needs_review', filters.needs_review);
      }
      if (filters?.crawled !== undefined) {
        query = query.eq('crawled', filters.crawled);
      }
      if (filters?.status?.length) {
        query = query.in('status', filters.status);
      }
      if (filters?.source_type?.length) {
        query = query.in('source_type', filters.source_type);
      }
      if (filters?.compliance_status?.length) {
        query = query.in('compliance_status', filters.compliance_status);
      }

      query = query.order('created_at', { ascending: false });
      
      const { data, error } = await query;
      
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
    mutationFn: async (sourceData: Omit<DataSource, 'id' | 'created_at' | 'updated_at'>) => {
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
      // First delete related data_points
      await supabase
        .from('data_points')
        .delete()
        .eq('source_id', id);
      
      // Then delete the source
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

export const useApproveDataSource = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, approver }: { id: string; approver: string }) => {
      const { data, error } = await supabase
        .from('data_sources')
        .update({
          approved: true,
          approved_by: approver,
          approved_at: new Date().toISOString(),
          needs_review: false,
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['data-sources'] });
      queryClient.invalidateQueries({ queryKey: ['data-sources-with-points'] });
      toast.success('Data source approved successfully');
    },
    onError: (error) => {
      toast.error('Failed to approve data source: ' + error.message);
    },
  });
};
