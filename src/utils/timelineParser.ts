import { TimelineData, Activity } from '../types/timeline';
import { parseXERFile } from './xerParser';
import { parseMPPFile } from './mppParser';

export async function parseTimelineFile(file: File): Promise<TimelineData> {
  const extension = file.name.split('.').pop()?.toLowerCase();

  try {
    switch (extension) {
      case 'xer':
        return await parseXERFile(file);
      case 'mpp':
        return await parseMPPFile(file);
      default:
        throw new Error('صيغة الملف غير مدعومة. يرجى استخدام ملفات XER أو MPP');
    }
  } catch (error) {
    console.error('Error parsing timeline file:', error);
    throw new Error(error instanceof Error ? error.message : 'فشل في معالجة الملف');
  }
}

export function processTimelineData(data: TimelineData): TimelineData {
  // Add additional processing if needed
  return {
    ...data,
    activities: data.activities.map(activity => ({
      ...activity,
      // Add any additional activity processing
      progress: Math.min(100, Math.max(0, activity.progress)),
      status: determineActivityStatus(activity),
    })),
  };
}

function determineActivityStatus(activity: Activity): Activity['status'] {
  if (activity.progress === 100) return 'completed';
  if (activity.progress > 0) return 'inProgress';
  if (isDelayed(activity)) return 'delayed';
  return 'planned';
}

function isDelayed(activity: Activity): boolean {
  const today = new Date();
  const startDate = new Date(activity.startDate);
  return today > startDate && activity.progress === 0;
}