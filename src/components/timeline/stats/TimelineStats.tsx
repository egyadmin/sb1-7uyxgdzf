import React from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { TimelineData } from '../../../types/timeline';
import { formatCurrency } from '../../../utils/formatters';

interface TimelineStatsProps {
  data: TimelineData;
}

export const TimelineStats: React.FC<TimelineStatsProps> = ({ data }) => {
  const totalActivities = data.activities.length;
  const completedActivities = data.activities.filter(a => a.progress === 100).length;
  const inProgressActivities = data.activities.filter(a => a.progress > 0 && a.progress < 100).length;
  const criticalActivities = data.activities.filter(a => a.critical).length;

  const totalPlannedValue = data.activities.reduce((sum, a) => sum + (a.plannedValue || 0), 0);
  const totalEarnedValue = data.activities.reduce((sum, a) => sum + (a.earnedValue || 0), 0);
  const totalActualCost = data.activities.reduce((sum, a) => sum + (a.actualCost || 0), 0);

  const cpi = totalActualCost > 0 ? totalEarnedValue / totalActualCost : 0;
  const spi = totalPlannedValue > 0 ? totalEarnedValue / totalPlannedValue : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Activity Statistics */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">إحصائيات الأنشطة</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">إجمالي الأنشطة:</span>
            <span className="font-semibold">{totalActivities}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">الأنشطة المكتملة:</span>
            <span className="font-semibold text-green-600">{completedActivities}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">الأنشطة الجارية:</span>
            <span className="font-semibold text-blue-600">{inProgressActivities}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">أنشطة المسار الحرج:</span>
            <span className="font-semibold text-red-600">{criticalActivities}</span>
          </div>
        </div>
      </div>

      {/* Performance Indices */}
      <div className="bg-purple-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-purple-900 mb-4">مؤشرات الأداء</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">مؤشر أداء التكلفة:</span>
            <span className="font-semibold">
              <FormattedNumber 
                value={cpi} 
                minimumFractionDigits={2}
                maximumFractionDigits={2}
              />
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">مؤشر أداء الجدول:</span>
            <span className="font-semibold">
              <FormattedNumber 
                value={spi}
                minimumFractionDigits={2}
                maximumFractionDigits={2}
              />
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">نسبة الإنجاز:</span>
            <span className="font-semibold">
              <FormattedNumber 
                value={totalEarnedValue / totalPlannedValue}
                style="percent"
                minimumFractionDigits={1}
                maximumFractionDigits={1}
              />
            </span>
          </div>
        </div>
      </div>

      {/* Cost Analysis */}
      <div className="bg-green-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-green-900 mb-4">تحليل التكاليف</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">القيمة المخططة:</span>
            <span className="font-semibold">{formatCurrency(totalPlannedValue)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">القيمة المكتسبة:</span>
            <span className="font-semibold">{formatCurrency(totalEarnedValue)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">التكلفة الفعلية:</span>
            <span className="font-semibold">{formatCurrency(totalActualCost)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">الانحراف في التكلفة:</span>
            <span className={`font-semibold ${totalEarnedValue - totalActualCost >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(totalEarnedValue - totalActualCost)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};