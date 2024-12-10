import { XERTables } from './types';
import { getFieldIndex, getFieldValue } from './tableParser';
import { Activity } from '../../types/timeline';

export function parseRelationships(tables: XERTables, activities: Activity[]): void {
  const taskPredTable = tables['TASKPRED'];
  if (!taskPredTable) {
    throw new Error('TASKPRED table not found in XER file');
  }

  const fieldIndexes = {
    taskId: getFieldIndex(taskPredTable, 'task_id'),
    predTaskId: getFieldIndex(taskPredTable, 'pred_task_id'),
    predType: getFieldIndex(taskPredTable, 'pred_type'),
    lag: getFieldIndex(taskPredTable, 'lag_hr_cnt'),
  };

  const activityMap = new Map(activities.map(activity => [activity.id, activity]));

  taskPredTable.rows.forEach(row => {
    const taskId = getFieldValue(row, fieldIndexes.taskId);
    const predTaskId = getFieldValue(row, fieldIndexes.predTaskId);
    const activity = activityMap.get(taskId);

    if (activity && predTaskId) {
      activity.dependencies.push(predTaskId);
    }
  });
}