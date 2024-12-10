export interface Project {
  id: string;
  name: string;
  number: string;
  status: 'active' | 'completed';
  startDate: string;
  endDate: string;
  budget: number;
  actualCosts: number;
  area: string;
}

export interface ProjectStats {
  totalProjects: number;
  activeProjects: number;
  totalBudget: number;
  totalCosts: number;
  variance: number;
}

export interface ProjectFilters {
  area: string;
  status: string;
  search: string;
}