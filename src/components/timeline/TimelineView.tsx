import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Project } from '../../types/project';
import { TimelineUploader } from './TimelineUploader';
import { TimelineData } from '../../types/timeline';
import { TimelineHeader } from './TimelineHeader';
import { GanttChart } from './GanttChart';
import { ActivityList } from './ActivityList';

interface TimelineViewProps {
  project: Project;
}

export const TimelineView: React.FC<TimelineViewProps> = ({ project }) => {
  const [timelineData, setTimelineData] = useState<TimelineData | null>(null);
  const [view, setView] = useState<'gantt' | 'list'>('gantt');
  const [comparison, setComparison] = useState<'baseline' | 'current'>('current');

  const handleDataLoaded = (data: TimelineData) => {
    setTimelineData(data);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          <FormattedMessage id="timeline.title" />
        </h2>
        <p className="text-gray-600 mb-6">
          المشروع: {project.name} (رقم {project.number})
        </p>
      </div>

      {!timelineData ? (
        <TimelineUploader onDataLoaded={handleDataLoaded} />
      ) : (
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
      )}
    </div>
  );
};