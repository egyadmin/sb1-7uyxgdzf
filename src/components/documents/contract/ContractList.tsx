import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDocumentStore } from '../../../stores/documentStore';
import { DocumentTable } from '../DocumentTable';

interface ContractListProps {
  projectId: string;
}

export const ContractList: React.FC<ContractListProps> = ({ projectId }) => {
  const documents = useDocumentStore(
    (state) => state.getProjectDocuments(projectId).filter(doc => doc.type === 'project-contract')
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
        <FormattedMessage id="contract.uploaded" />
      </h3>
      <DocumentTable
        documents={documents}
        onDownload={handleDownload}
        onDelete={removeDocument}
      />
    </div>
  );
};