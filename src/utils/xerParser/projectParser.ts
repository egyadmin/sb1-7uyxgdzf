import { XERTables } from './types';
import { getFieldValue, parseDateValue } from './tableParser';

export function parseProjectInfo(tables: XERTables) {
  const projectTable = tables['PROJECT'];
  if (!projectTable) {
    throw new Error('PROJECT table not found in XER file');
  }

  const row = projectTable.rows[0];
  if (!row) {
    throw new Error('No project data found');
  }

  return {
    projectName: getFieldValue(projectTable, row, 'proj_short_name') || 
                 getFieldValue(projectTable, row, 'proj_name'),
    projectCode: getFieldValue(projectTable, row, 'proj_id'),
    projectManager: getFieldValue(projectTable, row, 'proj_manager'),
    dataDate: parseDateValue(getFieldValue(projectTable, row, 'last_recalc_date')),
    startDate: parseDateValue(getFieldValue(projectTable, row, 'proj_start_date')),
    finishDate: parseDateValue(getFieldValue(projectTable, row, 'proj_finish_date')),
    status: getFieldValue(projectTable, row, 'proj_status'),
    currency: getFieldValue(projectTable, row, 'proj_curr_id') || 'SAR',
  };
}