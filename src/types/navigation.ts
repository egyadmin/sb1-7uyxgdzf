export type DocumentSubPage = 
  | 'project-contract'
  | 'award-letter'
  | 'variation-orders'
  | 'letters'
  | 'insurance'
  | 'subcontractor'
  | 'invoice';

export type ProjectSubPage = 
  | 'documents'
  | 'contract'
  | 'timeline'
  | 'costs'
  | 'resources'
  | 'periodic'
  | 'labor'
  | 'kpi'
  | 'budget';

export type MainView = 'dashboard' | 'projects';

export interface NavItem {
  id: ProjectSubPage;
  icon: string;
  messageId: string;
  component: React.ComponentType<any>;
}