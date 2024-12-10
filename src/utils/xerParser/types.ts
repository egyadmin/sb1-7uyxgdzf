export interface XERTable {
  name: string;
  fields: string[];
  rows: string[][];
}

export interface XERTables {
  [key: string]: XERTable;
}

export interface XERParseResult {
  success: boolean;
  data?: any;
  error?: string;
}

export interface TaskRecord {
  task_id: string;
  task_code: string;
  task_name: string;
  early_start_date: string;
  early_end_date: string;
  late_start_date: string;
  late_end_date: string;
  phys_complete_pct: number;
  remain_drtn_hr_cnt: number;
  target_drtn_hr_cnt: number;
  target_start_date: string;
  target_end_date: string;
  total_float_hr_cnt: number;
  free_float_hr_cnt: number;
  critical_path_flag: string;
  status_code: string;
  task_type: string;
  wbs_id: string;
  rsrc_id?: string;
  cost_qty?: number;
  target_cost?: number;
  act_reg_qty?: number;
}

export interface RelationshipRecord {
  task_id: string;
  pred_task_id: string;
  pred_type: string;
  lag_hr_cnt: number;
}

export interface ResourceRecord {
  rsrc_id: string;
  rsrc_name: string;
  rsrc_type: string;
  cost_per_qty: number;
  target_qty: number;
  act_reg_qty: number;
}