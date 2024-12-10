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

interface ProjectCostChartProps {
  projects: Project[];
}

export const ProjectCostChart: React.FC<ProjectCostChartProps> = ({ projects }) => {
  const data = projects.map(project => ({
    name: project.name.length > 30 ? project.name.substring(0, 30) + '...' : project.name,
    budget: project.budget,
    actual: project.actualCosts,
    variance: project.budget - project.actualCosts,
  }));

  const colors = {
    budget: '#3B82F6',    // Blue
    actual: '#10B981',    // Green
    variance: '#8B5CF6',  // Purple
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-6 text-gray-800">
        <FormattedMessage id="dashboard.costComparison" />
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
              tickFormatter={(value) => formatCurrency(value)}
              tick={{ fill: '#4B5563', fontSize: 12 }}
            />
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              labelStyle={{ color: '#374151' }}
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Legend 
              verticalAlign="top"
              height={36}
              formatter={(value) => {
                const translations = {
                  budget: 'الميزانية',
                  actual: 'التكلفة الفعلية',
                  variance: 'الفرق'
                };
                return translations[value as keyof typeof translations];
              }}
            />
            <Bar 
              dataKey="budget" 
              fill={colors.budget}
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
            />
            <Bar 
              dataKey="actual" 
              fill={colors.actual}
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
            />
            <Bar 
              dataKey="variance" 
              fill={colors.variance}
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};