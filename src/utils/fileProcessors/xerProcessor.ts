```typescript
import { TimelineData, Activity } from '../../types/timeline';
import { parseString } from 'xml2js';

export async function processXERFile(file: File): Promise<TimelineData> {
  try {
    const content = await file.text();
    const data = await parseXERContent(content);
    return data;
  } catch (error) {
    console.error('Error processing XER file:', error);
    throw new Error('فشل في معالجة ملف XER. يرجى التأكد من صحة الملف.');
  }
}

async function parseXERContent(content: string): Promise<TimelineData> {
  const lines = content.split('\n');
  const tables: Record<string, any> = {};
  let currentTable = null;

  // Parse XER file structure
  for (const line of lines) {
    if (line.startsWith('%T')) {
      const tableName = line.substring(2).trim();
      currentTable = { fields: [], rows: [] };
      tables[tableName] = currentTable;
    } else if (line.startsWith('%F') && currentTable) {
      currentTable.fields = line.substring(2).trim().split('\t');
    } else if (line.startsWith('%R') && currentTable) {
      currentTable.rows.push(line.substring(2).trim().split('\t'));
    }
  }

  // Extract activities
  const activities = extractActivities(tables);
  const relationships = extractRelationships(tables);
  const projectInfo = extractProjectInfo(tables);

  // Apply relationships to activities
  applyRelationships(activities, relationships);

  return {
    activities,
    criticalPath: activities.filter(a => a.critical).map(a => a.id),
    ...projectInfo
  };
}

function extractActivities(tables: Record<string, any>): Activity[] {
  const taskTable = tables['TASK'];
  if (!taskTable) return [];

  return taskTable.rows
    .filter((row: string[]) => {
      const name = row[taskTable.fields.indexOf('task_name')];
      return name && !name.startsWith('DOC-');
    })
    .map((row: string[]) => {
      const getField = (fieldName: string) => {
        const index = taskTable.fields.indexOf(fieldName);
        return index >= 0 ? row[index] : null;
      };

      return {
        id: getField('task_id'),
        name: getField('task_name'),
        startDate: getField('early_start_date'),
        endDate: getField('early_end_date'),
        progress: parseFloat(getField('phys_complete_pct')) || 0,
        critical: getField('critical_path_flag') === 'Y',
        dependencies: [],
        status: determineStatus(getField('status_code'), getField('phys_complete_pct')),
        duration: parseInt(getField('target_drtn_hr_cnt')) || 0,
        baselineStart: getField('target_start_date'),
        baselineEnd: getField('target_end_date'),
        baselineProgress: parseFloat(getField('target_complete_pct')) || 0,
        totalFloat: parseFloat(getField('total_float_hr_cnt')) || 0,
        freeFloat: parseFloat(getField('free_float_hr_cnt')) || 0,
      };
    });
}

function determineStatus(statusCode: string | null, progress: string | null): Activity['status'] {
  const progressValue = parseFloat(progress || '0');
  if (progressValue === 100) return 'completed';
  if (progressValue > 0) return 'inProgress';
  if (statusCode === 'TK_NotStart') return 'planned';
  if (statusCode === 'TK_Suspend') return 'delayed';
  return 'planned';
}

function extractRelationships(tables: Record<string, any>): any[] {
  const relTable = tables['TASKPRED'];
  if (!relTable) return [];

  return relTable.rows.map((row: string[]) => ({
    successorId: row[relTable.fields.indexOf('task_id')],
    predecessorId: row[relTable.fields.indexOf('pred_task_id')],
    type: row[relTable.fields.indexOf('pred_type')],
    lag: parseInt(row[relTable.fields.indexOf('lag_hr_cnt')]) || 0,
  }));
}

function extractProjectInfo(tables: Record<string, any>): Partial<TimelineData> {
  const projectTable = tables['PROJECT'];
  if (!projectTable || !projectTable.rows.length) return {};

  const row = projectTable.rows[0];
  const getField = (fieldName: string) => {
    const index = projectTable.fields.indexOf(fieldName);
    return index >= 0 ? row[index] : null;
  };

  return {
    projectName: getField('proj_short_name') || getField('proj_name'),
    projectCode: getField('proj_id'),
    dataDate: getField('last_recalc_date'),
  };
}

function applyRelationships(activities: Activity[], relationships: any[]): void {
  relationships.forEach(rel => {
    const activity = activities.find(a => a.id === rel.successorId);
    if (activity) {
      activity.dependencies.push(rel.predecessorId);
    }
  });
}
```