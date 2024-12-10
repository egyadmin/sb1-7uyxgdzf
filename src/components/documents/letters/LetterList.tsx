import React from 'react';
import { FormattedMessage, FormattedDate } from 'react-intl';
import { FileText, Download, Trash2 } from 'lucide-react';
import { useDocumentStore } from '../../../stores/documentStore';
import { Document } from '../../../types/document';

interface LetterListProps {
  projectId: string;
}

export const LetterList: React.FC<LetterListProps> = ({ projectId }) => {
  const documents = useDocumentStore(
    (state) => state.getProjectDocuments(projectId).filter(doc => doc.type === 'letters')
  );
  const removeDocument = useDocumentStore((state) => state.removeDocument);

  const handleDownload = (doc: Document) => {
    const url = URL.createObjectURL(doc.file);
    const a = document.createElement('a');
    a.href = url;
    a.download = doc.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (documents.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-500">
          <FormattedMessage id="letters.noDocuments" />
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
                <FormattedMessage id="letters.number" />
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                <FormattedMessage id="letters.type" />
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                <FormattedMessage id="letters.date" />
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                <FormattedMessage id="letters.description" />
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                <FormattedMessage id="letters.actions" />
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-blue-500 ml-2" />
                    <span className="text-sm font-medium text-gray-900">
                      {doc.metadata?.letterNumber}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <FormattedMessage id={`letters.type.${doc.metadata?.letterType}`} />
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <FormattedDate
                    value={doc.metadata?.issueDate}
                    year="numeric"
                    month="long"
                    day="numeric"
                  />
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="max-w-xs truncate">
                    {doc.metadata?.description}
                    {doc.metadata?.quantity && ` - ${doc.metadata.quantity}`}
                    {doc.metadata?.reason && ` - ${doc.metadata.reason}`}
                    {doc.metadata?.authority && ` - ${doc.metadata.authority}`}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleDownload(doc)}
                      className="text-blue-600 hover:text-blue-900"
                      title={<FormattedMessage id="letters.download" />}
                    >
                      <Download className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => removeDocument(doc.id)}
                      className="text-red-600 hover:text-red-900"
                      title={<FormattedMessage id="letters.delete" />}
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