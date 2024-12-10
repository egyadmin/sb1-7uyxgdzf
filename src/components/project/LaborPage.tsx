import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Project } from '../../types/project';
import { Users, UserCheck, UserX, Clock } from 'lucide-react';

interface LaborPageProps {
  project: Project;
}

export const LaborPage: React.FC<LaborPageProps> = ({ project }) => {
  const laborStats = {
    totalWorkers: 245,
    presentToday: 228,
    absent: 17,
    overtime: 45,
    categories: [
      { name: 'عمال', count: 150, present: 140 },
      { name: 'فنيين', count: 60, present: 55 },
      { name: 'مهندسين', count: 25, present: 24 },
      { name: 'إداريين', count: 10, present: 9 },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          <FormattedMessage id="labor.title" defaultMessage="القوى العاملة" />
        </h2>
        <p className="text-gray-600 mb-6">
          المشروع: {project.name} (رقم {project.number})
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-blue-900">إجمالي العمالة</h3>
            <Users className="w-6 h-6 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-blue-600">{laborStats.totalWorkers}</p>
        </div>

        <div className="bg-green-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-green-900">الحضور اليوم</h3>
            <UserCheck className="w-6 h-6 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-green-600">{laborStats.presentToday}</p>
        </div>

        <div className="bg-red-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-red-900">الغياب</h3>
            <UserX className="w-6 h-6 text-red-500" />
          </div>
          <p className="text-3xl font-bold text-red-600">{laborStats.absent}</p>
        </div>

        <div className="bg-purple-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-purple-900">العمل الإضافي</h3>
            <Clock className="w-6 h-6 text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-purple-600">{laborStats.overtime}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-6">توزيع القوى العاملة</h3>
        <div className="space-y-6">
          {laborStats.categories.map((category, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>{category.name}</span>
                <span>{category.present} / {category.count}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${(category.present / category.count) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};