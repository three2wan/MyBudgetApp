import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { PieSliceData } from "../types";
import { formatCurrency } from "../utils";

interface BudgetChartProps {
  income: number;
  needsBudget: number;
  wantsBudget: number;
  savingsBudget: number;
  needsCompleted: number;
  wantsCompleted: number;
  savingsCompleted: number;
  selectedPieSlice: PieSliceData | null;
  onSlicePress: (slice: PieSliceData) => void;
}

export const BudgetChart: React.FC<BudgetChartProps> = ({
  income,
  needsBudget,
  wantsBudget,
  savingsBudget,
  needsCompleted,
  wantsCompleted,
  savingsCompleted,
  selectedPieSlice,
  onSlicePress,
}) => {
  const donutChartData = [
    {
      value: 50,
      color: "#FF6B6B",
      focused: selectedPieSlice?.label === "Needs",
      text: "50%",
      label: "Needs",
      amount: needsBudget,
      spent: needsCompleted,
    },
    {
      value: 30,
      color: "#4ECDC4",
      focused: selectedPieSlice?.label === "Wants",
      text: "30%",
      label: "Wants",
      amount: wantsBudget,
      spent: wantsCompleted,
    },
    {
      value: 20,
      color: "#45B7D1",
      focused: selectedPieSlice?.label === "Savings",
      text: "20%",
      label: "Savings",
      amount: savingsBudget,
      spent: savingsCompleted,
    },
  ];

  const chartData = donutChartData.map((item) => ({
    value: item.value,
    color: item.color,
    text: `${item.value}%`,
    label: item.label,
    focused: selectedPieSlice?.label === item.label,
    onPress: () =>
      onSlicePress({
        label: item.label,
        value: item.value,
        amount: item.amount,
        color: item.color,
      }),
  }));

  const centerContent = selectedPieSlice ? (
    <View style={styles.centerContent}>
      <Text style={styles.centerPercentage}>{selectedPieSlice.value}%</Text>
      <Text style={styles.centerLabel}>{selectedPieSlice.label}</Text>
      <Text style={styles.centerAmount}>
        {formatCurrency(selectedPieSlice.amount || 0)}
      </Text>
      <Text style={styles.centerSpent}>
        Spent:
        {selectedPieSlice.label === "Needs"
          ? formatCurrency(needsCompleted)
          : selectedPieSlice.label === "Wants"
          ? formatCurrency(wantsCompleted)
          : formatCurrency(savingsCompleted)}
      </Text>
    </View>
  ) : (
    <View style={styles.centerContent}>
      <Text style={styles.centerTitle}>50-30-20</Text>
      <Text style={styles.centerSubtitle}>Budget Plan</Text>
      <Text style={styles.centerIncome}>{formatCurrency(income)}</Text>
    </View>
  );

  return (
    <View style={styles.pieChartContainer}>
      <Text style={styles.pieChartTitle}>50-30-20 Budget Allocation</Text>
      <View style={styles.pieChartWrapper}>
        <View style={styles.donutChartContainer}>
          <View style={styles.chartWrapper}>
            <PieChart
              data={chartData}
              donut
              showGradient
              sectionAutoFocus
              radius={150}
              innerRadius={80}
              innerCircleColor="#ffffff"
              centerLabelComponent={() => centerContent}
              onPress={(item: any) => onSlicePress(item)}
              focusOnPress
              toggleFocusOnPress
              strokeWidth={2}
              strokeColor="#ffffff"
              textColor="#ffffff"
              textSize={14}
              fontWeight="bold"
              showText
              textBackgroundRadius={18}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pieChartContainer: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pieChartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  pieChartWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  donutChartContainer: {
    alignItems: "center",
    width: "100%",
  },
  chartWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  centerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  centerSubtitle: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
    textAlign: "center",
  },
  centerIncome: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#007AFF",
    marginTop: 4,
    textAlign: "center",
  },
  centerPercentage: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  centerLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginTop: 2,
    textAlign: "center",
  },
  centerAmount: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
    textAlign: "center",
  },
  centerSpent: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
    textAlign: "center",
  },
});
