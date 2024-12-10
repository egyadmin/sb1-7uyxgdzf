import React from 'react';
import { FormattedMessage } from 'react-intl';
import { SubcontractorForm, SubcontractorData } from './SubcontractorForm';
import { SubcontractorList } from './SubcontractorList';
import { SubcontractorStatus } from './SubcontractorStatus';
import { SubcontractorPayments } from './SubcontractorPayments';
import { useDocumentStore } from '../../../stores/documentStore';
import { Project } from '../../../types/project';
import { Document } from '../../../types/document';

interface SubcontractorViewProps {
  project: Project;
}

export const SubcontractorView: React.FC<SubcontractorViewProps> = ({ project }) => {
  const addDocument = useDocumentStore((state) => state.addDocument);
  const updateDocument = useDocumentStore((state) => state.updateDocument);
  const documents = useDocumentStore(
    (state) => state.getProjectDocuments(project.id).filter(doc => doc.type === 'subcontractor')
  );

  const handleSubmit = (data: SubcontractorData) => {
    const document = {
      id: crypto.randomUUID(),
      projectId: project.id,
      name: data.file.name,
      type: 'subcontractor' as const,
      file: data.file,
      uploadDate: new Date().toISOString(),
      size: data.file.size,
      metadata: {
        contractNumber: data.contractNumber,
        subcontractorName: data.subcontractorName,
        workType: data.workType,
        startDate: data.startDate,
        endDate: data.endDate,
        contractValue: data.contractValue,
        scopeOfWork: data.scopeOfWork,
        paymentTerms: data.paymentTerms,
        status: 'active',
        progress: 0,
        paidAmount: 0,
        payments: [],
      },
    };
    addDocument(document);
  };

  const handleStatusChange = (documentId: string, status: string) => {
    const document = documents.find(doc => doc.id === documentId);
    if (document) {
      updateDocument({
        ...document,
        metadata: {
          ...document.metadata,
          status,
        },
      });
    }
  };

  const handleProgressUpdate = (documentId: string, progress: number) => {
    const document = documents.find(doc => doc.id === documentId);
    if (document) {
      updateDocument({
        ...document,
        metadata: {
          ...document.metadata,
          progress,
        },
      });
    }
  };

  const handlePaymentUpdate = (documentId: string, paidAmount: number) => {
    const document = documents.find(doc => doc.id === documentId);
    if (document) {
      updateDocument({
        ...document,
        metadata: {
          ...document.metadata,
          paidAmount,
        },
      });
    }
  };

  const handleAddPayment = (documentId: string, payment: any) => {
    const document = documents.find(doc => doc.id === documentId);
    if (document) {
      const payments = document.metadata?.payments || [];
      updateDocument({
        ...document,
        metadata: {
          ...document.metadata,
          payments: [
            ...payments,
            {
              id: crypto.randomUUID(),
              ...payment,
            },
          ],
        },
      });
    }
  };

  const handleUpdatePaymentStatus = (documentId: string, paymentId: string, status: string) => {
    const document = documents.find(doc => doc.id === documentId);
    if (document) {
      const payments = document.metadata?.payments || [];
      updateDocument({
        ...document,
        metadata: {
          ...document.metadata,
          payments: payments.map((payment: any) =>
            payment.id === paymentId ? { ...payment, status } : payment
          ),
        },
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">عقود المقاولين الباطن</h2>
        <p className="text-gray-600 mb-6">
          المشروع: {project.name} (رقم {project.number})
        </p>
      </div>

      <SubcontractorForm projectId={project.id} onSubmit={handleSubmit} />
      
      {documents.map((document: Document) => (
        <div key={document.id} className="space-y-4">
          <SubcontractorStatus
            document={document}
            onStatusChange={handleStatusChange}
            onProgressUpdate={handleProgressUpdate}
            onPaymentUpdate={handlePaymentUpdate}
          />
          <SubcontractorPayments
            document={document}
            onAddPayment={handleAddPayment}
            onUpdatePaymentStatus={handleUpdatePaymentStatus}
          />
        </div>
      ))}

      <SubcontractorList projectId={project.id} />
    </div>
  );
};