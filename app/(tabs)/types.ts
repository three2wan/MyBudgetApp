export type BudgetItem = {
  id: number;
  name: string;
  amount: number;
  completed: boolean;
};

export type MonthlyData = {
  income: number;
  needs: BudgetItem[];
  wants: BudgetItem[];
  savings: BudgetItem[];
};

export type CategoryType = "needs" | "wants" | "savings";

export type PieSliceData = {
  label: string;
  value: number;
  amount: number;
  color: string;
};

export type EditingItem = {
  id: number;
  category: CategoryType;
  name: string;
  amount: number;
};
