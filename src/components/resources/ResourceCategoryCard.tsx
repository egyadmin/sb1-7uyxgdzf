import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ResourceItem {
  name: string;
  count?: number;
  quantity?: number;
  unit?: string;
  utilization?: number;
  status?: string;
}

interface ResourceCategory {
  id: string;
  title: string;
  icon: LucideIcon;
  items: ResourceItem[];
}

interface ResourceCategoryCardProps {
  category: ResourceCategory;
  className?: string;
}

export const ResourceCategoryCard: React.FC<ResourceCategoryCardProps> = ({ 
  category,
  className = ''
}) => {
  const Icon = category.icon;

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="flex items-center space-x-3 mb-4">
        <Icon className="w-8 h-8 text-blue-500" />
        <h3 className="text-lg font-semibold">{category.title}</h3>
      </div>

      <div className="space-y-3">
        {category.items.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-gray-600">{item.name}</span>
            <div className="text-right">
              {item.count !== undefined && (
                <span className="font-semibold">{item.count} وحدة</span>
              )}
              {item.quantity !== undefined && (
                <span className="font-semibold">
                  {item.quantity.toLocaleString()} {item.unit}
                </span>
              )}
              {item.utilization !== undefined && (
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-blue-500 rounded-full"
                      style={{ width: `${item.utilization}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-500">{item.utilization}%</span>
                </div>
              )}
              {item.status && (
                <span className={`text-sm ${
                  item.status === 'مجدولة' ? 'text-green-600' :
                  item.status === 'جارية' ? 'text-blue-600' :
                  'text-yellow-600'
                }`}>
                  {item.status}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};