import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Project } from '../../types/project';
import { DollarSign } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

interface CostsPageProps {
  project: Project;
}

export const CostsPage: React.FC<CostsPageProps> = ({ project }) => {
  const variance = project.budget - project.actualCosts;
  const varianceClass = variance >= 0 ? 'text-green-600' : 'text-red-600';

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          <FormattedMessage id="costs.title" defaultMessage="Project Costs" />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  <FormattedMessage id="costs.budget" defaultMessage="Budget" />
                </p>
                <p className="text-xl font-semibold">{formatCurrency(project.budget)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  <FormattedMessage id="costs.actual" defaultMessage="Actual Costs" />
                </p>
                <p className="text-xl font-semibold">{formatCurrency(project.actualCosts)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  <FormattedMessage id="costs.variance" defaultMessage="Variance" />
                </p>
                <p className={`text-xl font-semibold ${varianceClass}`}>
                  {formatCurrency(variance)}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};