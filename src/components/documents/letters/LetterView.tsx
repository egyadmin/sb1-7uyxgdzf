import React from 'react';
import { FormattedMessage } from 'react-intl';
import { LetterForm, LetterData } from './LetterForm';
import { LetterList } from './LetterList';
import { useDocumentStore } from '../../../stores/documentStore';
import { Project } from '../../../types/project';

interface LetterViewProps {
  project: Project;
}

export const LetterView: React.FC<LetterViewProps> = ({ project }) => {
  const addDocument = useDocumentStore((state) => state.addDocument);

  const handleSubmit = (data: LetterData) => {
    const document = {
      id: crypto.randomUUID(),
      projectId: project.id,
      name: data.file.name,
      type: 'letters' as const,
      file: data.file,
      uploadDate: new Date().toISOString(),
      size: data.file.size,
      metadata: {
        letterNumber: data.letterNumber,
        issueDate: data.issueDate,
        letterType: data.letterType,
        description: data.description,
        quantity: data.quantity,
        reason: data.reason,
        authority: data.authority,
      },
    };
    addDocument(document);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          <FormattedMessage id="letters.title" />
        </h2>
        <p className="text-gray-600 mb-6">
          المشروع: {project.name} (رقم {project.number})
        </p>
      </div>

      <LetterForm projectId={project.id} onSubmit={handleSubmit} />
      <LetterList projectId={project.id} />
    </div>
  );
};