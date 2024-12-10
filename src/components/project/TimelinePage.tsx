import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Project } from '../../types/project';
import { TimelineHeader } from '../timeline/TimelineHeader';
import { TimelineParser } from '../timeline/TimelineParser';
import { GanttChart } from '../timeline/GanttChart';
import { ActivityList } from '../timeline/ActivityList';
import { TimelineData } from '../../types/timeline';

interface TimelinePageProps {
  project: Project;
}

export const TimelinePage: React.FC<TimelinePageProps> = ({ project }) => {
  const [timelineData, setTimelineData] = useState<TimelineData | null>(null);
  const [view, setView] = useState<'gantt' | 'list'>('gantt');
  const [comparison, setComparison] = useState<'baseline' | 'current'>('current');

  const handleDataParsed = (data: TimelineData) => {
    setTimelineData(data);
  };

  return (
    <div className="space-y-6">
      {timelineData ? (
        <>
          <TimelineHeader
            data={timelineData}
            view={view}
            comparison={comparison}
            onViewChange={setView}
            onComparisonChange={setComparison}
          />
          {view === 'gantt' ? (
            <GanttChart data={timelineData} comparison={comparison} />
          ) : (
            <ActivityList data={timelineData} comparison={comparison} />
          )}
        </>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            <FormattedMessage id="timeline.title" defaultMessage="Project Timeline" />
          </h2>
          <TimelineParser onDataParsed={handleDataParsed} />
        </div>
      )}
    </div>
  );
};