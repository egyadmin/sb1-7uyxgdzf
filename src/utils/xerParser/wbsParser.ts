import { XERTables, WBSFields } from './types';
import { getFieldIndex, getFieldValue } from './tableParser';

export interface WBSNode {
  id: string;
  name: string;
  shortName: string;
  parent: string | null;
  children: WBSNode[];
  level: number;
  sequence: number;
}

export function parseWBSStructure(tables: XERTables): Map<string, WBSNode> {
  const wbsTable = tables['PROJWBS'];
  if (!wbsTable) {
    throw new Error('PROJWBS table not found in XER file');
  }

  const fieldIndexes = {
    id: getFieldIndex(wbsTable, 'wbs_id'),
    parentId: getFieldIndex(wbsTable, 'parent_wbs_id'),
    name: getFieldIndex(wbsTable, 'wbs_name'),
    shortName: getFieldIndex(wbsTable, 'wbs_short_name'),
    sequence: getFieldIndex(wbsTable, 'seq_num'),
  };

  const wbsMap = new Map<string, WBSNode>();

  // First pass: Create all nodes
  wbsTable.rows.forEach(row => {
    const id = getFieldValue(row, fieldIndexes.id);
    const parentId = getFieldValue(row, fieldIndexes.parentId);
    
    wbsMap.set(id, {
      id,
      name: getFieldValue(row, fieldIndexes.name),
      shortName: getFieldValue(row, fieldIndexes.shortName),
      parent: parentId || null,
      children: [],
      level: 0,
      sequence: parseInt(getFieldValue(row, fieldIndexes.sequence)) || 0,
    });
  });

  // Second pass: Build hierarchy and calculate levels
  wbsMap.forEach((node) => {
    if (node.parent) {
      const parentNode = wbsMap.get(node.parent);
      if (parentNode) {
        parentNode.children.push(node);
        node.level = parentNode.level + 1;
      }
    }
  });

  // Sort children by sequence
  wbsMap.forEach((node) => {
    node.children.sort((a, b) => a.sequence - b.sequence);
  });

  return wbsMap;
}