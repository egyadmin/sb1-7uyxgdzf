import React from 'react';
import { FormattedDate, FormattedNumber } from 'react-intl';
import { TimelineData } from '../../types/timeline';
import { formatCurrency } from '../../utils/formatters';

interface TimelineTableProps {
  data: TimelineData;
}

export const TimelineTable: React.FC<TimelineTableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-400 text-xs">
        <thead className="bg-gray-50">
          <tr>
            <th className="border border-gray-400 p-1 whitespace-nowrap">رقم النشاط</th>
            <th className="border border-gray-400 p-1 whitespace-nowrap">اسم النشاط</th>
            <th className="border border-gray-400 p-1 whitespace-nowrap">المدة الأصلية</th>
            <th className="border border-gray-400 p-1 whitespace-nowrap">المدة المتبقية</th>
            <th className="border border-gray-400 p-1 whitespace-nowrap">البداية المخططة</th>
            <th className="border border-gray-400 p-1 whitespace-nowrap">النهاية المخططة</th>
            <th className="border border-gray-400 p-1 whitespace-nowrap">البداية المبكرة</th>
            <th className="border border-gray-400 p-1 whitespace-nowrap">النهاية المبكرة</th>
            <th className="border border-gray-400 p-1 whitespace-nowrap">البداية المتأخرة</th>
            <th className="border border-gray-400 p-1 whitespace-nowrap">النهاية المتأخرة</th>
            <th className="border border-gray-400 p-1 whitespace-nowrap">الفائض الحر</th>
            <th className="border border-gray-400 p-1 whitespace-nowrap">الفائض الكلي</th>
            <th className="border border-gray-400 p-1 whitespace-nowrap">نسبة الإنجاز</th>
            <th className="border border-gray-400 p-1 whitespace-nowrap">نسبة الأداء</th>
            <th className="border border-gray-400 p-1 whitespace-nowrap">القيمة المكتسبة</th>
            <th className="border border-gray-400 p-1 whitespace-nowrap">القيمة المخططة</th>
            <th className="border border-gray-400 p-1 whitespace-nowrap">التكلفة الفعلية</th>
          </tr>
        </thead>
        <tbody>
          {data.activities.map((activity) => {
            const remainingDuration = activity.duration * (1 - activity.progress / 100);
            const rowClass = activity.critical ? 'bg-red-50' : 
                           activity.progress === 100 ? 'bg-green-50' : 
                           activity.progress > 0 ? 'bg-yellow-50' : '';

            return (
              <tr key={activity.id} className={rowClass}>
                <td className="border border-gray-400 p-1">{activity.id}</td>
                <td className="border border-gray-400 p-1">{activity.name}</td>
                <td className="border border-gray-400 p-1 text-center">
                  {activity.duration}
                </td>
                <td className="border border-gray-400 p-1 text-center">
                  {Math.ceil(remainingDuration)}
                </td>
                <td className="border border-gray-400 p-1">
                  <FormattedDate
                    value={activity.baselineStart}
                    year="numeric"
                    month="short"
                    day="numeric"
                  />
                </td>
                <td className="border border-gray-400 p-1">
                  <FormattedDate
                    value={activity.baselineEnd}
                    year="numeric"
                    month="short"
                    day="numeric"
                  />
                </td>
                <td className="border border-gray-400 p-1">
                  <FormattedDate
                    value={activity.startDate}
                    year="numeric"
                    month="short"
                    day="numeric"
                  />
                </td>
                <td className="border border-gray-400 p-1">
                  <FormattedDate
                    value={activity.endDate}
                    year="numeric"
                    month="short"
                    day="numeric"
                  />
                </td>
                <td className="border border-gray-400 p-1">
                  <FormattedDate
                    value={activity.startDate}
                    year="numeric"
                    month="short"
                    day="numeric"
                  />
                </td>
                <td className="border border-gray-400 p-1">
                  <FormattedDate
                    value={activity.endDate}
                    year="numeric"
                    month="short"
                    day="numeric"
                  />
                </td>
                <td className="border border-gray-400 p-1 text-center">
                  {activity.freeFloat || 0}
                </td>
                <td className="border border-gray-400 p-1 text-center">
                  {activity.totalFloat || 0}
                </td>
                <td className="border border-gray-400 p-1 text-center">
                  <FormattedNumber 
                    value={activity.progress / 100}
                    style="percent"
                    maximumFractionDigits={2}
                  />
                </td>
                <td className="border border-gray-400 p-1 text-center">
                  <FormattedNumber 
                    value={activity.progress / 100}
                    style="percent"
                    maximumFractionDigits={2}
                  />
                </td>
                <td className="border border-gray-400 p-1 text-right">
                  {formatCurrency(activity.earnedValue || 0)}
                </td>
                <td className="border border-gray-400 p-1 text-right">
                  {formatCurrency(activity.plannedValue || 0)}
                </td>
                <td className="border border-gray-400 p-1 text-right">
                  {formatCurrency(activity.actualCost || 0)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};