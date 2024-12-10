import React from 'react';
import { FormattedMessage, FormattedDate } from 'react-intl';
import { Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { TimelineData } from '../../types/timeline';

interface ActivityListProps {
  data: TimelineData;
  comparison: 'baseline' | 'current';
}

export const ActivityList: React.FC<ActivityListProps> = ({ data, comparison }) => {
  const getStatusIcon = (progress: number) => {
    if (progress === 100) return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    if (progress > 0) return <Clock className="w-4 h-4 text-blue-500" />;
    return <AlertCircle className="w-4 h-4 text-gray-500" />;
  };

  const getStatusText = (progress: number) => {
    if (progress === 100) return 'مكتمل';
    if (progress > 0) return 'قيد التنفيذ';
    return 'لم يبدأ';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold">
          {comparison === 'baseline' ? 'الجدول المرجعي' : 'الجدول الحالي'}
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                النشاط
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                تاريخ البداية
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                تاريخ النهاية
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                نسبة الإنجاز
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                الحالة
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.activities.map((activity) => (
              <tr 
                key={activity.id}
                className={`${activity.critical ? 'bg-red-50' : ''} hover:bg-gray-50`}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900">{activity.name}</span>
                    {activity.critical && (
                      <span className="mr-2 px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                        المسار الحرج
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <FormattedDate
                    value={comparison === 'baseline' ? activity.baselineStart : activity.startDate}
                    year="numeric"
                    month="long"
                    day="numeric"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <FormattedDate
                    value={comparison === 'baseline' ? activity.baselineEnd : activity.endDate}
                    year="numeric"
                    month="long"
                    day="numeric"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 mr-4">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${activity.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500">{activity.progress}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getStatusIcon(activity.progress)}
                    <span className="mr-2 text-sm text-gray-500">
                      {getStatusText(activity.progress)}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};