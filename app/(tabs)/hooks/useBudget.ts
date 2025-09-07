import { useState } from "react";
import { Alert } from "react-native";
import { mockData } from "../data";
import { BudgetItem, CategoryType, MonthlyData } from "../types";
import { generateNewId } from "../utils";

export const useBudget = () => {
  const [currentMonth, setCurrentMonth] = useState("2024-01");
  const [data, setData] = useState<MonthlyData>(mockData["2024-01"]);

  const toggleItemCompletion = (category: CategoryType, id: number) => {
    setData((prev) => ({
      ...prev,
      [category]: prev[category].map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      ),
    }));
  };

  const addNewItem = (category: CategoryType, name: string, amount: number) => {
    const allIds = [
      ...data.needs.map((i) => i.id),
      ...data.wants.map((i) => i.id),
      ...data.savings.map((i) => i.id),
    ];

    const newId = generateNewId(allIds);
    const newItem: BudgetItem = {
      id: newId,
      name: name.trim(),
      amount,
      completed: false,
    };

    setData((prev) => ({
      ...prev,
      [category]: [...prev[category], newItem],
    }));
  };

  const editItem = (
    category: CategoryType,
    id: number,
    name: string,
    amount: number
  ) => {
    setData((prev) => ({
      ...prev,
      [category]: prev[category].map((item) =>
        item.id === id ? { ...item, name: name.trim(), amount } : item
      ),
    }));
  };

  const deleteItem = (category: CategoryType, id: number) => {
    Alert.alert("Delete Item", "Are you sure you want to delete this item?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setData((prev) => ({
            ...prev,
            [category]: prev[category].filter((item) => item.id !== id),
          }));
        },
      },
    ]);
  };

  const updateIncome = (newIncome: number) => {
    setData((prev) => ({
      ...prev,
      income: newIncome,
    }));
  };

  const changeMonth = (direction: "prev" | "next") => {
    const current = new Date(currentMonth + "-01");
    if (direction === "prev") {
      current.setMonth(current.getMonth() - 1);
    } else {
      current.setMonth(current.getMonth() + 1);
    }

    const newMonth = current.toISOString().slice(0, 7);
    if (newMonth in mockData) {
      setCurrentMonth(newMonth);
      setData(mockData[newMonth as keyof typeof mockData]);
    }
  };

  const getCategoryTotal = (category: BudgetItem[]) => {
    return category.reduce((sum, item) => sum + item.amount, 0);
  };

  const getCategoryCompletedTotal = (category: BudgetItem[]) => {
    return category
      .filter((item) => item.completed)
      .reduce((sum, item) => sum + item.amount, 0);
  };

  // Calculated values
  const needsTotal = getCategoryTotal(data.needs);
  const wantsTotal = getCategoryTotal(data.wants);
  const savingsTotal = getCategoryTotal(data.savings);

  const needsCompleted = getCategoryCompletedTotal(data.needs);
  const wantsCompleted = getCategoryCompletedTotal(data.wants);
  const savingsCompleted = getCategoryCompletedTotal(data.savings);

  const totalSpent = needsCompleted + wantsCompleted + savingsCompleted;
  const balance = data.income - totalSpent;

  const needsBudget = data.income * 0.5;
  const wantsBudget = data.income * 0.3;
  const savingsBudget = data.income * 0.2;

  return {
    // State
    currentMonth,
    data,

    // Actions
    toggleItemCompletion,
    addNewItem,
    editItem,
    deleteItem,
    updateIncome,
    changeMonth,

    // Calculated values
    needsTotal,
    wantsTotal,
    savingsTotal,
    needsCompleted,
    wantsCompleted,
    savingsCompleted,
    totalSpent,
    balance,
    needsBudget,
    wantsBudget,
    savingsBudget,

    // Helper functions
    getCategoryTotal,
    getCategoryCompletedTotal,
  };
};
