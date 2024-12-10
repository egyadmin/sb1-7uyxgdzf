import { TimelineData, Activity } from '../types/timeline';

interface XERTable {
  name: string;
  fields: string[];
  rows: string[][];
}

export async function parseXERFile(file: File): Promise<TimelineData> {
  try {
    const text = await file.text();
    const lines = text.split('\n');
    const tables: { [key: string]: XERTable } = {};
    let currentTable: XERTable | null = null;

    // Parse XER file structure
    for (const line of lines) {
      if (line.startsWith('%T')) {
        const tableName = line.substring(2).trim();
        currentTable = { name: tableName, fields: [], rows: [] };
        tables[tableName] = currentTable;
      } else if (line.startsWith('%F') && currentTable) {
        currentTable.fields = line.substring(2).trim().split('\t');
      } else if (line.startsWith('%R') && currentTable) {
        currentTable.rows.push(line.substring(2).trim().split('\t'));
      }
    }

    // Extract activities from TASK table
    const activities: Activity[] = [];
    const taskTable = tables['TASK'];
    
    if (taskTable) {
      const fieldIndexes = {
        id: taskTable.fields.indexOf('task_id'),
        name: taskTable.fields.indexOf('task_name'),
        startDate: taskTable.fields.indexOf('early_start_date'),
        endDate: taskTable.fields.indexOf('early_end_date'),
        progress: taskTable.fields.indexOf('phys_complete_pct'),
        critical: taskTable.fields.indexOf('critical_drtn_hr_cnt'),
        status: taskTable.fields.indexOf('status_code'),
        duration: taskTable.fields.indexOf('remain_drtn_hr_cnt'),
        baselineStart: taskTable.fields.indexOf('target_start_date'),
        baselineEnd: taskTable.fields.indexOf('target_end_date'),
        baselineProgress: taskTable.fields.indexOf('complete_pct_type'),
      };

      taskTable.rows.forEach(row => {
        if (row[fieldIndexes.name] && !row[fieldIndexes.name].startsWith('DOC-')) {
          const activity: Activity = {
            id: row[fieldIndexes.id],
            name: row[fieldIndexes.name],
            startDate: row[fieldIndexes.startDate],
            endDate: row[fieldIndexes.endDate],
            progress: parseInt(row[fieldIndexes.progress]) || 0,
            critical: row[fieldIndexes.critical] === 'Y',
            dependencies: [],
            status: determineStatus(row[fieldIndexes.status], parseInt(row[fieldIndexes.progress]) || 0),
            duration: parseInt(row[fieldIndexes.duration]) || 0,
            baselineStart: row[fieldIndexes.baselineStart],
            baselineEnd: row[fieldIndexes.baselineEnd],
            baselineProgress: parseInt(row[fieldIndexes.baselineProgress]) || 0,
          };
          activities.push(activity);
        }
      });
    }

    // Extract relationships from TASKPRED table
    const taskPredTable = tables['TASKPRED'];
    if (taskPredTable) {
      const predIndexes = {
        taskId: taskPredTable.fields.indexOf('task_id'),
        predTaskId: taskPredTable.fields.indexOf('pred_task_id'),
      };

      taskPredTable.rows.forEach(row => {
        const taskId = row[predIndexes.taskId];
        const predTaskId = row[predIndexes.predTaskId];
        const activity = activities.find(a => a.id === taskId);
        if (activity) {
          activity.dependencies.push(predTaskId);
        }
      });
    }

    return {
      activities,
      criticalPath: activities.filter(a => a.critical).map(a => a.id),
    };
  } catch (error) {
    console.error('Error parsing XER file:', error);
    throw new Error('Invalid XER file format');
  }
}

function determineStatus(statusCode: string, progress: number): Activity['status'] {
  if (progress === 100) return 'completed';
  if (progress > 0) return 'inProgress';
  if (statusCode === 'TK_NotStart') return 'planned';
  if (statusCode === 'TK_Suspend') return 'delayed';
  return 'planned';
}