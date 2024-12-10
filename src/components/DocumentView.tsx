import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Project } from '../types/project';
import { ProjectSelector } from './ProjectSelector';
import { DocumentManager } from './documents/DocumentManager';
import { DocumentType } from '../types/document';

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
  if (!selectedProject) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-xl text-gray-500">
          <FormattedMessage id="document.selectProject" />
        </p>
      </div>
    );
  }

  if (!currentDocumentPage) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-xl text-gray-500">
          <FormattedMessage id="document.selectType" />
        </p>
      </div>
    );
  }

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
      
      <DocumentManager 
        projectId={selectedProject.id} 
        documentType={currentDocumentPage}
      />
    </div>
  );
};