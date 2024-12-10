import React from 'react';
import { FormattedDate } from 'react-intl';
import { formatCurrency } from '../../../utils/formatters';

interface ResourceTableProps {
  filters: {
    category: string;
    status: string;
    search: string;
  };
}

export const ResourceTable: React.FC<ResourceTableProps> = ({ filters }) => {
  // Calculate working hours considering Friday as weekend
  const calculateWorkingHours = (baseHours: number) => {
    const dailyHours = baseHours;
    const weeklyHours = dailyHours * 6; // Excluding Friday
    const monthlyHours = weeklyHours * 4.33; // Average weeks per month
    return { dailyHours, weeklyHours, monthlyHours };
  };

  const resources = [
    {
      id: 'EQ001',
      name: 'حفار كاتربيلر 320',
      category: 'معدات ثقيلة',
      status: 'نشط',
      utilization: 85,
      cost: 1200,
      lastMaintenance: '2024-02-15',
      nextMaintenance: '2024-03-15',
      workingHours: calculateWorkingHours(10),
    },
    {
      id: 'EQ002',
      name: 'لودر كوماتسو WA470',
      category: 'معدات ثقيلة',
      status: 'نشط',
      utilization: 90,
      cost: 1500,
      lastMaintenance: '2024-02-10',
      nextMaintenance: '2024-03-10',
      workingHours: calculateWorkingHours(12),
    },
    {
      id: 'EQ003',
      name: 'شاحنة قلاب فولفو FMX',
      category: 'معدات ثقيلة',
      status: 'صيانة',
      utilization: 0,
      cost: 800,
      lastMaintenance: '2024-02-20',
      nextMaintenance: '2024-03-20',
      workingHours: calculateWorkingHours(8),
    },
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = !filters.category || resource.category === filters.category;
    const matchesStatus = !filters.status || resource.status === filters.status;
    const matchesSearch = !filters.search || 
      resource.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      resource.id.toLowerCase().includes(filters.search.toLowerCase());
    
    return matchesCategory && matchesStatus && matchesSearch;
  });

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              الكود
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              الاسم
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              الفئة
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              الحالة
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              ساعات العمل اليومية
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              ساعات العمل الأسبوعية
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              ساعات العمل الشهرية
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              نسبة الاستخدام
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              التكلفة اليومية
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              آخر صيانة
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              الصيانة القادمة
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredResources.map((resource) => (
            <tr key={resource.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {resource.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {resource.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {resource.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  resource.status === 'نشط' ? 'bg-green-100 text-green-800' :
                  resource.status === 'صيانة' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {resource.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {resource.workingHours.dailyHours} ساعة
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {resource.workingHours.weeklyHours} ساعة
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {resource.workingHours.monthlyHours} ساعة
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${
                        resource.utilization >= 90 ? 'bg-green-600' :
                        resource.utilization >= 70 ? 'bg-blue-600' :
                        resource.utilization >= 50 ? 'bg-yellow-600' :
                        'bg-red-600'
                      }`}
                      style={{ width: `${resource.utilization}%` }}
                    ></div>
                  </div>
                  <span className="mr-2">{resource.utilization}%</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatCurrency(resource.cost)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <FormattedDate
                  value={resource.lastMaintenance}
                  year="numeric"
                  month="short"
                  day="numeric"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <FormattedDate
                  value={resource.nextMaintenance}
                  year="numeric"
                  month="short"
                  day="numeric"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};