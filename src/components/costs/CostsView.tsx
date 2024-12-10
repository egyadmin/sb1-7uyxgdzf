```typescript
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Project } from '../../types/project';
import { CostBreakdown } from './CostBreakdown';

interface CostsViewProps {
  project: Project;
}

export const CostsView: React.FC<CostsViewProps> = ({ project }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          <FormattedMessage id="costs.title" defaultMessage="Cost Breakdown" />
        </h2>
        <p className="text-gray-600 mb-6">
          المشروع: {project.name} (رقم {project.number})
        </p>
      </div>

      <CostBreakdown projectId={project.id} />
    </div>
  );
};
```