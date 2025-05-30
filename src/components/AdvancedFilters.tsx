
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Filter, X } from 'lucide-react';
import { AdvancedFilters } from '@/types/database';

interface AdvancedFiltersProps {
  filters: AdvancedFilters;
  onFiltersChange: (filters: AdvancedFilters) => void;
  onClearFilters: () => void;
}

export const AdvancedFiltersComponent = ({ filters, onFiltersChange, onClearFilters }: AdvancedFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const activeFiltersCount = Object.values(filters).filter(value => 
    value !== undefined && value !== null && 
    (Array.isArray(value) ? value.length > 0 : true)
  ).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Advanced Filters
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
        
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      {isOpen && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filter Sources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Status Filters */}
            <div className="space-y-3">
              <Label className="font-medium">Status</Label>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="approved"
                    checked={filters.approved === true}
                    onCheckedChange={(checked) => 
                      onFiltersChange({ ...filters, approved: checked ? true : undefined })
                    }
                  />
                  <Label htmlFor="approved">Approved</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="needs_review"
                    checked={filters.needs_review === true}
                    onCheckedChange={(checked) => 
                      onFiltersChange({ ...filters, needs_review: checked ? true : undefined })
                    }
                  />
                  <Label htmlFor="needs_review">Needs Review</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="crawled"
                    checked={filters.crawled === true}
                    onCheckedChange={(checked) => 
                      onFiltersChange({ ...filters, crawled: checked ? true : undefined })
                    }
                  />
                  <Label htmlFor="crawled">Crawled</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="adip_source"
                    checked={filters.adip_source === true}
                    onCheckedChange={(checked) => 
                      onFiltersChange({ ...filters, adip_source: checked ? true : undefined })
                    }
                  />
                  <Label htmlFor="adip_source">ADIP Source</Label>
                </div>
              </div>
            </div>

            {/* Source Status */}
            <div className="space-y-3">
              <Label className="font-medium">Source Status</Label>
              <Select
                value={filters.status?.[0] || ''}
                onValueChange={(value) => 
                  onFiltersChange({ ...filters, status: value ? [value] : undefined })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Under Maintenance">Under Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Source Type */}
            <div className="space-y-3">
              <Label className="font-medium">Source Type</Label>
              <Select
                value={filters.source_type?.[0] || ''}
                onValueChange={(value) => 
                  onFiltersChange({ ...filters, source_type: value ? [value] : undefined })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select source type" />
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

            {/* Compliance Status */}
            <div className="space-y-3">
              <Label className="font-medium">Compliance Status</Label>
              <Select
                value={filters.compliance_status?.[0] || ''}
                onValueChange={(value) => 
                  onFiltersChange({ ...filters, compliance_status: value ? [value] : undefined })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select compliance status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Compliant">Compliant</SelectItem>
                  <SelectItem value="Under Review">Under Review</SelectItem>
                  <SelectItem value="Non-Compliant">Non-Compliant</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
