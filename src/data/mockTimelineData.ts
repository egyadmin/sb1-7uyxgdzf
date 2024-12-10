import { TimelineData } from '../types/timeline';
import { addDays } from 'date-fns';

const startDate = new Date(2024, 1, 19); // Feb 19, 2024

export const mockTimelineData: TimelineData = {
  projectName: 'Site Preparation Frame Work WO-39',
  projectCode: 'NIA-Earthwork Package 6',
  dataDate: new Date(2024, 5, 7).toISOString(), // June 7, 2024
  activities: [
    {
      id: 'NIA-001',
      name: 'Terminal Box Excavation (Update Progress)',
      startDate: startDate.toISOString(),
      endDate: addDays(startDate, 225).toISOString(),
      progress: 5.02,
      critical: true,
      dependencies: [],
      status: 'inProgress',
      duration: 225,
      baselineStart: startDate.toISOString(),
      baselineEnd: addDays(startDate, 225).toISOString(),
      baselineProgress: 5.02,
      earnedValue: 20601152.92,
      plannedValue: 260051629.52,
      actualCost: 4487228.06,
      totalFloat: 0,
      freeFloat: 0
    },
    {
      id: 'NIA-002',
      name: 'Site Mobilization & Temporary Facilities',
      startDate: startDate.toISOString(),
      endDate: addDays(startDate, 30).toISOString(),
      progress: 100,
      critical: true,
      dependencies: [],
      status: 'completed',
      duration: 30,
      baselineStart: startDate.toISOString(),
      baselineEnd: addDays(startDate, 30).toISOString(),
      baselineProgress: 100,
      earnedValue: 1500000,
      plannedValue: 1500000,
      actualCost: 1450000,
      totalFloat: 0,
      freeFloat: 0
    },
    {
      id: 'NIA-003',
      name: 'Survey & Setting Out',
      startDate: addDays(startDate, 15).toISOString(),
      endDate: addDays(startDate, 45).toISOString(),
      progress: 85,
      critical: true,
      dependencies: ['NIA-002'],
      status: 'inProgress',
      duration: 30,
      baselineStart: addDays(startDate, 15).toISOString(),
      baselineEnd: addDays(startDate, 45).toISOString(),
      baselineProgress: 80,
      earnedValue: 850000,
      plannedValue: 1000000,
      actualCost: 820000,
      totalFloat: 5,
      freeFloat: 2
    },
    {
      id: 'NIA-004',
      name: 'Bulk Excavation - Area A',
      startDate: addDays(startDate, 45).toISOString(),
      endDate: addDays(startDate, 90).toISOString(),
      progress: 40,
      critical: true,
      dependencies: ['NIA-003'],
      status: 'inProgress',
      duration: 45,
      baselineStart: addDays(startDate, 45).toISOString(),
      baselineEnd: addDays(startDate, 90).toISOString(),
      baselineProgress: 45,
      earnedValue: 12000000,
      plannedValue: 30000000,
      actualCost: 11500000,
      totalFloat: 0,
      freeFloat: 0
    },
    {
      id: 'NIA-005',
      name: 'Dewatering System Installation',
      startDate: addDays(startDate, 60).toISOString(),
      endDate: addDays(startDate, 90).toISOString(),
      progress: 25,
      critical: false,
      dependencies: ['NIA-003'],
      status: 'inProgress',
      duration: 30,
      baselineStart: addDays(startDate, 60).toISOString(),
      baselineEnd: addDays(startDate, 90).toISOString(),
      baselineProgress: 30,
      earnedValue: 1250000,
      plannedValue: 5000000,
      actualCost: 1200000,
      totalFloat: 15,
      freeFloat: 10
    }
  ],
  criticalPath: ['NIA-001', 'NIA-002', 'NIA-003', 'NIA-004'],
  projectStart: startDate.toISOString(),
  projectEnd: addDays(startDate, 225).toISOString()
};