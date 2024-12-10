```typescript
export interface Activity {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  progress: number;
  critical: boolean;
  dependencies: string[];
  status: 'planned' | 'inProgress' | 'completed' | 'delayed';
  duration: number;
  baselineStart: string;
  baselineEnd: string;
  baselineProgress: number;
  baselineDuration?: number;
  totalFloat?: number;
  freeFloat?: number;
  earnedValue?: number;
  plannedValue?: number;
  actualCost?: number;
  baselineCost?: number;
  variance?: number;
}

export interface TimelineData {
  activities: Activity[];
  criticalPath: string[];
  projectStart?: string;
  projectEnd?: string;
  projectName?: string;
  projectCode?: string;
  projectManager?: string;
  dataDate?: string;
  baselineDate?: string;
  baselineName?: string;
}

export interface TimelineStats {
  totalActivities: number;
  completedActivities: number;
  inProgressActivities: number;
  criticalActivities: number;
  plannedProgress: number;
  actualProgress: number;
  scheduleVariance: number;
  costVariance: number;
}
```