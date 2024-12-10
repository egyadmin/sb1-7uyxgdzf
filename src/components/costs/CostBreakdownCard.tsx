import React from 'react';
import { FormattedMessage } from 'react-intl';
import { LucideIcon } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

interface CostBreakdownCardProps {
  title: string;
  icon: LucideIcon;
  amount: number;
  items: Array<{
    name: string;
    value: string | number;
  }>;
  className?: string;
}

export const CostBreakdownCard: React.FC<CostBreakdownCardProps> = ({
  title,
  icon: Icon,
  amount,
  items,
  className = ''
}) => {
  return (
    <div className={`rounded-lg shadow-md p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <Icon className="w-8 h-8 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            <FormattedMessage id={`costs.${title.toLowerCase()}`} defaultMessage={title} />
          </h3>
        </div>
      </div>
      
      <div className="mb-6">
        <p className="text-3xl font-bold text-blue-600">
          {formatCurrency(amount)}
        </p>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div 
            key={index} 
            className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
          >
            <span className="text-gray-700">{item.name}</span>
            <span className="font-medium text-gray-900">
              {typeof item.value === 'number' ? formatCurrency(item.value) : item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};