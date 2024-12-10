import { XERTable, XERTables, TaskRecord } from './types';
import { getFieldValue, parseNumericValue, parseDateValue } from './tableParser';
import { Activity } from '../../types/timeline';

export function parseActivities(tables: XERTables): Activity[] {
  const taskTable = tables['TASK'];
  if (!taskTable) {
    throw new Error('TASK table not found in XER file');
  }

  const resourceTable = tables['TASKRSRC'];
  const resourceMap = new Map<string, { cost: number; actual: number }>();

  // Build resource cost map
  if (resourceTable) {
    resourceTable.rows.forEach(row => {
      const taskId = getFieldValue(resourceTable, row, 'task_id');
      const targetCost = parseNumericValue(getFieldValue(resourceTable, row, 'target_cost'));
      const actualCost = parseNumericValue(getFieldValue(resourceTable, row, 'act_reg_cost'));
      
      resourceMap.set(taskId, {
        cost: targetCost,
        actual: actualCost
      });
    });
  }

  return taskTable.rows
    .filter(row => {
      const taskType = getFieldValue(taskTable, row, 'task_type');
      const taskName = getFieldValue(taskTable, row, 'task_name');
      return taskName && !taskName.startsWith('DOC-') && taskType !== 'TT_Mile';
    })
    .map(row => {
      const taskId = getFieldValue(taskTable, row, 'task_id');
      const progress = parseNumericValue(getFieldValue(taskTable, row, 'phys_complete_pct'));
      const status = getFieldValue(taskTable, row, 'status_code');
      const resourceData = resourceMap.get(taskId) || { cost: 0, actual: 0 };

      const plannedValue = resourceData.cost;
      const earnedValue = (progress / 100) * plannedValue;
      const actualCost = resourceData.actual;

      return {
        id: taskId,
        name: getFieldValue(taskTable, row, 'task_name'),
        startDate: parseDateValue(getFieldValue(taskTable, row, 'early_start_date')),
        endDate: parseDateValue(getFieldValue(taskTable, row, 'early_end_date')),
        progress,
        critical: getFieldValue(taskTable, row, 'critical_path_flag') === 'Y',
        dependencies: [],
        status: determineStatus(status, progress),
        duration: parseNumericValue(getFieldValue(taskTable, row, 'target_drtn_hr_cnt')),
        baselineStart: parseDateValue(getFieldValue(taskTable, row, 'target_start_date')),
        baselineEnd: parseDateValue(getFieldValue(taskTable, row, 'target_end_date')),
        baselineProgress: 0,
        totalFloat: parseNumericValue(getFieldValue(taskTable, row, 'total_float_hr_cnt')),
        freeFloat: parseNumericValue(getFieldValue(taskTable, row, 'free_float_hr_cnt')),
        earnedValue,
        plannedValue,
        actualCost,
      };
    });
}

function determineStatus(statusCode: string, progress: number): Activity['status'] {
  if (progress === 100) return 'completed';
  if (progress > 0) return 'inProgress';
  if (statusCode === 'TK_NotStart') return 'planned';
  if (statusCode === 'TK_Suspend') return 'delayed';
  return 'planned';
}