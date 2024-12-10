import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Project } from '../../types/project';
import { ProjectSelector } from '../ProjectSelector';
import { ContractView } from './contract/ContractView';
import { AwardLetterView } from './award-letter/AwardLetterView';
import { VariationOrderView } from './variation-orders/VariationOrderView';
import { LetterView } from './letters/LetterView';
import { InsuranceView } from './insurance/InsuranceView';
import { SubcontractorView } from './subcontractor/SubcontractorView';
import { InvoiceView } from './invoice/InvoiceView';
import { DocumentType } from '../../types/document';

interface DocumentViewProps {
  projects: Project[];
  selectedProject: Project;
  onProjectSelect: (project: Project) => void;
  currentDocumentPage: DocumentType | null;
}

export const DocumentView: React.FC<DocumentViewProps> = ({
  projects,
  selectedProject,
  onProjectSelect,
  currentDocumentPage,
}) => {
  const renderDocumentView = () => {
    switch (currentDocumentPage) {
      case 'project-contract':
        return <ContractView project={selectedProject} />;
      case 'award-letter':
        return <AwardLetterView project={selectedProject} />;
      case 'variation-orders':
        return <VariationOrderView project={selectedProject} />;
      case 'letters':
        return <LetterView project={selectedProject} />;
      case 'insurance':
        return <InsuranceView project={selectedProject} />;
      case 'subcontractor':
        return <SubcontractorView project={selectedProject} />;
      case 'invoice':
        return <InvoiceView project={selectedProject} />;
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-xl text-gray-500">
              <FormattedMessage id="document.comingSoon" />
            </p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">
          <FormattedMessage id="document.projectDocuments" />
        </h2>
        <div className="w-72">
          <ProjectSelector
            projects={projects}
            selectedProject={selectedProject}
            onProjectSelect={onProjectSelect}
          />
        </div>
      </div>
      
      {renderDocumentView()}
    </div>
  );
};