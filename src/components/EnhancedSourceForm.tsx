import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataSource, DataPoints } from '@/types/database';
import { useCreateDataSource, useUpdateDataSource } from '@/hooks/useDataSources';
import { analyzeSourceContent, calculateRecommendationScore, getGradeFromScore } from '@/utils/gradingAlgorithm';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, Bot, CheckCircle, Clock, RefreshCw } from 'lucide-react';
import { DataPointsEditor } from './DataPointsEditor';

interface EnhancedSourceFormProps {
  source?: DataSource & { data_points?: DataPoints[] };
  onSuccess?: () => void;
  isSimpleMode?: boolean;
}

export const EnhancedSourceForm = ({ source, onSuccess, isSimpleMode = false }: EnhancedSourceFormProps) => {
  const [formData, setFormData] = useState<Partial<DataSource>>({
    country: source?.country || '',
    source_name: source?.source_name || '',
    source_hyperlink: source?.source_hyperlink || '',
    discovery_method: source?.discovery_method || 'Manual',
    source_type: source?.source_type || 'Governmental',
    expected_companies: source?.expected_companies || 0,
    adip_source: source?.adip_source ?? false,
    search_input_required: source?.search_input_required ?? false,
    captcha_requirements: source?.captcha_requirements ?? false,
    language_of_data: source?.language_of_data || '',
    update_frequency: source?.update_frequency || '',
    data_extraction_format: source?.data_extraction_format || 'HTML',
    compliance_status: source?.compliance_status || 'Under Review',
    status: source?.status || 'Active',
    recommendation_score: source?.recommendation_score || 0,
    source_grade: source?.source_grade || '',
    approved: source?.approved ?? false,
    needs_review: source?.needs_review ?? true,
    crawled: source?.crawled ?? false,
    auto_populated: source?.auto_populated ?? false,
  });

  const [dataPoints, setDataPoints] = useState<Partial<DataPoints>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isCheckingUpdate, setIsCheckingUpdate] = useState(false);
  
  const createSource = useCreateDataSource();
  const updateSource = useUpdateDataSource();

  useEffect(() => {
    if (source?.data_points?.[0]) {
      setDataPoints(source.data_points[0]);
    }
  }, [source]);

  const handleAnalyzeSource = async () => {
    if (!formData.source_hyperlink) {
      toast.error('Please enter a source URL first');
      return;
    }

    setIsAnalyzing(true);
    try {
      const analysisResult = await analyzeSourceContent(formData.source_hyperlink);
      const score = calculateRecommendationScore(analysisResult);
      const grade = getGradeFromScore(score);
      
      // Auto-populate form fields based on analysis
      setFormData(prev => ({
        ...prev,
        recommendation_score: score,
        source_grade: grade,
        language_of_data: analysisResult.language || prev.language_of_data,
        update_frequency: analysisResult.updateFrequency || prev.update_frequency,
        captcha_requirements: analysisResult.captchaDetected ?? prev.captcha_requirements,
        search_input_required: analysisResult.searchRequired ?? prev.search_input_required,
        auto_populated: true,
      }));

      // Auto-populate data points
      if (analysisResult.dataPointsDetected) {
        setDataPoints(prev => ({
          ...prev,
          ...analysisResult.dataPointsDetected
        }));
      }
      
      toast.success(`Analysis complete! Score: ${score}%, Grade: ${grade}`);
    } catch (error) {
      toast.error('Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCheckUpdate = async () => {
    if (!formData.source_hyperlink) {
      toast.error('Please enter a source URL first');
      return;
    }

    setIsCheckingUpdate(true);
    try {
      // Mock API call to check for updates
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockUpdateDate = new Date().toLocaleDateString();
      setFormData(prev => ({
        ...prev,
        crawled: false, // Mark as not crawled since source was updated
        last_crawled_date: new Date().toISOString(),
      }));
      
      toast.success(`Source checked. Last updated: ${mockUpdateDate}`);
    } catch (error) {
      toast.error('Update check failed. Please try again.');
    } finally {
      setIsCheckingUpdate(false);
    }
  };

  const handleApprove = async () => {
    if (!source) return;
    
    try {
      await updateSource.mutateAsync({
        id: source.id,
        updates: {
          approved: true,
          approved_by: 'Current User', // In real app, get from auth
          approved_at: new Date().toISOString(),
          needs_review: false,
        }
      });
      
      toast.success('Source approved successfully');
      onSuccess?.();
    } catch (error) {
      toast.error('Failed to approve source');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const sourceData = {
      ...formData,
      adip_source: formData.adip_source ?? false,
      search_input_required: formData.search_input_required ?? false,
      captcha_requirements: formData.captcha_requirements ?? false,
      compliance_status: formData.compliance_status || 'Under Review',
      status: formData.status || 'Active',
      recommendation_score: formData.recommendation_score || 0,
      approved: formData.approved ?? false,
      needs_review: isSimpleMode ? true : (formData.needs_review ?? true),
      crawled: formData.crawled ?? false,
      auto_populated: formData.auto_populated ?? false,
    } as Omit<DataSource, 'id' | 'created_at' | 'updated_at'>;
    
    if (source) {
      updateSource.mutate({ id: source.id, updates: sourceData }, {
        onSuccess: async () => {
          // Update data points
          if (Object.keys(dataPoints).length > 0) {
            await supabase
              .from('data_points')
              .update(dataPoints)
              .eq('source_id', source.id);
          }
          onSuccess?.();
        }
      });
    } else {
      createSource.mutate(sourceData, {
        onSuccess: async (newSource) => {
          // Create data points record
          const dataPointsToInsert = {
            source_id: newSource.id,
            ...dataPoints
          };
          await supabase.from('data_points').insert([dataPointsToInsert]);
          onSuccess?.();
        }
      });
    }
  };

  if (isSimpleMode) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Add New Source</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="source_name">Source Name</Label>
              <Input
                id="source_name"
                value={formData.source_name}
                onChange={(e) => setFormData(prev => ({ ...prev, source_name: e.target.value }))}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="source_hyperlink">Source URL</Label>
              <div className="flex gap-2">
                <Input
                  id="source_hyperlink"
                  type="url"
                  value={formData.source_hyperlink}
                  onChange={(e) => setFormData(prev => ({ ...prev, source_hyperlink: e.target.value }))}
                  placeholder="https://example.com"
                  required
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAnalyzeSource}
                  disabled={isAnalyzing || !formData.source_hyperlink}
                >
                  {isAnalyzing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={createSource.isPending}>
              {createSource.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Add Source for Review
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          {source ? 'Edit Source' : 'Create New Source'}
        </h2>
        
        {source && (
          <div className="flex items-center gap-2">
            {source.approved ? (
              <Badge variant="default" className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                Approved
              </Badge>
            ) : source.needs_review ? (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Needs Review
              </Badge>
            ) : null}
            
            {source.crawled && (
              <Badge variant="outline">Crawled</Badge>
            )}
            
            {!source.approved && (
              <Button onClick={handleApprove} variant="default" size="sm">
                <CheckCircle className="h-4 w-4 mr-1" />
                Approve
              </Button>
            )}
          </div>
        )}
      </div>

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          <TabsTrigger value="datapoints">Data Points</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit}>
          <TabsContent value="basic" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="source_name">Source Name</Label>
                <Input
                  id="source_name"
                  value={formData.source_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, source_name: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="source_hyperlink">Source URL</Label>
              <div className="flex gap-2">
                <Input
                  id="source_hyperlink"
                  type="url"
                  value={formData.source_hyperlink}
                  onChange={(e) => setFormData(prev => ({ ...prev, source_hyperlink: e.target.value }))}
                  placeholder="https://example.com"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAnalyzeSource}
                  disabled={isAnalyzing || !formData.source_hyperlink}
                >
                  {isAnalyzing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                  Analyze
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCheckUpdate}
                  disabled={isCheckingUpdate || !formData.source_hyperlink}
                >
                  {isCheckingUpdate ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                  Check Update
                </Button>
              </div>
            </div>

            {formData.recommendation_score !== undefined && formData.recommendation_score > 0 && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium">AI Analysis Results:</p>
                <p className="text-lg">Score: {formData.recommendation_score}% | Grade: {formData.source_grade}</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="datapoints">
            <DataPointsEditor 
              dataPoints={dataPoints as DataPoints}
              onDataPointsChange={setDataPoints}
            />
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="source_type">Source Type</Label>
                <Select value={formData.source_type} onValueChange={(value: any) => setFormData(prev => ({ ...prev, source_type: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Governmental">Governmental</SelectItem>
                    <SelectItem value="Ministry">Ministry</SelectItem>
                    <SelectItem value="Stock Exchange">Stock Exchange</SelectItem>
                    <SelectItem value="Chamber">Chamber</SelectItem>
                    <SelectItem value="Non-governmental">Non-governmental</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="compliance_status">Compliance Status</Label>
                <Select value={formData.compliance_status} onValueChange={(value: any) => setFormData(prev => ({ ...prev, compliance_status: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Compliant">Compliant</SelectItem>
                    <SelectItem value="Under Review">Under Review</SelectItem>
                    <SelectItem value="Non-Compliant">Non-Compliant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <div className="flex justify-end pt-6">
            <Button type="submit" disabled={createSource.isPending || updateSource.isPending}>
              {createSource.isPending || updateSource.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              {source ? 'Update Source' : 'Create Source'}
            </Button>
          </div>
        </form>
      </Tabs>
    </div>
  );
};
