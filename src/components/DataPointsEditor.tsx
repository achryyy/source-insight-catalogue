
import { useState, useEffect } from 'react';
import { DataPoints } from '@/types/database';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface DataPointsEditorProps {
  dataPoints: DataPoints;
  onDataPointsChange: (dataPoints: Partial<DataPoints>) => void;
}

interface DataPointGroup {
  title: string;
  points: Array<{
    key: keyof DataPoints;
    label: string;
  }>;
}

const dataPointGroups: DataPointGroup[] = [
  {
    title: 'Company Information',
    points: [
      { key: 'company_name', label: 'Company Name' },
      { key: 'trade_name', label: 'Trade Name' },
      { key: 'address', label: 'Address' },
      { key: 'contact_details', label: 'Contact Details' },
      { key: 'legal_form', label: 'Legal Form' },
      { key: 'capital', label: 'Capital' },
      { key: 'number_of_employees', label: 'Number of Employees' },
    ]
  },
  {
    title: 'Unique Identifiers (UIN)',
    points: [
      { key: 'uin', label: 'General UIN' },
      { key: 'uin_commercial_register', label: 'Commercial Register UIN' },
      { key: 'uin_chamber', label: 'Chamber UIN' },
      { key: 'uin_license', label: 'License UIN' },
      { key: 'uin_vat_no', label: 'VAT Number' },
      { key: 'uin_others', label: 'Other UINs' },
    ]
  },
  {
    title: 'Registration & Status',
    points: [
      { key: 'company_registration_date', label: 'Registration Date' },
      { key: 'register_issue_date', label: 'Register Issue Date' },
      { key: 'register_expiry_date', label: 'Register Expiry Date' },
      { key: 'register_status', label: 'Register Status' },
    ]
  },
  {
    title: 'Business Activity',
    points: [
      { key: 'activity_code', label: 'Activity Code' },
      { key: 'activity_description', label: 'Activity Description' },
    ]
  },
  {
    title: 'Shareholders',
    points: [
      { key: 'shareholder_name', label: 'Shareholder Name' },
      { key: 'shareholder_nationality', label: 'Shareholder Nationality' },
      { key: 'shareholder_dob', label: 'Shareholder Date of Birth' },
      { key: 'shareholder_uin', label: 'Shareholder UIN' },
      { key: 'shareholder_address', label: 'Shareholder Address' },
      { key: 'shareholder_shares', label: 'Shareholder Shares' },
    ]
  },
  {
    title: 'Directors',
    points: [
      { key: 'director_name', label: 'Director Name' },
      { key: 'director_nationality', label: 'Director Nationality' },
      { key: 'director_dob', label: 'Director Date of Birth' },
      { key: 'director_position', label: 'Director Position' },
      { key: 'director_address', label: 'Director Address' },
    ]
  },
  {
    title: 'Financial Information',
    points: [
      { key: 'company_shares', label: 'Company Shares' },
      { key: 'full_financials', label: 'Full Financials' },
      { key: 'partial_financials', label: 'Partial Financials' },
    ]
  },
];

export const DataPointsEditor = ({ dataPoints, onDataPointsChange }: DataPointsEditorProps) => {
  const [selectedPoints, setSelectedPoints] = useState<Partial<DataPoints>>(dataPoints);

  useEffect(() => {
    setSelectedPoints(dataPoints);
  }, [dataPoints]);

  const handleDataPointChange = (key: keyof DataPoints, checked: boolean) => {
    const updatedPoints = { ...selectedPoints, [key]: checked };
    setSelectedPoints(updatedPoints);
    onDataPointsChange(updatedPoints);
  };

  const getSelectedCount = (group: DataPointGroup) => {
    return group.points.filter(point => selectedPoints[point.key]).length;
  };

  const getTotalSelectedCount = () => {
    return Object.values(selectedPoints).filter(Boolean).length;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Available Data Points</h3>
        <Badge variant="secondary">
          {getTotalSelectedCount()} selected
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dataPointGroups.map((group) => (
          <Card key={group.title}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                {group.title}
                <Badge variant="outline" className="text-xs">
                  {getSelectedCount(group)}/{group.points.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {group.points.map((point) => (
                <div key={point.key} className="flex items-center space-x-2">
                  <Checkbox
                    id={point.key}
                    checked={Boolean(selectedPoints[point.key])}
                    onCheckedChange={(checked) => 
                      handleDataPointChange(point.key, Boolean(checked))
                    }
                  />
                  <Label 
                    htmlFor={point.key} 
                    className="text-sm font-normal cursor-pointer"
                  >
                    {point.label}
                  </Label>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
