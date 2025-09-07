import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AddItemModal } from "./components/AddItemModal";
import { BudgetCategory } from "./components/BudgetCategory";
import { BudgetChart } from "./components/BudgetChart";
import { BudgetHeader } from "./components/BudgetHeader";
import { BudgetSummary } from "./components/BudgetSummary";
import { EditIncomeModal } from "./components/EditIncomeModal";
import { EditItemModal } from "./components/EditItemModal";
import { useBudget } from "./hooks/useBudget";
import { useForms } from "./hooks/useForms";
import { useModals } from "./hooks/useModals";

export default function BudgetScreen() {
  const budget = useBudget();
  const modals = useModals();
  const forms = useForms();

  // Handle Add Item
  const handleAddItem = () => {
    const validation = forms.validateAddForm();
    if (validation.isValid) {
      budget.addNewItem(
        forms.selectedCategory,
        validation.name,
        validation.amount
      );
      forms.resetAddForm();
      modals.closeAddModal();
    }
  };

  // Handle Edit Item
  const handleEditItem = () => {
    if (!modals.editingItem) return;

    const validation = forms.validateEditForm();
    if (validation.isValid) {
      budget.editItem(
        modals.editingItem.category,
        modals.editingItem.id,
        validation.name,
        validation.amount
      );
      forms.resetEditForm();
      modals.closeEditModal();
    }
  };

  // Handle Edit Income
  const handleEditIncome = () => {
    const validation = forms.validateIncomeForm();
    if (validation.isValid) {
      budget.updateIncome(validation.amount);
      forms.resetIncomeForm();
      modals.closeIncomeModal();
    }
  };

  // Handle Open Edit Modal
  const handleOpenEditModal = (item: any, category: any) => {
    forms.setEditFormData(item.name, item.amount);
    modals.openEditModal(item, category);
  };

  // Handle Open Income Modal
  const handleOpenIncomeModal = () => {
    forms.setIncomeFormData(budget.data.income);
    modals.openIncomeModal();
  };

  // Handle Pie Chart Slice Press
  const handlePieSlicePress = (slice: any) => {
    const currentSlice =
      modals.selectedPieSlice?.label === slice.label ? null : slice;
    modals.setPieSlice(currentSlice);
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <StatusBar style="dark" />

        <BudgetHeader
          currentMonth={budget.currentMonth}
          onChangeMonth={budget.changeMonth}
        />

        <BudgetSummary
          income={budget.data.income}
          balance={budget.balance}
          onEditIncome={handleOpenIncomeModal}
        />

        <BudgetChart
          income={budget.data.income}
          needsBudget={budget.needsBudget}
          wantsBudget={budget.wantsBudget}
          savingsBudget={budget.savingsBudget}
          needsCompleted={budget.needsCompleted}
          wantsCompleted={budget.wantsCompleted}
          savingsCompleted={budget.savingsCompleted}
          selectedPieSlice={modals.selectedPieSlice}
          onSlicePress={handlePieSlicePress}
        />

        <BudgetCategory
          title="Needs (50%)"
          items={budget.data.needs}
          category="needs"
          budget={budget.needsBudget}
          completed={budget.needsCompleted}
          color="#FF6B6B"
          onToggleCompletion={budget.toggleItemCompletion}
          onEditItem={handleOpenEditModal}
          onDeleteItem={budget.deleteItem}
        />

        <BudgetCategory
          title="Wants (30%)"
          items={budget.data.wants}
          category="wants"
          budget={budget.wantsBudget}
          completed={budget.wantsCompleted}
          color="#4ECDC4"
          onToggleCompletion={budget.toggleItemCompletion}
          onEditItem={handleOpenEditModal}
          onDeleteItem={budget.deleteItem}
        />

        <BudgetCategory
          title="Savings (20%)"
          items={budget.data.savings}
          category="savings"
          budget={budget.savingsBudget}
          completed={budget.savingsCompleted}
          color="#45B7D1"
          onToggleCompletion={budget.toggleItemCompletion}
          onEditItem={handleOpenEditModal}
          onDeleteItem={budget.deleteItem}
        />

        {/* Add New Item Button */}
        <View style={styles.addItemButtonContainer}>
          <TouchableOpacity
            style={styles.addItemButton}
            onPress={modals.openAddModal}
          >
            <Text style={styles.addItemButtonText}>+ Add New Item</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modals */}
      <AddItemModal
        visible={modals.isModalVisible}
        onClose={modals.closeAddModal}
        newItemName={forms.newItemName}
        setNewItemName={forms.setNewItemName}
        newItemAmount={forms.newItemAmount}
        setNewItemAmount={forms.setNewItemAmount}
        selectedCategory={forms.selectedCategory}
        setSelectedCategory={forms.setSelectedCategory}
        onSubmit={handleAddItem}
      />

      <EditItemModal
        visible={modals.isEditModalVisible}
        onClose={modals.closeEditModal}
        editItemName={forms.editItemName}
        setEditItemName={forms.setEditItemName}
        editItemAmount={forms.editItemAmount}
        setEditItemAmount={forms.setEditItemAmount}
        onSubmit={handleEditItem}
      />

      <EditIncomeModal
        visible={modals.isIncomeModalVisible}
        onClose={modals.closeIncomeModal}
        income={forms.income}
        setIncome={forms.setIncome}
        onSubmit={handleEditIncome}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  addItemButtonContainer: {
    margin: 20,
    marginTop: 0,
  },
  addItemButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addItemButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
