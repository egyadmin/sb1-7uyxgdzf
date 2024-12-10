import React, { useState, useMemo } from 'react';
import { Project, ProjectFilters } from '../types/project';
import { ProjectCard } from './ProjectCard';
import { Dashboard } from './dashboard/Dashboard';
import { ProjectFilters as ProjectFiltersComponent } from './ProjectFilters';

interface ProjectViewProps {
  projects: Project[];
  stats: {
    totalProjects: number;
    activeProjects: number;
    totalBudget: number;
    totalCosts: number;
    variance: number;
  };
}

export const ProjectView: React.FC<ProjectViewProps> = ({ projects, stats }) => {
  const [filters, setFilters] = useState<ProjectFilters>({
    area: '',
    status: '',
    search: '',
  });

  const areas = useMemo(() => {
    return Array.from(new Set(projects.map(p => p.area))).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesArea = !filters.area || project.area === filters.area;
      const matchesStatus = !filters.status || project.status === filters.status;
      const matchesSearch = !filters.search || 
        project.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        project.number.toLowerCase().includes(filters.search.toLowerCase());
      
      return matchesArea && matchesStatus && matchesSearch;
    });
  }, [projects, filters]);

  return (
    <div className="space-y-8">
      <Dashboard projects={projects} stats={stats} />
      
      <ProjectFiltersComponent
        filters={filters}
        onFilterChange={setFilters}
        areas={areas}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};