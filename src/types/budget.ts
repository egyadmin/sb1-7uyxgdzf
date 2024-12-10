```typescript
export interface BudgetData {
  summary: Record<string, any>;
  categories: Record<string, any>;
  details: BudgetDetail[];
}

export interface BudgetDetail {
  id: string;
  category: string;
  description: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  notes?: string;
}

export interface BudgetCategory {
  budget: number;
  spent: number;
  remaining: number;
}
```