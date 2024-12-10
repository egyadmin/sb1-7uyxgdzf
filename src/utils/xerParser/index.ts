import { TimelineData } from '../../types/timeline';
import { parseTables } from './tableParser';
import { parseActivities } from './activityParser';
import { parseProjectInfo } from './projectParser';
import { XERParseResult } from './types';

export async function parseXERFile(file: File): Promise<TimelineData> {
  try {
    const text = await file.text();
    const parseResult = parseTables(text);

    if (!parseResult.success || !parseResult.data) {
      throw new Error(parseResult.error || 'Failed to parse XER file');
    }

    const activities = parseActivities(parseResult.data);
    const projectInfo = parseProjectInfo(parseResult.data);
    const criticalPath = activities
      .filter(activity => activity.critical)
      .map(activity => activity.id);

    // Find project dates
    const projectStart = activities.reduce(
      (earliest, activity) => 
        activity.startDate < earliest ? activity.startDate : earliest,
      activities[0]?.startDate || ''
    );

    const projectEnd = activities.reduce(
      (latest, activity) => 
        activity.endDate > latest ? activity.endDate : latest,
      activities[0]?.endDate || ''
    );

    return {
      activities,
      criticalPath,
      projectStart,
      projectEnd,
      ...projectInfo
    };
  } catch (error) {
    console.error('Error parsing XER file:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Failed to parse XER file'
    );
  }
}

export * from './types';