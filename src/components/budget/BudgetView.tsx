```tsx
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Project } from '../../types/project';
import { BudgetUploader } from './BudgetUploader';
import { BudgetBreakdown } from './BudgetBreakdown';
import { BudgetData } from '../../types/budget';

interface BudgetViewProps {
  project: Project;
}

export const BudgetView: React.FC<BudgetViewProps> = ({ project }) => {
  const [budgetData, setBudgetData] = useState<BudgetData | null>(null);
  const [showUploader, setShowUploader] = useState(false);

  const handleDataLoaded = (data: BudgetData) => {
    setBudgetData(data);
    setShowUploader(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">الميزانية</h2>
          <button
            onClick={() => setShowUploader(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            رفع ملف الميزانية
          </button>
        </div>
        <p className="text-gray-600">
          المشروع: {project.name} (رقم {project.number})
        </p>
      </div>

      {budgetData ? (
        <BudgetBreakdown data={budgetData} />
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-500">
            لم يتم رفع بيانات الميزانية بعد. يرجى رفع ملف Excel للميزانية.
          </p>
        </div>
      )}

      {showUploader && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">رفع ملف الميزانية</h3>
              <button
                onClick={() => setShowUploader(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <BudgetUploader onDataLoaded={handleDataLoaded} />
          </div>
        </div>
      )}
    </div>
  );
};
```