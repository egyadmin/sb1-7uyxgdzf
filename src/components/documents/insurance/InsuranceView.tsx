import React from 'react';
import { FormattedMessage } from 'react-intl';
import { InsuranceForm, InsuranceData } from './InsuranceForm';
import { InsuranceList } from './InsuranceList';
import { InsuranceDetails } from './InsuranceDetails';
import { useDocumentStore } from '../../../stores/documentStore';
import { Project } from '../../../types/project';

interface InsuranceViewProps {
  project: Project;
}

export const InsuranceView: React.FC<InsuranceViewProps> = ({ project }) => {
  const addDocument = useDocumentStore((state) => state.addDocument);
  const documents = useDocumentStore(
    (state) => state.getProjectDocuments(project.id).filter(doc => doc.type === 'insurance')
  );

  const handleSubmit = (data: InsuranceData) => {
    const document = {
      id: crypto.randomUUID(),
      projectId: project.id,
      name: data.file.name,
      type: 'insurance' as const,
      file: data.file,
      uploadDate: new Date().toISOString(),
      size: data.file.size,
      metadata: {
        policyNumber: data.policyNumber,
        insuranceCompany: data.insuranceCompany,
        insuranceType: data.insuranceType,
        startDate: data.startDate,
        endDate: data.endDate,
        amount: data.amount,
        coverage: data.coverage,
        exclusions: data.exclusions,
      },
    };
    addDocument(document);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">وثائق التأمين</h2>
        <p className="text-gray-600 mb-6">
          المشروع: {project.name} (رقم {project.number})
        </p>
      </div>

      {documents.map(document => (
        <InsuranceDetails key={document.id} document={document} />
      ))}

      <InsuranceForm projectId={project.id} onSubmit={handleSubmit} />
      <InsuranceList projectId={project.id} />
    </div>
  );
};