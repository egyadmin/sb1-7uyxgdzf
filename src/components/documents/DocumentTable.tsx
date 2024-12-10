import React from 'react';
import { FormattedMessage, FormattedDate } from 'react-intl';
import { FileText, Download, Trash2 } from 'lucide-react';
import { Document } from '../../types/document';
import { formatCurrency } from '../../utils/formatters';

interface DocumentTableProps {
  documents: Document[];
  onDownload: (document: Document) => void;
  onDelete: (documentId: string) => void;
}

export const DocumentTable: React.FC<DocumentTableProps> = ({
  documents,
  onDownload,
  onDelete,
}) => {
  if (documents.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-500">
          <FormattedMessage id="document.noDocuments" />
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                <FormattedMessage id="document.name" defaultMessage="Document Name" />
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                <FormattedMessage id="document.date" defaultMessage="Upload Date" />
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                <FormattedMessage id="document.metadata" defaultMessage="Details" />
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                <FormattedMessage id="document.actions" defaultMessage="Actions" />
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-blue-500 ml-2" />
                    <span className="text-sm font-medium text-gray-900">{doc.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <FormattedDate
                    value={doc.uploadDate}
                    year="numeric"
                    month="long"
                    day="numeric"
                  />
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {doc.metadata && (
                    <div className="space-y-1">
                      {doc.metadata.contractNumber && (
                        <div>رقم العقد: {doc.metadata.contractNumber}</div>
                      )}
                      {doc.metadata.letterNumber && (
                        <div>رقم الخطاب: {doc.metadata.letterNumber}</div>
                      )}
                      {doc.metadata.totalValue && (
                        <div>القيمة: {formatCurrency(doc.metadata.totalValue)}</div>
                      )}
                      {doc.metadata.awardAmount && (
                        <div>قيمة الترسية: {formatCurrency(doc.metadata.awardAmount)}</div>
                      )}
                      {doc.metadata.additionalCost && (
                        <div>التكلفة الإضافية: {formatCurrency(doc.metadata.additionalCost)}</div>
                      )}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => onDownload(doc)}
                      className="text-blue-600 hover:text-blue-900"
                      title="تحميل"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onDelete(doc.id)}
                      className="text-red-600 hover:text-red-900"
                      title="حذف"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};