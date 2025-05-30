
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { DataSource } from '@/types/database';
import { useCreateDataSource, useUpdateDataSource } from '@/hooks/useDataSources';
import { analyzeSourceContent, calculateRecommendationScore, getGradeFromScore } from '@/utils/gradingAlgorithm';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, Bot } from 'lucide-react';

interface SourceFormProps {
  source?: DataSource;
  onSuccess?: () => void;
}

export const SourceForm = ({ source, onSuccess }: SourceFormProps) => {
  const [formData, setFormData] = useState<Partial<DataSource>>({
    country: source?.country || '',
    source_name: source?.source_name || '',
    source_hyperlink: source?.source_hyperlink || '',
    discovery_method: source?.discovery_method || 'Manual',
    source_type: source?.source_type || 'Governmental',
    expected_companies: source?.expected_companies || 0,
    adip_source: source?.adip_source || false,
    search_input_required: source?.search_input_required || false,
    captcha_requirements: source?.captcha_requirements || false,
    language_of_data: source?.language_of_data || '',
    update_frequency: source?.update_frequency || '',
    data_extraction_format: source?.data_extraction_format || 'HTML',
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const createSource = useCreateDataSource();
  const updateSource = useUpdateDataSource();

  const handleAnalyzeSource = async () => {
    if (!formData.source_hyperlink) {
      toast.error('Please enter a source URL first');
      return;
    }

    setIsAnalyzing(true);
    try {
      const analysisResult = await analyzeSourceContent(formData.source_hyperlink);
      const score = calculateRecommendationScore(analysisResult as any);
      const grade = getGradeFromScore(score);
      
      setFormData(prev => ({
        ...prev,
        recommendation_score: score,
        source_grade: grade
      }));
      
      toast.success(`Analysis complete! Score: ${score}%, Grade: ${grade}`);
    } catch (error) {
      toast.error('Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (source) {
      updateSource.mutate({ id: source.id, updates: formData }, {
        onSuccess: () => onSuccess?.()
      });
    } else {
      // Create data points record along with source
      const sourceData = { ...formData };
      
      createSource.mutate(sourceData, {
        onSuccess: async (newSource) => {
          // Create corresponding data_points record
          await supabase.from('data_points').insert([{ source_id: newSource.id }]);
          onSuccess?.();
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
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
        </div>
      </div>

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
          <Label htmlFor="discovery_method">Discovery Method</Label>
          <Select value={formData.discovery_method} onValueChange={(value: any) => setFormData(prev => ({ ...prev, discovery_method: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Manual">Manual</SelectItem>
              <SelectItem value="Automated">Automated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="expected_companies">Expected Companies</Label>
          <Input
            id="expected_companies"
            type="number"
            value={formData.expected_companies}
            onChange={(e) => setFormData(prev => ({ ...prev, expected_companies: parseInt(e.target.value) }))}
          />
        </div>
        <div>
          <Label htmlFor="language_of_data">Language of Data</Label>
          <Input
            id="language_of_data"
            value={formData.language_of_data}
            onChange={(e) => setFormData(prev => ({ ...prev, language_of_data: e.target.value }))}
            placeholder="English, Arabic, etc."
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="update_frequency">Update Frequency</Label>
          <Input
            id="update_frequency"
            value={formData.update_frequency}
            onChange={(e) => setFormData(prev => ({ ...prev, update_frequency: e.target.value }))}
            placeholder="Daily, Weekly, Monthly"
          />
        </div>
        <div>
          <Label htmlFor="data_extraction_format">Data Format</Label>
          <Select value={formData.data_extraction_format} onValueChange={(value: any) => setFormData(prev => ({ ...prev, data_extraction_format: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="HTML">HTML</SelectItem>
              <SelectItem value="PDF">PDF</SelectItem>
              <SelectItem value="API">API</SelectItem>
              <SelectItem value="Excel">Excel</SelectItem>
              <SelectItem value="CSV">CSV</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="adip_source"
            checked={formData.adip_source}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, adip_source: checked as boolean }))}
          />
          <Label htmlFor="adip_source">ADIP Source</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="search_input_required"
            checked={formData.search_input_required}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, search_input_required: checked as boolean }))}
          />
          <Label htmlFor="search_input_required">Search Input Required</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="captcha_requirements"
            checked={formData.captcha_requirements}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, captcha_requirements: checked as boolean }))}
          />
          <Label htmlFor="captcha_requirements">Captcha Required</Label>
        </div>
      </div>

      {formData.recommendation_score !== undefined && (
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm font-medium">AI Analysis Results:</p>
          <p className="text-lg">Score: {formData.recommendation_score}% | Grade: {formData.source_grade}</p>
        </div>
      )}

      <Button type="submit" className="w-full" disabled={createSource.isPending || updateSource.isPending}>
        {createSource.isPending || updateSource.isPending ? (
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
        ) : null}
        {source ? 'Update Source' : 'Create Source'}
      </Button>
    </form>
  );
};
