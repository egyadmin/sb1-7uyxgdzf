import React from 'react';
import { ContractForm } from './ContractForm';
import { ContractList } from './ContractList';
import { useDocumentStore } from '../../../stores/documentStore';
import { Project } from '../../../types/project';

interface ContractViewProps {
  project: Project;
}

export const ContractView: React.FC<ContractViewProps> = ({ project }) => {
  const addDocument = useDocumentStore((state) => state.addDocument);

  const handleSubmit = (data: any) => {
    const document = {
      id: crypto.randomUUID(),
      projectId: project.id,
      name: data.file.name,
      type: 'project-contract' as const,
      file: data.file,
      uploadDate: new Date().toISOString(),
      size: data.file.size,
      metadata: {
        contractNumber: data.contractNumber,
        signDate: data.signDate,
        signingAuthority: data.signingAuthority,
        totalValue: data.totalValue,
        duration: data.duration,
      },
    };
    addDocument(document);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">عقد المشروع</h2>
        <p className="text-gray-600 mb-6">
          المشروع: {project.name} (رقم {project.number})
        </p>
      </div>

      <ContractForm projectId={project.id} onSubmit={handleSubmit} />
      <ContractList projectId={project.id} />
    </div>
  );
};