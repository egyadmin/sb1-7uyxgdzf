import React from 'react';
import { ProjectStats } from '../ProjectStats';
import { ProjectCostChart } from './ProjectCostChart';
import { ProjectStatusChart } from './ProjectStatusChart';
import { ProjectAreaChart } from './ProjectAreaChart';
import { ProjectKPIChart } from './ProjectKPIChart';
import { Project } from '../../types/project';

interface DashboardProps {
  projects: Project[];
  stats: {
    totalProjects: number;
    activeProjects: number;
    totalBudget: number;
    totalCosts: number;
    variance: number;
  };
}

export const Dashboard: React.FC<DashboardProps> = ({ projects, stats }) => {
  return (
    <div className="space-y-6">
      <ProjectStats stats={stats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProjectCostChart projects={projects.slice(0, 8)} />
        <ProjectStatusChart projects={projects} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProjectAreaChart projects={projects} />
        <ProjectKPIChart projects={projects} />
      </div>
    </div>
  );
};