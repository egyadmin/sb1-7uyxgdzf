import React from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { BarChart3, Building2, DollarSign } from 'lucide-react';
import { ProjectStats as ProjectStatsType } from '../types/project';
import { formatCurrency } from '../utils/formatters';

interface ProjectStatsProps {
  stats: ProjectStatsType;
}

export const ProjectStats: React.FC<ProjectStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">
              <FormattedMessage id="stats.totalProjects" />
            </p>
            <p className="text-2xl font-semibold">
              <FormattedNumber value={stats.totalProjects} />
              <span className="text-sm text-gray-500 mx-2">
                (<FormattedNumber value={stats.activeProjects} />{' '}
                <FormattedMessage id="stats.active" />)
              </span>
            </p>
          </div>
          <Building2 className="w-8 h-8 text-blue-500" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">
              <FormattedMessage id="stats.totalBudget" />
            </p>
            <p className="text-2xl font-semibold">{formatCurrency(stats.totalBudget)}</p>
          </div>
          <DollarSign className="w-8 h-8 text-green-500" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">
              <FormattedMessage id="stats.budgetVariance" />
            </p>
            <p className={`text-2xl font-semibold ${
              stats.variance >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {formatCurrency(stats.variance)}
            </p>
          </div>
          <BarChart3 className="w-8 h-8 text-purple-500" />
        </div>
      </div>
    </div>
  );
};