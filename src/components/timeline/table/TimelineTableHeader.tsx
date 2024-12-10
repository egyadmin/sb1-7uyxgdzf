import React from 'react';
import { FormattedMessage } from 'react-intl';

export const TimelineTableHeader: React.FC = () => (
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
);