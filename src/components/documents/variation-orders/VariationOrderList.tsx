import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDocumentStore } from '../../../stores/documentStore';
import { DocumentTable } from '../DocumentTable';
import { formatCurrency } from '../../../utils/formatters';

interface VariationOrderListProps {
  projectId: string;
}

export const VariationOrderList: React.FC<VariationOrderListProps> = ({ projectId }) => {
  const documents = useDocumentStore(
    (state) => state.getProjectDocuments(projectId).filter(doc => doc.type === 'variation-orders')
  );
  const removeDocument = useDocumentStore((state) => state.removeDocument);

  const totalAdditionalCost = documents.reduce((sum, doc) => {
    return sum + (doc.metadata?.additionalCost || 0);
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
          <FormattedMessage id="variation.uploaded" />
        </h3>
        <div className="text-lg font-semibold text-blue-600">
          <FormattedMessage id="variation.totalCost" />: {formatCurrency(totalAdditionalCost)}
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