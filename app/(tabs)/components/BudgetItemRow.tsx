import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { BudgetItem, CategoryType } from "../types";
import { formatCurrency } from "../utils";

interface BudgetItemRowProps {
  item: BudgetItem;
  category: CategoryType;
  onToggleCompletion: (category: CategoryType, id: number) => void;
  onEdit: (item: BudgetItem, category: CategoryType) => void;
  onDelete: (category: CategoryType, id: number) => void;
}

export const BudgetItemRow: React.FC<BudgetItemRowProps> = ({
  item,
  category,
  onToggleCompletion,
  onEdit,
  onDelete,
}) => {
  const renderRightActions = () => (
    <View style={styles.rightActions}>
      <TouchableOpacity
        style={[styles.actionButton, styles.editButton]}
        onPress={() => onEdit(item, category)}
      >
        <Text style={styles.actionButtonText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.actionButton, styles.deleteButton]}
        onPress={() => onDelete(category, item.id)}
      >
        <Text style={styles.actionButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Swipeable
      key={item.id}
      renderRightActions={renderRightActions}
      rightThreshold={160}
      friction={2}
      overshootFriction={8}
    >
      <TouchableOpacity
        style={styles.itemRow}
        onPress={() => onToggleCompletion(category, item.id)}
      >
        <View style={styles.itemContent}>
          <View style={styles.checkbox}>
            {item.completed && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text
            style={[styles.itemName, item.completed && styles.completedText]}
          >
            {item.name}
          </Text>
          <Text
            style={[styles.itemAmount, item.completed && styles.completedText]}
          >
            {formatCurrency(item.amount)}
          </Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  itemRow: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checkmark: {
    color: "#28a745",
    fontWeight: "bold",
  },
  itemName: {
    flex: 1,
    fontSize: 16,
  },
  itemAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  rightActions: {
    flexDirection: "row",
    width: 160,
    marginVertical: 8,
  },
  actionButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    borderRadius: 8,
  },
  editButton: {
    backgroundColor: "#007AFF",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
