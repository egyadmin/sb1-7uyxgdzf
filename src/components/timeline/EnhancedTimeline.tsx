```typescript
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDropzone } from 'react-dropzone';
import { Upload, Calendar, AlertCircle } from 'lucide-react';
import { GanttChart } from './GanttChart';
import { ActivityList } from './ActivityList';
import { parseXERFile } from '../../utils/xerParser';
import { TimelineData } from '../../types/timeline';

interface EnhancedTimelineProps {
  projectId: string;
}

export const EnhancedTimeline: React.FC<EnhancedTimelineProps> = ({ projectId }) => {
  const [timelineData, setTimelineData] = useState<TimelineData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'gantt' | 'list'>('gantt');

  const onDrop = React.useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      try {
        const data = await parseXERFile(file);
        setTimelineData(data);
        setError(null);
      } catch (err) {
        setError('Error parsing XER file. Please ensure it is a valid Primavera P6 export file.');
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/x-primavera': ['.xer'],
      'text/xml': ['.xml'],
    },
    maxFiles: 1,
  });

  return (
    <div className="space-y-6">
      {/* File Upload */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
      >
        <input {...getInputProps()} />
        <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <p className="text-lg text-gray-600 mb-2">
          {isDragActive ? 'أفلت الملف هنا' : 'اسحب وأفلت ملف الجدول الزمني هنا أو انقر للاختيار'}
        </p>
        <p className="text-sm text-gray-500">
          الصيغ المدعومة: XER (Primavera P6), XML
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      {timelineData && (
        <>
          {/* View Toggle */}
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setView('gantt')}
              className={`px-4 py-2 rounded-lg ${
                view === 'gantt'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Gantt Chart
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 rounded-lg ${
                view === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Activity List
            </button>
          </div>

          {/* Timeline View */}
          {view === 'gantt' ? (
            <GanttChart
              activities={timelineData.activities}
              criticalPath={timelineData.criticalPath}
            />
          ) : (
            <ActivityList
              activities={timelineData.activities}
              criticalPath={timelineData.criticalPath}
            />
          )}
        </>
      )}
    </div>
  );
};
```