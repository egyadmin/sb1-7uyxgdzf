import React, { useState } from 'react';
import { Project } from '../../../types/project';
import { ResourceTable } from './ResourceTable';
import { ResourceFilters } from './ResourceFilters';

interface ResourceListProps {
  project: Project;
}

export const ResourceList: React.FC<ResourceListProps> = ({ project }) => {
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    search: '',
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-6">قائمة الموارد</h3>
      <ResourceFilters filters={filters} onFilterChange={setFilters} />
      <ResourceTable filters={filters} />
    </div>
  );
};