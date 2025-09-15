import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface EvaluationJob {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  dataset_info: any;
  model_info: any;
  results: any;
  report_html?: string;
  summary_text?: string;
  error_message?: string;
  created_at: string;
  updated_at: string;
  completed_at?: string;
}

export function useEvaluationJobs() {
  const [jobs, setJobs] = useState<EvaluationJob[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchJobs = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('evaluation_jobs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data as EvaluationJob[] || []);
    } catch (error: any) {
      console.error('Error fetching evaluation jobs:', error);
      toast({
        title: "Error",
        description: "Failed to load evaluation jobs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createJob = async (name: string, datasetInfo: any, modelInfo: any) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('evaluation_jobs')
        .insert({
          user_id: user.id,
          name,
          dataset_info: datasetInfo,
          model_info: modelInfo,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Evaluation job created successfully",
      });

      // Refresh jobs list
      await fetchJobs();
      return data;
    } catch (error: any) {
      console.error('Error creating evaluation job:', error);
      toast({
        title: "Error",
        description: "Failed to create evaluation job",
        variant: "destructive",
      });
      return null;
    }
  };

  const updateJobStatus = async (jobId: string, status: EvaluationJob['status'], results?: any, reportHtml?: string, summaryText?: string, errorMessage?: string) => {
    try {
      const updates: any = {
        status,
        updated_at: new Date().toISOString()
      };

      if (results) updates.results = results;
      if (reportHtml) updates.report_html = reportHtml;
      if (summaryText) updates.summary_text = summaryText;
      if (errorMessage) updates.error_message = errorMessage;
      if (status === 'completed') updates.completed_at = new Date().toISOString();

      const { error } = await supabase
        .from('evaluation_jobs')
        .update(updates)
        .eq('id', jobId);

      if (error) throw error;

      // Refresh jobs list
      await fetchJobs();
    } catch (error: any) {
      console.error('Error updating job status:', error);
      toast({
        title: "Error",
        description: "Failed to update job status",
        variant: "destructive",
      });
    }
  };

  const deleteJob = async (jobId: string) => {
    try {
      const { error } = await supabase
        .from('evaluation_jobs')
        .delete()
        .eq('id', jobId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Evaluation job deleted successfully",
      });

      // Refresh jobs list
      await fetchJobs();
    } catch (error: any) {
      console.error('Error deleting evaluation job:', error);
      toast({
        title: "Error",
        description: "Failed to delete evaluation job",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [user]);

  return {
    jobs,
    loading,
    createJob,
    updateJobStatus,
    deleteJob,
    refetch: fetchJobs
  };
}