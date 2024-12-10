import React from 'react';
import { FormattedMessage } from 'react-intl';
import { AwardLetterForm, AwardLetterData } from './AwardLetterForm';
import { AwardLetterList } from './AwardLetterList';
import { useDocumentStore } from '../../../stores/documentStore';
import { Project } from '../../../types/project';

interface AwardLetterViewProps {
  project: Project;
}

export const AwardLetterView: React.FC<AwardLetterViewProps> = ({ project }) => {
  const addDocument = useDocumentStore((state) => state.addDocument);

  const handleSubmit = (data: AwardLetterData) => {
    const document = {
      id: crypto.randomUUID(),
      projectId: project.id,
      name: data.file.name,
      type: 'award-letter' as const,
      file: data.file,
      uploadDate: new Date().toISOString(),
      size: data.file.size,
      metadata: {
        letterNumber: data.letterNumber,
        issueDate: data.issueDate,
        awardAmount: data.awardAmount,
        startDate: data.startDate,
        endDate: data.endDate,
        senderAuthority: data.senderAuthority,
        receiverAuthority: data.receiverAuthority,
      },
    };
    addDocument(document);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">خطاب الترسية</h2>
        <p className="text-gray-600 mb-6">
          المشروع: {project.name} (رقم {project.number})
        </p>
      </div>

      <AwardLetterForm projectId={project.id} onSubmit={handleSubmit} />
      <AwardLetterList projectId={project.id} />
    </div>
  );
};