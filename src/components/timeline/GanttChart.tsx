import React from 'react';
import { Group } from '@visx/group';
import { scaleTime, scaleLinear } from '@visx/scale';
import { ParentSize } from '@visx/responsive';
import { addDays, parseISO, format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { TimelineData } from '../../types/timeline';

interface GanttChartProps {
  data: TimelineData;
  comparison: 'baseline' | 'current';
}

export const GanttChart: React.FC<GanttChartProps> = ({ data, comparison }) => {
  const InnerChart = ({ width, height }: { width: number; height: number }) => {
    // Find date range
    const startDate = Math.min(
      ...data.activities.map(a => parseISO(a.startDate).getTime())
    );
    const endDate = Math.max(
      ...data.activities.map(a => parseISO(a.endDate).getTime())
    );

    // Create scales
    const xScale = scaleTime({
      domain: [new Date(startDate), new Date(endDate)],
      range: [100, width - 20],
    });

    const yScale = scaleLinear({
      domain: [0, data.activities.length],
      range: [50, height - 50],
    });

    const barHeight = 20;
    const barPadding = 5;

    return (
      <svg width={width} height={height} dir="rtl">
        <Group>
          {/* Time axis */}
          <line
            x1={100}
            y1={height - 30}
            x2={width - 20}
            y2={height - 30}
            stroke="#ccc"
          />

          {/* Time labels */}
          {xScale.ticks(10).map((date, i) => (
            <g key={i} transform={`translate(${xScale(date)}, ${height - 30})`}>
              <line y2={5} stroke="#ccc" />
              <text
                y={20}
                textAnchor="middle"
                fontSize={12}
                fill="#666"
              >
                {format(date, 'MMM d', { locale: ar })}
              </text>
            </g>
          ))}

          {/* Activities */}
          {data.activities.map((activity, index) => {
            const startX = xScale(parseISO(activity.startDate));
            const endX = xScale(parseISO(activity.endDate));
            const y = yScale(index);

            return (
              <g key={activity.id}>
                {/* Activity bar */}
                <rect
                  x={startX}
                  y={y}
                  width={endX - startX}
                  height={barHeight}
                  fill={activity.critical ? '#fee2e2' : '#dbeafe'}
                  stroke={activity.critical ? '#ef4444' : '#3b82f6'}
                  rx={4}
                />

                {/* Progress bar */}
                <rect
                  x={startX}
                  y={y}
                  width={(endX - startX) * (activity.progress / 100)}
                  height={barHeight}
                  fill="rgba(0,0,0,0.2)"
                  rx={4}
                />

                {/* Activity name */}
                <text
                  x={startX - 5}
                  y={y + barHeight / 2}
                  textAnchor="end"
                  dominantBaseline="middle"
                  fontSize={12}
                  fill="#374151"
                >
                  {activity.name}
                </text>
              </g>
            );
          })}
        </Group>
      </svg>
    );
  };

  return (
    <div className="h-[600px] w-full">
      <ParentSize>
        {({ width, height }) => <InnerChart width={width} height={height} />}
      </ParentSize>
    </div>
  );
};