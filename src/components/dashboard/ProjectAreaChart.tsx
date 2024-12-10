import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Project } from '../../types/project';
import { formatCurrency } from '../../utils/formatters';

interface ProjectAreaChartProps {
  projects: Project[];
}

export const ProjectAreaChart: React.FC<ProjectAreaChartProps> = ({ projects }) => {
  const areaData = projects.reduce((acc, project) => {
    if (!acc[project.area]) {
      acc[project.area] = {
        name: project.area,
        budget: 0,
        actual: 0,
        count: 0
      };
    }
    acc[project.area].budget += project.budget;
    acc[project.area].actual += project.actualCosts;
    acc[project.area].count += 1;
    return acc;
  }, {} as Record<string, any>);

  const data = Object.values(areaData);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-6 text-gray-800">
        توزيع المشاريع حسب المنطقة
      </h3>
      <div className="h-[400px]" dir="ltr">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="name" 
              angle={-45} 
              textAnchor="end" 
              height={100}
              tick={{ fill: '#4B5563', fontSize: 12 }}
            />
            <YAxis 
              yAxisId="left"
              tickFormatter={(value) => formatCurrency(value)}
              tick={{ fill: '#4B5563', fontSize: 12 }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              tickFormatter={(value) => `${value} مشروع`}
              tick={{ fill: '#4B5563', fontSize: 12 }}
            />
            <Tooltip
              formatter={(value: any, name: string) => {
                if (name === 'count') return `${value} مشروع`;
                return formatCurrency(value);
              }}
              labelStyle={{ color: '#374151' }}
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Legend />
            <Bar 
              yAxisId="left"
              dataKey="budget" 
              name="الميزانية"
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              yAxisId="left"
              dataKey="actual" 
              name="التكلفة الفعلية"
              fill="#10B981"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              yAxisId="right"
              dataKey="count" 
              name="عدد المشاريع"
              fill="#8B5CF6"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};