import React from 'react';
import { FormattedMessage } from 'react-intl';
import { 
  Calculator, FileText, Users, Tool, 
  Package, Truck, Building2, DollarSign,
  Upload
} from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { CostBreakdownCard } from './CostBreakdownCard';

interface CostBreakdownProps {
  projectId: string;
}

export const CostBreakdown: React.FC<CostBreakdownProps> = ({ projectId }) => {
  const mockData = {
    parameters: {
      projectDuration: '18 months',
      totalArea: '25,000 m²',
      costPerSqm: formatCurrency(100),
    },
    summary: {
      directCosts: 12000000,
      indirectCosts: 2000000,
      contingency: 1000000,
    },
    planned: {
      materials: 6000000,
      labor: 4000000,
      equipment: 2000000,
    },
    internal: {
      technicalOffice: 500000,
      qualityControl: 600000,
      safety: 400000,
    },
    subcontract: {
      mepWorks: 2000000,
      finishingWorks: 1000000,
      specializedWorks: 500000,
    },
    materials: {
      concrete: 2500000,
      steel: 2000000,
      otherMaterials: 1500000,
    },
    manpower: {
      directLabor: 3000000,
      supervision: 700000,
      supportStaff: 300000,
    },
    equipment: {
      heavyEquipment: 1200000,
      tools: 500000,
      maintenance: 300000,
    },
    indirect: {
      siteFacilities: 800000,
      administration: 700000,
      insurance: 500000,
    },
  };

  const costCategories = [
    {
      id: 'parameters',
      title: 'المعايير',
      icon: Calculator,
      amount: 2500000,
      items: Object.entries(mockData.parameters).map(([key, value]) => ({
        name: key,
        value: value.toString()
      }))
    },
    {
      id: 'summary',
      title: 'الملخص',
      icon: DollarSign,
      amount: 15000000,
      items: Object.entries(mockData.summary).map(([key, value]) => ({
        name: key,
        value: value
      }))
    },
    {
      id: 'planned',
      title: 'التكلفة المخططة',
      icon: FileText,
      amount: 12000000,
      items: Object.entries(mockData.planned).map(([key, value]) => ({
        name: key,
        value: value
      }))
    },
    {
      id: 'internal',
      title: 'الخدمات الداخلية',
      icon: Building2,
      amount: 1500000,
      items: Object.entries(mockData.internal).map(([key, value]) => ({
        name: key,
        value: value
      }))
    },
    {
      id: 'subcontract',
      title: 'المقاولين من الباطن',
      icon: Users,
      amount: 3500000,
      items: Object.entries(mockData.subcontract).map(([key, value]) => ({
        name: key,
        value: value
      }))
    },
    {
      id: 'materials',
      title: 'المواد',
      icon: Package,
      amount: 6000000,
      items: Object.entries(mockData.materials).map(([key, value]) => ({
        name: key,
        value: value
      }))
    },
    {
      id: 'manpower',
      title: 'القوى العاملة',
      icon: Users,
      amount: 4000000,
      items: Object.entries(mockData.manpower).map(([key, value]) => ({
        name: key,
        value: value
      }))
    },
    {
      id: 'equipment',
      title: 'المعدات',
      icon: Truck,
      amount: 2000000,
      items: Object.entries(mockData.equipment).map(([key, value]) => ({
        name: key,
        value: value
      }))
    },
    {
      id: 'indirect',
      title: 'المصاريف غير المباشرة',
      icon: Tool,
      amount: 2000000,
      items: Object.entries(mockData.indirect).map(([key, value]) => ({
        name: key,
        value: value
      }))
    },
  ];

  return (
    <div className="space-y-8">
      {/* Parameters and Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CostBreakdownCard {...costCategories[0]} className="bg-blue-50" />
        <CostBreakdownCard {...costCategories[1]} className="bg-green-50" />
      </div>

      {/* Main Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {costCategories.slice(2).map(category => (
          <CostBreakdownCard
            key={category.id}
            {...category}
            className="bg-white hover:shadow-lg transition-shadow"
          />
        ))}
      </div>
    </div>
  );
};