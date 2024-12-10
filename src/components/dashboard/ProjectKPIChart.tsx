import React from 'react';
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { Project } from '../../types/project';

interface ProjectKPIChartProps {
  projects: Project[];
}

export const ProjectKPIChart: React.FC<ProjectKPIChartProps> = ({ projects }) => {
  // Calculate KPIs
  const activeProjects = projects.filter(p => p.status === 'active');
  const totalBudget = activeProjects.reduce((sum, p) => sum + p.budget, 0);
  const totalActual = activeProjects.reduce((sum, p) => sum + p.actualCosts, 0);
  
  // Calculate performance metrics
  const costPerformance = Math.min(100, (totalBudget / (totalActual || 1)) * 100);
  const schedulePerformance = Math.min(100, 85); // Mock data - should be calculated from timeline
  const qualityPerformance = Math.min(100, 90); // Mock data
  const safetyPerformance = Math.min(100, 95); // Mock data

  const data = [
    {
      name: 'أداء التكلفة',
      value: costPerformance,
      fill: '#3B82F6',
    },
    {
      name: 'أداء الجدول الزمني',
      value: schedulePerformance,
      fill: '#10B981',
    },
    {
      name: 'مؤشر الجودة',
      value: qualityPerformance,
      fill: '#8B5CF6',
    },
    {
      name: 'مؤشر السلامة',
      value: safetyPerformance,
      fill: '#F59E0B',
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-6 text-gray-800">
        مؤشرات الأداء للمشاريع النشطة
      </h3>
      <div className="h-[300px]" dir="ltr">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="20%"
            outerRadius="90%"
            barSize={20}
            data={data}
            startAngle={180}
            endAngle={-180}
          >
            <RadialBar
              label={{ fill: '#666', position: 'insideStart' }}
              background
              dataKey="value"
              cornerRadius={10}
            />
            <Legend
              iconSize={10}
              layout="vertical"
              verticalAlign="middle"
              align="right"
              wrapperStyle={{
                paddingLeft: '10px',
                fontFamily: 'inherit',
              }}
            />
            <Tooltip
              formatter={(value: number) => `${value.toFixed(1)}%`}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>

      {/* KPI Details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {data.map((kpi) => (
          <div key={kpi.name} className="text-center">
            <div 
              className="inline-block w-16 h-16 rounded-full mb-2"
              style={{
                background: `conic-gradient(${kpi.fill} ${kpi.value}%, #f3f4f6 0)`,
              }}
            >
              <div className="w-14 h-14 rounded-full bg-white m-1 flex items-center justify-center">
                <span className="text-sm font-semibold">{kpi.value.toFixed(1)}%</span>
              </div>
            </div>
            <p className="text-sm text-gray-600">{kpi.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};