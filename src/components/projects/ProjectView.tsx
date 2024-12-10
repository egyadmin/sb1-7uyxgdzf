import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Project, ProjectFilters as FilterType } from '../../types/project';
import { ProjectTable } from './ProjectTable';
import { ProjectFilters } from '../ProjectFilters';

interface ProjectViewProps {
  projects: Project[];
  onProjectSelect: (project: Project) => void;
}

export const ProjectView: React.FC<ProjectViewProps> = ({ projects, onProjectSelect }) => {
  const [filters, setFilters] = useState<FilterType>({
    area: '',
    status: '',
    search: ''
  });

  const areas = Array.from(new Set(projects.map(p => p.area))).sort();

  const filteredProjects = projects.filter(project => {
    const matchesArea = !filters.area || project.area === filters.area;
    const matchesStatus = !filters.status || project.status === filters.status;
    const matchesSearch = !filters.search || 
      project.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      project.number.toLowerCase().includes(filters.search.toLowerCase());
    
    return matchesArea && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          <FormattedMessage id="projects.title" />
        </h2>
      </div>

      <ProjectFilters
        filters={filters}
        onFilterChange={setFilters}
        areas={areas}
      />

      <ProjectTable
        projects={filteredProjects}
        onProjectSelect={onProjectSelect}
      />
    </div>
  );
};