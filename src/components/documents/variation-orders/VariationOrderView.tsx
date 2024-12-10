import React from 'react';
import { FormattedMessage } from 'react-intl';
import { VariationOrderForm } from './VariationOrderForm';
import { VariationOrderList } from './VariationOrderList';
import { useDocumentStore } from '../../../stores/documentStore';
import { Project } from '../../../types/project';

interface VariationOrderViewProps {
  project: Project;
}

export const VariationOrderView: React.FC<VariationOrderViewProps> = ({ project }) => {
  const addDocument = useDocumentStore((state) => state.addDocument);

  const handleSubmit = (data: any) => {
    const document = {
      id: crypto.randomUUID(),
      projectId: project.id,
      name: data.file.name,
      type: 'variation-orders' as const,
      file: data.file,
      uploadDate: new Date().toISOString(),
      size: data.file.size,
      metadata: {
        orderNumber: data.orderNumber,
        issueDate: data.issueDate,
        description: data.description,
        reason: data.reason,
        additionalCost: data.additionalCost,
      },
    };
    addDocument(document);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">البنود المستحدثة</h2>
        <p className="text-gray-600 mb-6">
          المشروع: {project.name} (رقم {project.number})
        </p>
      </div>

      <VariationOrderForm projectId={project.id} onSubmit={handleSubmit} />
      <VariationOrderList projectId={project.id} />
    </div>
  );
};