```typescript
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ResourceCategories } from './categories/ResourceCategories';
import { ResourceList } from './list/ResourceList';
import { ResourceStats } from './stats/ResourceStats';
import { Project } from '../../types/project';

interface ResourceViewProps {
  project: Project;
}

export const ResourceView: React.FC<ResourceViewProps> = ({ project }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          <FormattedMessage id="resources.title" />
        </h2>
        <p className="text-gray-600 mb-6">
          المشروع: {project.name} (رقم {project.number})
        </p>
      </div>

      <ResourceStats project={project} />
      <ResourceCategories project={project} />
      <ResourceList project={project} />
    </div>
  );
};
```