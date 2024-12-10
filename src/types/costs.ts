export interface CostData {
  parameters: Record<string, any>;
  costs: Record<string, any>;
  summary: Record<string, any>;
}

export interface CostItem {
  item: string;
  amount: number;
  unit?: string;
  quantity?: number;
}

export interface CostCategory {
  id: string;
  title: string;
  items: CostItem[];
  total: number;
}