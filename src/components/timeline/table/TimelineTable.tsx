import React from 'react';
import { FormattedDate, FormattedNumber } from 'react-intl';
import { TimelineData } from '../../../types/timeline';
import { formatCurrency } from '../../../utils/formatters';
import { TimelineTableHeader } from './TimelineTableHeader';
import { TimelineTableRow } from './TimelineTableRow';

interface TimelineTableProps {
  data: TimelineData;
}

export const TimelineTable: React.FC<TimelineTableProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-400 text-xs">
          <TimelineTableHeader />
          <tbody>
            {data.activities.map(activity => (
              <TimelineTableRow 
                key={activity.id} 
                activity={activity}
                isCritical={data.criticalPath.includes(activity.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};