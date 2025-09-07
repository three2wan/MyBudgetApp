import { useState } from "react";
import { Alert } from "react-native";
import { CategoryType } from "../types";

export const useForms = () => {
  // Add Item Form
  const [newItemName, setNewItemName] = useState("");
  const [newItemAmount, setNewItemAmount] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType>("needs");

  // Edit Item Form
  const [editItemName, setEditItemName] = useState("");
  const [editItemAmount, setEditItemAmount] = useState("");

  // Income Form
  const [income, setIncome] = useState("");

  const resetAddForm = () => {
    setNewItemName("");
    setNewItemAmount("");
    setSelectedCategory("needs");
  };

  const resetEditForm = () => {
    setEditItemName("");
    setEditItemAmount("");
  };

  const resetIncomeForm = () => {
    setIncome("");
  };

  const validateAddForm = (): {
    isValid: boolean;
    name: string;
    amount: number;
  } => {
    if (!newItemName.trim() || !newItemAmount.trim()) {
      Alert.alert("Error", "Please enter both name and amount");
      return { isValid: false, name: "", amount: 0 };
    }

    const amount = parseFloat(newItemAmount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert("Error", "Please enter a valid amount");
      return { isValid: false, name: "", amount: 0 };
    }

    return { isValid: true, name: newItemName.trim(), amount };
  };

  const validateEditForm = (): {
    isValid: boolean;
    name: string;
    amount: number;
  } => {
    if (!editItemName.trim() || !editItemAmount.trim()) {
      Alert.alert("Error", "Please enter both name and amount");
      return { isValid: false, name: "", amount: 0 };
    }

    const amount = parseFloat(editItemAmount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert("Error", "Please enter a valid amount");
      return { isValid: false, name: "", amount: 0 };
    }

    return { isValid: true, name: editItemName.trim(), amount };
  };

  const validateIncomeForm = (): { isValid: boolean; amount: number } => {
    if (!income.trim()) {
      Alert.alert("Error", "Please enter an income amount");
      return { isValid: false, amount: 0 };
    }

    const amount = parseFloat(income);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert("Error", "Please enter a valid income amount");
      return { isValid: false, amount: 0 };
    }

    return { isValid: true, amount };
  };

  const setEditFormData = (name: string, amount: number) => {
    setEditItemName(name);
    setEditItemAmount(amount.toString());
  };

  const setIncomeFormData = (amount: number) => {
    setIncome(amount.toString());
  };

  return {
    // Add Item Form
    newItemName,
    setNewItemName,
    newItemAmount,
    setNewItemAmount,
    selectedCategory,
    setSelectedCategory,
    resetAddForm,
    validateAddForm,

    // Edit Item Form
    editItemName,
    setEditItemName,
    editItemAmount,
    setEditItemAmount,
    resetEditForm,
    validateEditForm,
    setEditFormData,

    // Income Form
    income,
    setIncome,
    resetIncomeForm,
    validateIncomeForm,
    setIncomeFormData,
  };
};
