import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Project } from '../../types/project';
import { ProjectSubPage } from '../../types/navigation';
import { ContractPage } from './ContractPage';
import { TimelinePage } from './TimelinePage';
import { CostsPage } from './CostsPage';
import { ResourcesPage } from './ResourcesPage';
import { PeriodicPage } from './PeriodicPage';
import { LaborPage } from './LaborPage';
import { KPIPage } from './KPIPage';
import { BudgetPage } from './BudgetPage';
import { DocumentView } from '../documents/DocumentView';

interface ProjectContentProps {
  project: Project;
  currentSubPage: ProjectSubPage;
  currentDocumentPage: string | null;
  projects: Project[];
  onProjectSelect: (project: Project) => void;
}

export const ProjectContent: React.FC<ProjectContentProps> = ({
  project,
  currentSubPage,
  currentDocumentPage,
  projects,
  onProjectSelect,
}) => {
  const renderContent = () => {
    switch (currentSubPage) {
      case 'documents':
        return (
          <DocumentView
            projects={projects}
            selectedProject={project}
            onProjectSelect={onProjectSelect}
            currentDocumentPage={currentDocumentPage}
          />
        );
      case 'contract':
        return <ContractPage project={project} />;
      case 'timeline':
        return <TimelinePage project={project} />;
      case 'costs':
        return <CostsPage project={project} />;
      case 'resources':
        return <ResourcesPage project={project} />;
      case 'periodic':
        return <PeriodicPage project={project} />;
      case 'labor':
        return <LaborPage project={project} />;
      case 'kpi':
        return <KPIPage project={project} />;
      case 'budget':
        return <BudgetPage project={project} />;
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-xl text-gray-500">
              <FormattedMessage id="page.comingSoon" />
            </p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {renderContent()}
    </div>
  );
};