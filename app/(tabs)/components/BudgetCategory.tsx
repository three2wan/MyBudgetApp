import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BudgetItem, CategoryType } from "../types";
import { calculatePercentage, formatCurrency } from "../utils";
import { BudgetItemRow } from "./BudgetItemRow";

interface BudgetCategoryProps {
  title: string;
  items: BudgetItem[];
  category: CategoryType;
  budget: number;
  completed: number;
  color: string;
  onToggleCompletion: (category: CategoryType, id: number) => void;
  onEditItem: (item: BudgetItem, category: CategoryType) => void;
  onDeleteItem: (category: CategoryType, id: number) => void;
}

export const BudgetCategory: React.FC<BudgetCategoryProps> = ({
  title,
  items,
  category,
  budget,
  completed,
  color,
  onToggleCompletion,
  onEditItem,
  onDeleteItem,
}) => {
  const percentage = calculatePercentage(completed, budget);

  return (
    <View style={styles.categoryContainer}>
      <View style={styles.categoryHeader}>
        <Text style={[styles.categoryTitle, { color }]}>{title}</Text>
        <Text style={styles.categoryAmount}>
          {formatCurrency(completed)} / {formatCurrency(budget)}
        </Text>
      </View>

      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${Math.min(percentage, 100)}%`,
              backgroundColor: color,
            },
          ]}
        />
      </View>

      <View style={styles.itemsList}>
        {items.map((item) => (
          <BudgetItemRow
            key={item.id}
            item={item}
            category={category}
            onToggleCompletion={onToggleCompletion}
            onEdit={onEditItem}
            onDelete={onDeleteItem}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    backgroundColor: "#fff",
    margin: 20,
    marginTop: 0,
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  categoryAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  progressBar: {
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginBottom: 15,
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  itemsList: {
    gap: 10,
  },
});
