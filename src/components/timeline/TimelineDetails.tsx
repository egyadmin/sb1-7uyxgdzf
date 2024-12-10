```typescript
import React from 'react';
import { FormattedMessage, FormattedDate } from 'react-intl';
import { Activity } from '../../types/timeline';
import { Clock, AlertCircle, CheckCircle2 } from 'lucide-react';

interface TimelineDetailsProps {
  activity: Activity;
  showBaseline?: boolean;
}

export const TimelineDetails: React.FC<TimelineDetailsProps> = ({ 
  activity,
  showBaseline = false 
}) => {
  const getStatusIcon = () => {
    switch (activity.status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'inProgress':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'delayed':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = () => {
    switch (activity.status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'inProgress':
        return 'bg-blue-100 text-blue-800';
      case 'delayed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {getStatusIcon()}
          <h3 className="text-lg font-medium">{activity.name}</h3>
          {activity.critical && (
            <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
              المسار الحرج
            </span>
          )}
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor()}`}>
          {activity.status === 'completed' && 'مكتمل'}
          {activity.status === 'inProgress' && 'قيد التنفيذ'}
          {activity.status === 'delayed' && 'متأخر'}
          {activity.status === 'planned' && 'مخطط'}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">تاريخ البداية</p>
          <p className="font-medium">
            <FormattedDate 
              value={showBaseline && activity.baselineStartDate 
                ? activity.baselineStartDate 
                : activity.startDate}
              year="numeric"
              month="short"
              day="numeric"
            />
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">تاريخ النهاية</p>
          <p className="font-medium">
            <FormattedDate 
              value={showBaseline && activity.baselineEndDate
                ? activity.baselineEndDate
                : activity.endDate}
              year="numeric"
              month="short"
              day="numeric"
            />
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">المدة</p>
          <p className="font-medium">{activity.duration} يوم</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">نسبة الإنجاز</p>
          <p className="font-medium">
            {showBaseline 
              ? activity.baselineProgress || 0
              : activity.progress}%
          </p>
        </div>
      </div>

      {activity.dependencies.length > 0 && (
        <div>
          <p className="text-sm text-gray-500 mb-2">الأنشطة السابقة</p>
          <div className="flex flex-wrap gap-2">
            {activity.dependencies.map(depId => (
              <span 
                key={depId}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
              >
                {depId}
              </span>
            ))}
          </div>
        </div>
      )}

      {activity.notes && (
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-1">ملاحظات</p>
          <p className="text-sm text-gray-700">{activity.notes}</p>
        </div>
      )}
    </div>
  );
};
```