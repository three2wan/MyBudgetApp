import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { formatCurrency } from "../utils";

interface BudgetSummaryProps {
  income: number;
  balance: number;
  onEditIncome: () => void;
}

export const BudgetSummary: React.FC<BudgetSummaryProps> = ({
  income,
  balance,
  onEditIncome,
}) => {
  return (
    <View style={styles.summaryContainer}>
      <TouchableOpacity style={styles.summaryCard} onPress={onEditIncome}>
        <View style={styles.incomeHeader}>
          <Text style={styles.summaryLabel}>Monthly Income</Text>
        </View>
        <Text style={styles.incomeAmount}>{formatCurrency(income)}</Text>
      </TouchableOpacity>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Balance</Text>
        <Text
          style={[styles.balanceAmount, balance < 0 && styles.negativeBalance]}
        >
          {formatCurrency(balance)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  summaryContainer: {
    flexDirection: "row",
    padding: 20,
    gap: 15,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  incomeAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  balanceAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#28a745",
  },
  negativeBalance: {
    color: "#dc3545",
  },
  incomeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
});
