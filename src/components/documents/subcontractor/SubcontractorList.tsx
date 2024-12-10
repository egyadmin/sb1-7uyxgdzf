import React from 'react';
import { FormattedMessage, FormattedDate } from 'react-intl';
import { useDocumentStore } from '../../../stores/documentStore';
import { DocumentTable } from '../DocumentTable';
import { formatCurrency } from '../../../utils/formatters';

interface SubcontractorListProps {
  projectId: string;
}

export const SubcontractorList: React.FC<SubcontractorListProps> = ({ projectId }) => {
  const documents = useDocumentStore(
    (state) => state.getProjectDocuments(projectId).filter(doc => doc.type === 'subcontractor')
  );
  const removeDocument = useDocumentStore((state) => state.removeDocument);

  const totalContractValue = documents.reduce((sum, doc) => {
    return sum + (doc.metadata?.contractValue || 0);
  }, 0);

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
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">
          <FormattedMessage id="subcontractor.uploaded" defaultMessage="عقود المقاولين الباطن المرفوعة" />
        </h3>
        <div className="text-lg font-semibold text-blue-600">
          <FormattedMessage id="subcontractor.totalValue" defaultMessage="إجمالي قيمة العقود" />: {formatCurrency(totalContractValue)}
        </div>
      </div>
      <DocumentTable
        documents={documents}
        onDownload={handleDownload}
        onDelete={removeDocument}
      />
    </div>
  );
};