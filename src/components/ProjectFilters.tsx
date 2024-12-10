import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Search, Filter } from 'lucide-react';
import { ProjectFilters as FilterType } from '../types/project';

interface ProjectFiltersProps {
  filters: FilterType;
  onFilterChange: (filters: FilterType) => void;
  areas: string[];
}

export const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  filters,
  onFilterChange,
  areas,
}) => {
  const { locale } = useIntl();
  const isRTL = locale === 'ar';

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search Input */}
        <div className="relative">
          <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5`} />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            placeholder={locale === 'ar' ? "البحث عن المشروع..." : "Search projects..."}
            className={`w-full border border-gray-300 rounded-lg py-2 ${
              isRTL ? 'pr-12' : 'pl-12'
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
        </div>

        {/* Area Filter */}
        <div className="relative">
          <Filter className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5`} />
          <select
            value={filters.area}
            onChange={(e) => onFilterChange({ ...filters, area: e.target.value })}
            className={`w-full border border-gray-300 rounded-lg py-2 ${
              isRTL ? 'pr-12' : 'pl-12'
            } appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          >
            <option value="">
              {locale === 'ar' ? 'جميع المناطق' : 'All Areas'}
            </option>
            {areas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="relative">
          <Filter className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5`} />
          <select
            value={filters.status}
            onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
            className={`w-full border border-gray-300 rounded-lg py-2 ${
              isRTL ? 'pr-12' : 'pl-12'
            } appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          >
            <option value="">
              {locale === 'ar' ? 'جميع الحالات' : 'All Statuses'}
            </option>
            <option value="active">
              {locale === 'ar' ? 'نشط' : 'Active'}
            </option>
            <option value="completed">
              {locale === 'ar' ? 'مكتمل' : 'Completed'}
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};