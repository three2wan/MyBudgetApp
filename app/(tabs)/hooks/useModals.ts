import { useState } from "react";
import { BudgetItem, CategoryType, EditingItem, PieSliceData } from "../types";

export const useModals = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedPieSlice, setSelectedPieSlice] = useState<PieSliceData | null>(
    null
  );
  const [editingItem, setEditingItem] = useState<EditingItem | null>(null);

  const openAddModal = () => setIsModalVisible(true);
  const closeAddModal = () => setIsModalVisible(false);

  const openIncomeModal = () => setIsIncomeModalVisible(true);
  const closeIncomeModal = () => setIsIncomeModalVisible(false);

  const openEditModal = (item: BudgetItem, category: CategoryType) => {
    setEditingItem({
      id: item.id,
      category,
      name: item.name,
      amount: item.amount,
    });
    setIsEditModalVisible(true);
  };

  const closeEditModal = () => {
    setIsEditModalVisible(false);
    setEditingItem(null);
  };

  const setPieSlice = (slice: PieSliceData | null) => {
    setSelectedPieSlice(slice);
  };

  return {
    // Add Item Modal
    isModalVisible,
    openAddModal,
    closeAddModal,

    // Income Modal
    isIncomeModalVisible,
    openIncomeModal,
    closeIncomeModal,

    // Edit Item Modal
    isEditModalVisible,
    editingItem,
    openEditModal,
    closeEditModal,

    // Pie Chart
    selectedPieSlice,
    setPieSlice,
  };
};
