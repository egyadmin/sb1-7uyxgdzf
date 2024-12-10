import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Project } from '../../../types/project';
import { Truck, Users, Package, DollarSign } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatters';

interface ResourceStatsProps {
  project: Project;
}

export const ResourceStats: React.FC<ResourceStatsProps> = ({ project }) => {
  const stats = {
    equipment: {
      total: 60,
      active: 52,
      maintenance: 8,
      utilization: 87,
    },
    labor: {
      total: 180,
      present: 165,
      absent: 15,
      utilization: 92,
    },
    materials: {
      types: 15,
      inStock: 12,
      lowStock: 3,
      stockValue: 2500000,
    },
    costs: {
      budget: 5000000,
      actual: 4200000,
      variance: 800000,
      efficiency: 94,
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-blue-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-blue-900">المعدات</h3>
          <Truck className="w-8 h-8 text-blue-500" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">إجمالي المعدات:</span>
            <span className="font-semibold">{stats.equipment.total}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">نسبة الاستخدام:</span>
            <span className="font-semibold text-blue-600">{stats.equipment.utilization}%</span>
          </div>
        </div>
      </div>

      <div className="bg-green-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-green-900">القوى العاملة</h3>
          <Users className="w-8 h-8 text-green-500" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">إجمالي العمالة:</span>
            <span className="font-semibold">{stats.labor.total}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">نسبة الحضور:</span>
            <span className="font-semibold text-green-600">{stats.labor.utilization}%</span>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-yellow-900">المواد</h3>
          <Package className="w-8 h-8 text-yellow-500" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">أنواع المواد:</span>
            <span className="font-semibold">{stats.materials.types}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">قيمة المخزون:</span>
            <span className="font-semibold text-yellow-600">{formatCurrency(stats.materials.stockValue)}</span>
          </div>
        </div>
      </div>

      <div className="bg-purple-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-purple-900">التكاليف</h3>
          <DollarSign className="w-8 h-8 text-purple-500" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">الميزانية:</span>
            <span className="font-semibold">{formatCurrency(stats.costs.budget)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">كفاءة الإنفاق:</span>
            <span className="font-semibold text-purple-600">{stats.costs.efficiency}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};