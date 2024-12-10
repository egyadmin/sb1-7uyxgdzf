import React from 'react';
import { FormattedMessage } from 'react-intl';
import { InvoiceForm, InvoiceData } from './InvoiceForm';
import { InvoiceList } from './InvoiceList';
import { useDocumentStore } from '../../../stores/documentStore';
import { Project } from '../../../types/project';

interface InvoiceViewProps {
  project: Project;
}

export const InvoiceView: React.FC<InvoiceViewProps> = ({ project }) => {
  const addDocument = useDocumentStore((state) => state.addDocument);

  const handleSubmit = (data: InvoiceData) => {
    const document = {
      id: crypto.randomUUID(),
      projectId: project.id,
      name: data.file.name,
      type: 'invoice' as const,
      file: data.file,
      uploadDate: new Date().toISOString(),
      size: data.file.size,
      metadata: {
        invoiceNumber: data.invoiceNumber,
        issueDate: data.issueDate,
        periodStart: data.periodStart,
        periodEnd: data.periodEnd,
        totalAmount: data.totalAmount,
        retentionAmount: data.retentionAmount,
        netAmount: data.netAmount,
        status: data.status,
        ownerEntity: data.ownerEntity,
        workDescription: data.workDescription,
      },
    };
    addDocument(document);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">مستخلصات المالك</h2>
        <p className="text-gray-600 mb-6">
          المشروع: {project.name} (رقم {project.number})
        </p>
      </div>

      <InvoiceForm projectId={project.id} onSubmit={handleSubmit} />
      <InvoiceList projectId={project.id} />
    </div>
  );
};