import { XERTable, XERTables, XERParseResult } from './types';

export function parseTables(fileContent: string): XERParseResult {
  try {
    const lines = fileContent.split('\n');
    const tables: XERTables = {};
    let currentTable: XERTable | null = null;

    for (const line of lines) {
      const trimmedLine = line.trim();
      
      if (!trimmedLine) continue;

      if (trimmedLine.startsWith('%T')) {
        const tableName = trimmedLine.substring(2).trim();
        currentTable = {
          name: tableName,
          fields: [],
          rows: []
        };
        tables[tableName] = currentTable;
      } else if (trimmedLine.startsWith('%F') && currentTable) {
        currentTable.fields = trimmedLine.substring(2).trim().split('\t');
      } else if (trimmedLine.startsWith('%R') && currentTable) {
        const rowData = trimmedLine.substring(2).trim().split('\t');
        if (rowData.length === currentTable.fields.length) {
          currentTable.rows.push(rowData);
        }
      }
    }

    validateTables(tables);
    return { success: true, data: tables };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error parsing XER file'
    };
  }
}

function validateTables(tables: XERTables): void {
  const requiredTables = ['TASK', 'TASKPRED', 'TASKRSRC'];
  const missingTables = requiredTables.filter(table => !tables[table]);

  if (missingTables.length > 0) {
    throw new Error(`Missing required tables: ${missingTables.join(', ')}`);
  }

  Object.entries(tables).forEach(([tableName, table]) => {
    if (!table.fields.length) {
      throw new Error(`Table ${tableName} has no fields defined`);
    }

    table.rows.forEach((row, index) => {
      if (row.length !== table.fields.length) {
        throw new Error(
          `Row ${index} in table ${tableName} has incorrect number of fields. ` +
          `Expected ${table.fields.length}, got ${row.length}`
        );
      }
    });
  });
}

export function getFieldValue(table: XERTable, row: string[], fieldName: string): string {
  const fieldIndex = table.fields.indexOf(fieldName);
  if (fieldIndex === -1) {
    throw new Error(`Field ${fieldName} not found in table ${table.name}`);
  }
  return row[fieldIndex] || '';
}

export function parseNumericValue(value: string): number {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
}

export function parseDateValue(value: string): string {
  if (!value) return '';
  
  try {
    // Handle P6 date format: YYYY-MM-DD HH:mm
    const [datePart, timePart] = value.split(' ');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hour, minute] = (timePart || '00:00').split(':').map(Number);
    
    const date = new Date(year, month - 1, day, hour, minute);
    return date.toISOString();
  } catch {
    return '';
  }
}