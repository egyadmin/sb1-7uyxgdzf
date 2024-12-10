import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ChevronDown } from 'lucide-react';
import { Project } from '../types/project';

interface ProjectSelectorProps {
  projects: Project[];
  selectedProject: Project;
  onProjectSelect: (project: Project) => void;
}

export const ProjectSelector: React.FC<ProjectSelectorProps> = ({
  projects,
  selectedProject,
  onProjectSelect,
}) => {
  return (
    <div className="relative">
      <select
        value={selectedProject.id}
        onChange={(e) => {
          const project = projects.find(p => p.id === e.target.value);
          if (project) onProjectSelect(project);
        }}
        className="appearance-none w-full bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name} ({project.number})
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
    </div>
  );
};