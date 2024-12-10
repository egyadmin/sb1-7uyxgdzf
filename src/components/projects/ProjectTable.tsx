import React from 'react';
import { FormattedMessage, FormattedDate, useIntl } from 'react-intl';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Project } from '../../types/project';
import { formatCurrency } from '../../utils/formatters';

interface ProjectTableProps {
  projects: Project[];
  onProjectSelect: (project: Project) => void;
}

export const ProjectTable: React.FC<ProjectTableProps> = ({ projects, onProjectSelect }) => {
  const { locale } = useIntl();
  const isRTL = locale === 'ar';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                <FormattedMessage id="project.name" defaultMessage="Project Name" />
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                <FormattedMessage id="project.number" defaultMessage="Project Number" />
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                <FormattedMessage id="project.status" defaultMessage="Status" />
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                <FormattedMessage id="project.dates" defaultMessage="Project Dates" />
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                <FormattedMessage id="project.budget" defaultMessage="Budget" />
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">
                  <FormattedMessage id="project.actions" defaultMessage="Actions" />
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.map((project) => (
              <tr
                key={project.id}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => onProjectSelect(project)}
              >
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{project.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">{project.number}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    project.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    <FormattedMessage id={`project.status.${project.status}`} />
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div>
                    <FormattedDate value={project.startDate} /> - <FormattedDate value={project.endDate} />
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {formatCurrency(project.budget)}
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  {isRTL ? <ChevronLeft className="w-5 h-5 text-blue-500" /> : <ChevronRight className="w-5 h-5 text-blue-500" />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};