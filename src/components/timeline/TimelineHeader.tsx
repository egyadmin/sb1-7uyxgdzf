import React from 'react';
import { FormattedMessage, FormattedDate } from 'react-intl';
import { Calendar, BarChart2, GitCompare } from 'lucide-react';
import { TimelineData } from '../../types/timeline';

interface TimelineHeaderProps {
  data: TimelineData;
  view: 'gantt' | 'list';
  comparison: 'baseline' | 'current';
  onViewChange: (view: 'gantt' | 'list') => void;
  onComparisonChange: (comparison: 'baseline' | 'current') => void;
}

export const TimelineHeader: React.FC<TimelineHeaderProps> = ({
  data,
  view,
  comparison,
  onViewChange,
  onComparisonChange,
}) => {
  const totalActivities = data.activities.length;
  const completedActivities = data.activities.filter(a => a.progress === 100).length;
  const criticalActivities = data.activities.filter(a => a.critical).length;
  const inProgressActivities = data.activities.filter(a => a.progress > 0 && a.progress < 100).length;

  const plannedProgress = data.activities.reduce((sum, a) => sum + (a.baselineProgress || 0), 0) / totalActivities;
  const actualProgress = data.activities.reduce((sum, a) => sum + a.progress, 0) / totalActivities;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{data.projectName}</h2>
          <p className="text-gray-600 mt-1">{data.projectCode}</p>
        </div>
        
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Calendar className="w-5 h-5 text-gray-500" />
            <span className="text-gray-600">
              <FormattedDate 
                value={data.dataDate || new Date()}
                year="numeric"
                month="long"
                day="numeric"
              />
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm text-gray-600 mb-1">إجمالي الأنشطة</h3>
          <p className="text-2xl font-bold text-blue-600">{totalActivities}</p>
          <div className="mt-2 text-sm">
            <p className="text-green-600">مكتمل: {completedActivities}</p>
            <p className="text-blue-600">قيد التنفيذ: {inProgressActivities}</p>
          </div>
        </div>

        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="text-sm text-gray-600 mb-1">المسار الحرج</h3>
          <p className="text-2xl font-bold text-red-600">{criticalActivities}</p>
          <p className="mt-2 text-sm text-red-600">
            {((criticalActivities / totalActivities) * 100).toFixed(1)}% من الأنشطة
          </p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm text-gray-600 mb-1">نسبة الإنجاز</h3>
          <p className="text-2xl font-bold text-green-600">
            {(actualProgress).toFixed(1)}%
          </p>
          <p className="mt-2 text-sm text-green-600">
            المخطط: {(plannedProgress).toFixed(1)}%
          </p>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-sm text-gray-600 mb-1">الانحراف</h3>
          <p className="text-2xl font-bold text-purple-600">
            {(actualProgress - plannedProgress).toFixed(1)}%
          </p>
          <p className="mt-2 text-sm text-purple-600">
            عن الخطة الأساسية
          </p>
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex space-x-2 rtl:space-x-reverse">
          <button
            onClick={() => onViewChange('gantt')}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 rtl:space-x-reverse transition-colors ${
              view === 'gantt'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <BarChart2 className="w-5 h-5" />
            <span>مخطط جانت</span>
          </button>
          
          <button
            onClick={() => onViewChange('list')}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 rtl:space-x-reverse transition-colors ${
              view === 'list'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>قائمة الأنشطة</span>
          </button>
        </div>

        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <GitCompare className="w-5 h-5 text-gray-500" />
          <select
            value={comparison}
            onChange={(e) => onComparisonChange(e.target.value as 'baseline' | 'current')}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="current">الجدول الحالي</option>
            <option value="baseline">الجدول المرجعي</option>
          </select>
        </div>
      </div>
    </div>
  );
};