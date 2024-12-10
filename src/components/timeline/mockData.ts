import { TimelineData } from '../../types/timeline';
import { addDays } from 'date-fns';

const startDate = new Date(2024, 5, 1); // June 1, 2024

export const mockTimelineData: TimelineData = {
  activities: [
    {
      id: 'NIA-001',
      name: 'تجهيز الموقع وأعمال المساحة',
      startDate: startDate.toISOString(),
      endDate: addDays(startDate, 15).toISOString(),
      progress: 100,
      critical: true,
      dependencies: [],
      status: 'completed',
      duration: 15,
      baselineStart: startDate.toISOString(),
      baselineEnd: addDays(startDate, 15).toISOString(),
      baselineProgress: 100,
      earnedValue: 250000,
      plannedValue: 250000,
      actualCost: 245000,
    },
    // Add more mock activities here...
  ],
  criticalPath: ['NIA-001', 'NIA-002', 'NIA-003', 'NIA-004', 'NIA-006'],
  projectStart: startDate.toISOString(),
  projectEnd: addDays(startDate, 130).toISOString(),
};