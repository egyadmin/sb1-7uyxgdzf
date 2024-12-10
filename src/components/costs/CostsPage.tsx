import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Project } from '../../types/project';
import { DollarSign } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { CostBreakdown } from './CostBreakdown';
import { ExcelUploader } from './ExcelUploader';
import { CostData } from '../../types/costs';

interface CostsPageProps {
  project: Project;
}

export const CostsPage: React.FC<CostsPageProps> = ({ project }) => {
  const [showUploader, setShowUploader] = useState(false);
  const [costData, setCostData] = useState<CostData | null>(null);
  const variance = project.budget - project.actualCosts;
  const varianceClass = variance >= 0 ? 'text-green-600' : 'text-red-600';

  const handleDataLoaded = (data: CostData) => {
    setCostData(data);
    setShowUploader(false);
  };

  return (
    <div className="space-y-6">
      {/* Header with Summary */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
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

      {/* Cost Breakdown with Upload Button */}
      <CostBreakdown 
        projectId={project.id} 
        data={costData} 
        onUpload={() => setShowUploader(true)} 
      />

      {/* Excel Uploader Dialog */}
      {showUploader && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">تحميل بيانات التكاليف</h3>
              <button
                onClick={() => setShowUploader(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <ExcelUploader onDataLoaded={handleDataLoaded} />
          </div>
        </div>
      )}
    </div>
  );
};