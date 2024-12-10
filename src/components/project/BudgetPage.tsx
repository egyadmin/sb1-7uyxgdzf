import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Project } from '../../types/project';
import { DollarSign, TrendingUp, TrendingDown, PieChart } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

interface BudgetPageProps {
  project: Project;
}

export const BudgetPage: React.FC<BudgetPageProps> = ({ project }) => {
  const budgetData = {
    planned: project.budget,
    actual: project.actualCosts,
    remaining: project.budget - project.actualCosts,
    categories: [
      { name: 'أعمال مدنية', planned: 3500000, actual: 3200000 },
      { name: 'أعمال كهربائية', planned: 1500000, actual: 1400000 },
      { name: 'أعمال ميكانيكية', planned: 2000000, actual: 1800000 },
      { name: 'تشطيبات', planned: 2500000, actual: 2100000 },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          <FormattedMessage id="budget.title" defaultMessage="الميزانية" />
        </h2>
        <p className="text-gray-600 mb-6">
          المشروع: {project.name} (رقم {project.number})
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-blue-900">الميزانية المخططة</h3>
            <DollarSign className="w-6 h-6 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-blue-600">{formatCurrency(budgetData.planned)}</p>
        </div>

        <div className="bg-green-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-green-900">المصروف الفعلي</h3>
            <TrendingUp className="w-6 h-6 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-green-600">{formatCurrency(budgetData.actual)}</p>
        </div>

        <div className="bg-purple-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-purple-900">المتبقي</h3>
            <TrendingDown className="w-6 h-6 text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-purple-600">{formatCurrency(budgetData.remaining)}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-6">توزيع الميزانية حسب البنود</h3>
        <div className="space-y-6">
          {budgetData.categories.map((category, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{category.name}</span>
                <span className="text-sm text-gray-500">
                  {formatCurrency(category.actual)} / {formatCurrency(category.planned)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${(category.actual / category.planned) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};