import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Project } from '../../types/project';

interface ContractPageProps {
  project: Project;
}

export const ContractPage: React.FC<ContractPageProps> = ({ project }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          <FormattedMessage id="contract.title" defaultMessage="Contract Details" />
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              <FormattedMessage id="project.details" defaultMessage="Project Information" />
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">
                  <FormattedMessage id="project.name" defaultMessage="Project Name" />
                </p>
                <p className="font-medium">{project.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  <FormattedMessage id="project.number" defaultMessage="Project Number" />
                </p>
                <p className="font-medium">{project.number}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};