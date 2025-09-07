export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString("en-MY", {
    style: "currency",
    currency: "MYR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const generateNewId = (existingIds: number[]): number => {
  return Math.max(...existingIds, 0) + 1;
};

export const calculatePercentage = (
  completed: number,
  budget: number
): number => {
  return budget > 0 ? (completed / budget) * 100 : 0;
};
