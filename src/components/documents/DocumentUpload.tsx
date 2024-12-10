import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FormattedMessage } from 'react-intl';
import { Upload } from 'lucide-react';
import { DocumentType } from '../../types/document';
import { useDocumentStore } from '../../stores/documentStore';

interface DocumentUploadProps {
  projectId: string;
  type: DocumentType;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({ projectId, type }) => {
  const addDocument = useDocumentStore((state) => state.addDocument);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      const document = {
        id: crypto.randomUUID(),
        projectId,
        name: file.name,
        type,
        file,
        uploadDate: new Date().toISOString(),
        size: file.size,
      };
      addDocument(document);
    });
  }, [projectId, type, addDocument]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
    >
      <input {...getInputProps()} />
      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
      {isDragActive ? (
        <p className="text-blue-500">
          <FormattedMessage id="document.dropHere" />
        </p>
      ) : (
        <p className="text-gray-500">
          <FormattedMessage id="document.dragAndDrop" />
        </p>
      )}
    </div>
  );
};