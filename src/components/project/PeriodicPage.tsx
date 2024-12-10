import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Project } from '../../types/project';
import { Calendar, FileText, CheckCircle, AlertCircle } from 'lucide-react';

interface PeriodicPageProps {
  project: Project;
}

export const PeriodicPage: React.FC<PeriodicPageProps> = ({ project }) => {
  const reports = [
    {
      id: 1,
      type: 'يومي',
      date: '2024-03-15',
      status: 'completed',
      submittedBy: 'أحمد محمد',
    },
    {
      id: 2,
      type: 'أسبوعي',
      date: '2024-03-14',
      status: 'pending',
      submittedBy: 'محمد علي',
    },
    {
      id: 3,
      type: 'شهري',
      date: '2024-03-01',
      status: 'completed',
      submittedBy: 'خالد عبدالله',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          <FormattedMessage id="periodic.title" defaultMessage="البيانات الدورية" />
        </h2>
        <p className="text-gray-600 mb-6">
          المشروع: {project.name} (رقم {project.number})
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">التقارير اليومية</h3>
            <Calendar className="w-6 h-6 text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-blue-600">15</div>
          <p className="text-sm text-gray-500 mt-2">آخر 30 يوم</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">التقارير الأسبوعية</h3>
            <Calendar className="w-6 h-6 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-green-600">4</div>
          <p className="text-sm text-gray-500 mt-2">آخر شهر</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">التقارير الشهرية</h3>
            <Calendar className="w-6 h-6 text-purple-500" />
          </div>
          <div className="text-3xl font-bold text-purple-600">12</div>
          <p className="text-sm text-gray-500 mt-2">آخر سنة</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold">آخر التقارير</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">نوع التقرير</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">التاريخ</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">تم الرفع بواسطة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.map((report) => (
                <tr key={report.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-gray-400 ml-2" />
                      <span className="text-sm font-medium text-gray-900">{report.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.submittedBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {report.status === 'completed' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="w-4 h-4 ml-1" />
                        مكتمل
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <AlertCircle className="w-4 h-4 ml-1" />
                        قيد المراجعة
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900">عرض التقرير</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};