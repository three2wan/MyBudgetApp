import { MonthlyData } from "./types";

export const mockData: Record<string, MonthlyData> = {
  "2024-01": {
    income: 5000,
    needs: [
      { id: 1, name: "Rent", amount: 1200, completed: true },
      { id: 2, name: "Groceries", amount: 600, completed: false },
      { id: 3, name: "Utilities", amount: 300, completed: true },
      { id: 4, name: "Transportation", amount: 400, completed: false },
    ],
    wants: [
      { id: 5, name: "Dining Out", amount: 500, completed: false },
      { id: 6, name: "PS5 Games", amount: 150, completed: true },
      { id: 7, name: "Streaming Services", amount: 80, completed: false },
      { id: 8, name: "Shopping", amount: 300, completed: false },
    ],
    savings: [
      { id: 9, name: "Emergency Fund", amount: 600, completed: false },
      { id: 10, name: "Investment", amount: 400, completed: false },
    ],
  },
  "2024-02": {
    income: 5200,
    needs: [
      { id: 11, name: "Rent", amount: 1200, completed: true },
      { id: 12, name: "Groceries", amount: 650, completed: false },
      { id: 13, name: "Utilities", amount: 280, completed: false },
    ],
    wants: [
      { id: 14, name: "Movie Tickets", amount: 200, completed: false },
      { id: 15, name: "New Headphones", amount: 300, completed: false },
    ],
    savings: [
      { id: 16, name: "Emergency Fund", amount: 650, completed: false },
      { id: 17, name: "Retirement", amount: 450, completed: false },
    ],
  },
};
