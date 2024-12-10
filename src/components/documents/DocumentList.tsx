import React from 'react';
import { FormattedMessage, FormattedDate } from 'react-intl';
import { FileText, Trash2 } from 'lucide-react';
import { useDocumentStore } from '../../stores/documentStore';
import { Document } from '../../types/document';

interface DocumentListProps {
  projectId: string;
  type: Document['type'];
}

export const DocumentList: React.FC<DocumentListProps> = ({ projectId, type }) => {
  const documents = useDocumentStore(
    (state) => state.getProjectDocuments(projectId).filter(doc => doc.type === type)
  );
  const removeDocument = useDocumentStore((state) => state.removeDocument);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-2">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
        >
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-blue-500" />
            <div>
              <p className="font-medium">{doc.name}</p>
              <p className="text-sm text-gray-500">
                <FormattedDate
                  value={doc.uploadDate}
                  year="numeric"
                  month="short"
                  day="2-digit"
                /> - {formatFileSize(doc.size)}
              </p>
            </div>
          </div>
          <button
            onClick={() => removeDocument(doc.id)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-full"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      {documents.length === 0 && (
        <p className="text-center text-gray-500 py-4">
          <FormattedMessage id="document.noDocuments" />
        </p>
      )}
    </div>
  );
};