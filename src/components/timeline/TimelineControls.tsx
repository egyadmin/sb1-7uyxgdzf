import React from 'react';
import { FormattedMessage } from 'react-intl';
import { 
  Download, 
  Upload, 
  Printer,
  Filter,
  RefreshCw,
  GitCompare,
  Settings
} from 'lucide-react';

interface TimelineControlsProps {
  view: 'table';
  comparison: 'baseline' | 'current';
  onViewChange: (view: 'table') => void;
  onComparisonChange: (comparison: 'baseline' | 'current') => void;
  onExport: () => void;
  onPrint: () => void;
  onRefresh: () => void;
  onFilter: () => void;
}

export const TimelineControls: React.FC<TimelineControlsProps> = ({
  comparison,
  onComparisonChange,
  onExport,
  onPrint,
  onRefresh,
  onFilter,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex flex-wrap gap-4 justify-between">
        {/* Additional Controls */}
        <div className="flex gap-2">
          <button
            onClick={onFilter}
            className="flex items-center px-3 py-2 rounded-lg text-sm bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            <Filter className="w-4 h-4 ml-2" />
            تصفية
          </button>

          <button
            onClick={onRefresh}
            className="flex items-center px-3 py-2 rounded-lg text-sm bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            <RefreshCw className="w-4 h-4 ml-2" />
            تحديث
          </button>

          <button
            onClick={onExport}
            className="flex items-center px-3 py-2 rounded-lg text-sm bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            <Download className="w-4 h-4 ml-2" />
            تصدير
          </button>

          <button
            onClick={onPrint}
            className="flex items-center px-3 py-2 rounded-lg text-sm bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            <Printer className="w-4 h-4 ml-2" />
            طباعة
          </button>
        </div>

        {/* Comparison Control */}
        <div className="flex items-center gap-2">
          <GitCompare className="w-4 h-4 text-gray-500" />
          <select
            value={comparison}
            onChange={(e) => onComparisonChange(e.target.value as 'baseline' | 'current')}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="current">الجدول الحالي</option>
            <option value="baseline">الجدول المرجعي</option>
          </select>
        </div>

        {/* Settings Button */}
        <button
          className="flex items-center px-3 py-2 rounded-lg text-sm bg-gray-100 text-gray-600 hover:bg-gray-200"
        >
          <Settings className="w-4 h-4 ml-2" />
          إعدادات
        </button>
      </div>
    </div>
  );
};