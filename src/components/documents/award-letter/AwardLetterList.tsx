import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDocumentStore } from '../../../stores/documentStore';
import { DocumentTable } from '../DocumentTable';

interface AwardLetterListProps {
  projectId: string;
}

export const AwardLetterList: React.FC<AwardLetterListProps> = ({ projectId }) => {
  const documents = useDocumentStore(
    (state) => state.getProjectDocuments(projectId).filter(doc => doc.type === 'award-letter')
  );
  const removeDocument = useDocumentStore((state) => state.removeDocument);

  const handleDownload = (doc: any) => {
    const url = URL.createObjectURL(doc.file);
    const a = document.createElement('a');
    a.href = url;
    a.download = doc.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        <FormattedMessage id="award.uploaded" />
      </h3>
      <DocumentTable
        documents={documents}
        onDownload={handleDownload}
        onDelete={removeDocument}
      />
    </div>
  );
};