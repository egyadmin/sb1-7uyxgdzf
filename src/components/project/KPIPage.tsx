import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Project } from '../../types/project';
import { BarChart2, TrendingUp, DollarSign, Clock } from 'lucide-react';

interface KPIPageProps {
  project: Project;
}

export const KPIPage: React.FC<KPIPageProps> = ({ project }) => {
  const kpis = [
    {
      title: 'مؤشر أداء التكلفة',
      value: '0.95',
      trend: '+2.3%',
      status: 'warning',
      icon: DollarSign,
    },
    {
      title: 'مؤشر أداء الجدول',
      value: '1.02',
      trend: '+4.1%',
      status: 'success',
      icon: Clock,
    },
    {
      title: 'نسبة الإنجاز',
      value: '68%',
      trend: '+1.8%',
      status: 'success',
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          <FormattedMessage id="kpi.title" defaultMessage="مؤشرات الأداء" />
        </h2>
        <p className="text-gray-600 mb-6">
          المشروع: {project.name} (رقم {project.number})
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpis.map((kpi, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{kpi.title}</h3>
              <kpi.icon className="w-6 h-6 text-blue-500" />
            </div>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-gray-900">{kpi.value}</div>
              <div className={`text-sm ${
                kpi.status === 'success' ? 'text-green-600' : 'text-yellow-600'
              }`}>
                {kpi.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add more detailed KPI charts and metrics here */}
      </div>
    </div>
  );
};