import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Calendar, DollarSign, Hash } from 'lucide-react';
import { Project } from '../types/project';
import { formatCurrency } from '../utils/formatters';
import { format } from 'date-fns';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { locale } = useIntl();
  const isRTL = locale === 'ar';
  const variance = project.budget - project.actualCosts;
  const varianceClass = variance >= 0 ? 'text-green-600' : 'text-red-600';

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{project.name}</h3>
        <span className={`px-3 py-1 rounded-full text-sm ${
          project.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          <FormattedMessage id={`project.status.${project.status}`} />
        </span>
      </div>
      
      <div className="space-y-3">
        <div className={`flex items-center text-gray-600 ${isRTL ? 'space-x-reverse' : 'space-x-2'}`}>
          <Hash className="w-4 h-4" />
          <span>{project.number}</span>
        </div>
        
        <div className={`flex items-center text-gray-600 ${isRTL ? 'space-x-reverse' : 'space-x-2'}`}>
          <Calendar className="w-4 h-4" />
          <span>
            {format(new Date(project.startDate), 'MMM d, yyyy')} - 
            {format(new Date(project.endDate), 'MMM d, yyyy')}
          </span>
        </div>
        
        <div className={`flex items-center text-gray-600 ${isRTL ? 'space-x-reverse' : 'space-x-2'}`}>
          <DollarSign className="w-4 h-4" />
          <span>
            <FormattedMessage id="project.budget" />: {formatCurrency(project.budget)}
          </span>
        </div>
        
        <div className={`flex items-center text-gray-600 ${isRTL ? 'space-x-reverse' : 'space-x-2'}`}>
          <DollarSign className="w-4 h-4" />
          <span>
            <FormattedMessage id="project.actual" />: {formatCurrency(project.actualCosts)}
          </span>
        </div>
        
        <div className={`flex items-center ${varianceClass} font-medium ${isRTL ? 'space-x-reverse' : 'space-x-2'}`}>
          <span>
            <FormattedMessage id="project.variance" />: {formatCurrency(variance)}
          </span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <span className="text-sm text-gray-500">{project.area}</span>
      </div>
    </div>
  );
};