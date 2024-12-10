import React from 'react';
import { FormattedDate, FormattedNumber } from 'react-intl';
import { Activity } from '../../../types/timeline';
import { formatCurrency } from '../../../utils/formatters';

interface TimelineTableRowProps {
  activity: Activity;
  isCritical: boolean;
}

export const TimelineTableRow: React.FC<TimelineTableRowProps> = ({ activity, isCritical }) => {
  const remainingDuration = activity.duration * (1 - activity.progress / 100);
  const rowClass = isCritical ? 'bg-red-50' : 
                  activity.progress === 100 ? 'bg-green-50' : 
                  activity.progress > 0 ? 'bg-yellow-50' : '';

  return (
    <tr className={rowClass}>
      <td className="border border-gray-400 p-1">{activity.id}</td>
      <td className="border border-gray-400 p-1">{activity.name}</td>
      <td className="border border-gray-400 p-1 text-center">{activity.duration}</td>
      <td className="border border-gray-400 p-1 text-center">{Math.ceil(remainingDuration)}</td>
      <td className="border border-gray-400 p-1">
        <FormattedDate value={activity.baselineStart || ''} year="numeric" month="short" day="numeric" />
      </td>
      <td className="border border-gray-400 p-1">
        <FormattedDate value={activity.baselineEnd || ''} year="numeric" month="short" day="numeric" />
      </td>
      <td className="border border-gray-400 p-1">
        <FormattedDate value={activity.startDate} year="numeric" month="short" day="numeric" />
      </td>
      <td className="border border-gray-400 p-1">
        <FormattedDate value={activity.endDate} year="numeric" month="short" day="numeric" />
      </td>
      <td className="border border-gray-400 p-1">
        <FormattedDate value={activity.startDate} year="numeric" month="short" day="numeric" />
      </td>
      <td className="border border-gray-400 p-1">
        <FormattedDate value={activity.endDate} year="numeric" month="short" day="numeric" />
      </td>
      <td className="border border-gray-400 p-1 text-center">{activity.freeFloat || 0}</td>
      <td className="border border-gray-400 p-1 text-center">{activity.totalFloat || 0}</td>
      <td className="border border-gray-400 p-1 text-center">
        <FormattedNumber value={activity.progress / 100} style="percent" maximumFractionDigits={2} />
      </td>
      <td className="border border-gray-400 p-1 text-center">
        <FormattedNumber value={activity.progress / 100} style="percent" maximumFractionDigits={2} />
      </td>
      <td className="border border-gray-400 p-1 text-right">{formatCurrency(activity.earnedValue || 0)}</td>
      <td className="border border-gray-400 p-1 text-right">{formatCurrency(activity.plannedValue || 0)}</td>
      <td className="border border-gray-400 p-1 text-right">{formatCurrency(activity.actualCost || 0)}</td>
    </tr>
  );
};