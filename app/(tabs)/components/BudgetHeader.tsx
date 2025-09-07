import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface BudgetHeaderProps {
  currentMonth: string;
  onChangeMonth: (direction: "prev" | "next") => void;
}

export const BudgetHeader: React.FC<BudgetHeaderProps> = ({
  currentMonth,
  onChangeMonth,
}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => onChangeMonth("prev")}
        style={styles.monthButton}
      >
        <Text style={styles.monthButtonText}>‹</Text>
      </TouchableOpacity>

      <Text style={styles.monthTitle}>
        {new Date(currentMonth + "-01").toLocaleDateString("en-MY", {
          year: "numeric",
          month: "long",
        })}
      </Text>

      <TouchableOpacity
        onPress={() => onChangeMonth("next")}
        style={styles.monthButton}
      >
        <Text style={styles.monthButtonText}>›</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  monthButton: {
    padding: 10,
  },
  monthButtonText: {
    fontSize: 24,
    color: "#007AFF",
  },
});
