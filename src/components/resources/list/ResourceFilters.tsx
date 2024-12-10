import React from 'react';
import { Search, Filter } from 'lucide-react';
import { FormattedMessage } from 'react-intl';

interface ResourceFiltersProps {
  filters: {
    category: string;
    status: string;
    search: string;
  };
  onFilterChange: (filters: any) => void;
}

export const ResourceFilters: React.FC<ResourceFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="relative">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
          placeholder="بحث عن المورد..."
          className="w-full border border-gray-300 rounded-lg py-2 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="relative">
        <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <select
          value={filters.category}
          onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
          className="w-full border border-gray-300 rounded-lg py-2 pr-12 appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">جميع الفئات</option>
          <option value="heavy-equipment">معدات ثقيلة</option>
          <option value="tools">معدات وأدوات</option>
          <option value="materials">مواد خام</option>
          <option value="labor">قوى عاملة</option>
        </select>
      </div>

      <div className="relative">
        <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <select
          value={filters.status}
          onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
          className="w-full border border-gray-300 rounded-lg py-2 pr-12 appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">جميع الحالات</option>
          <option value="active">نشط</option>
          <option value="maintenance">في الصيانة</option>
          <option value="inactive">غير نشط</option>
        </select>
      </div>
    </div>
  );
};