import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { PieChart } from "react-native-gifted-charts";

// Mock data for demonstration
const mockData = {
  "2024-01": {
    income: 5000,
    needs: [
      { id: 1, name: "Rent", amount: 1200, completed: true },
      { id: 2, name: "Groceries", amount: 600, completed: false },
      { id: 3, name: "Utilities", amount: 300, completed: true },
      { id: 4, name: "Transportation", amount: 400, completed: false },
    ],
    wants: [
      { id: 5, name: "Dining Out", amount: 500, completed: false },
      { id: 6, name: "PS5 Games", amount: 150, completed: true },
      { id: 7, name: "Streaming Services", amount: 80, completed: false },
      { id: 8, name: "Shopping", amount: 300, completed: false },
    ],
    savings: [
      { id: 9, name: "Emergency Fund", amount: 600, completed: false },
      { id: 10, name: "Investment", amount: 400, completed: false },
    ],
  },
  "2024-02": {
    income: 5200,
    needs: [
      { id: 11, name: "Rent", amount: 1200, completed: true },
      { id: 12, name: "Groceries", amount: 650, completed: false },
      { id: 13, name: "Utilities", amount: 280, completed: false },
    ],
    wants: [
      { id: 14, name: "Movie Tickets", amount: 200, completed: false },
      { id: 15, name: "New Headphones", amount: 300, completed: false },
    ],
    savings: [
      { id: 16, name: "Emergency Fund", amount: 650, completed: false },
      { id: 17, name: "Retirement", amount: 450, completed: false },
    ],
  },
};

type BudgetItem = {
  id: number;
  name: string;
  amount: number;
  completed: boolean;
};

type MonthlyData = {
  income: number;
  needs: BudgetItem[];
  wants: BudgetItem[];
  savings: BudgetItem[];
};

export default function BudgetScreen() {
  const [currentMonth, setCurrentMonth] = useState("2024-01");
  const [data, setData] = useState<MonthlyData>(mockData["2024-01"]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemAmount, setNewItemAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    "needs" | "wants" | "savings"
  >("needs");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPieSlice, setSelectedPieSlice] = useState<{
    label: string;
    value: number;
    amount: number;
    color: string;
  } | null>(null);

  const toggleItemCompletion = (
    category: "needs" | "wants" | "savings",
    id: number
  ) => {
    setData((prev) => ({
      ...prev,
      [category]: prev[category].map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      ),
    }));
  };

  const addNewItem = () => {
    if (!newItemName.trim() || !newItemAmount.trim()) {
      Alert.alert("Error", "Please enter both name and amount");
      return;
    }

    const amount = parseFloat(newItemAmount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert("Error", "Please enter a valid amount");
      return;
    }

    const newId =
      Math.max(
        ...data.needs.map((i) => i.id),
        ...data.wants.map((i) => i.id),
        ...data.savings.map((i) => i.id)
      ) + 1;

    const newItem: BudgetItem = {
      id: newId,
      name: newItemName.trim(),
      amount,
      completed: false,
    };

    setData((prev) => ({
      ...prev,
      [selectedCategory]: [...prev[selectedCategory], newItem],
    }));

    setNewItemName("");
    setNewItemAmount("");
    setIsModalVisible(false);
  };

  const getCategoryTotal = (category: BudgetItem[]) => {
    return category.reduce((sum, item) => sum + item.amount, 0);
  };

  const getCategoryCompletedTotal = (category: BudgetItem[]) => {
    return category
      .filter((item) => item.completed)
      .reduce((sum, item) => sum + item.amount, 0);
  };

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

  // Pie chart data
  const pieData = [
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

  // Doughnut Chart Component using react-native-gifted-charts
  const SimplePieChart = ({
    data,
    onSlicePress,
  }: {
    data: any[];
    onSlicePress: (item: any) => void;
  }) => {
    // Prepare data for gifted-charts
    const chartData = data.map((item, index) => ({
      value: item.value,
      color: item.color,
      text: `${item.value}%`,
      label: item.label,
      focused: selectedPieSlice?.label === item.label,
      onPress: () => onSlicePress(item),
    }));

    const centerContent = selectedPieSlice ? (
      <View style={styles.centerContent}>
        <Text style={styles.centerPercentage}>{selectedPieSlice.value}%</Text>
        <Text style={styles.centerLabel}>{selectedPieSlice.label}</Text>
        <Text style={styles.centerAmount}>
          RM {selectedPieSlice.amount?.toFixed(2) || "0.00"}
        </Text>
        <Text style={styles.centerSpent}>
          Spent: RM {(selectedPieSlice as any).spent?.toFixed(2) || "0.00"}
        </Text>
      </View>
    ) : (
      <View style={styles.centerContent}>
        <Text style={styles.centerTitle}>50-30-20</Text>
        <Text style={styles.centerSubtitle}>Budget Plan</Text>
        <Text style={styles.centerIncome}>RM 5,000.00</Text>
      </View>
    );

    return (
      <View style={styles.simplePieChartContainer}>
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
    );
  };

  const renderCategory = (
    title: string,
    items: BudgetItem[],
    category: "needs" | "wants" | "savings",
    budget: number,
    color: string
  ) => {
    const completed = getCategoryCompletedTotal(items);
    const percentage = budget > 0 ? (completed / budget) * 100 : 0;

    return (
      <View style={styles.categoryContainer}>
        <View style={styles.categoryHeader}>
          <Text style={[styles.categoryTitle, { color }]}>{title}</Text>
          <Text style={styles.categoryAmount}>
            RM {completed.toFixed(2)} / RM {budget.toFixed(2)}
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
            <TouchableOpacity
              key={item.id}
              style={styles.itemRow}
              onPress={() => toggleItemCompletion(category, item.id)}
            >
              <View style={styles.itemContent}>
                <View style={styles.checkbox}>
                  {item.completed && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text
                  style={[
                    styles.itemName,
                    item.completed && styles.completedText,
                  ]}
                >
                  {item.name}
                </Text>
                <Text
                  style={[
                    styles.itemAmount,
                    item.completed && styles.completedText,
                  ]}
                >
                  RM {item.amount.toFixed(2)}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
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

  return (
    <>
      <ScrollView style={styles.container}>
        <StatusBar style="dark" />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => changeMonth("prev")}
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
            onPress={() => changeMonth("next")}
            style={styles.monthButton}
          >
            <Text style={styles.monthButtonText}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Income and Balance */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Monthly Income</Text>
            <Text style={styles.incomeAmount}>RM {data.income.toFixed(2)}</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Balance</Text>
            <Text
              style={[
                styles.balanceAmount,
                balance < 0 && styles.negativeBalance,
              ]}
            >
              RM {balance.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Interactive Pie Chart */}
        <View style={styles.pieChartContainer}>
          <Text style={styles.pieChartTitle}>50-30-20 Budget Allocation</Text>
          <View style={styles.pieChartWrapper}>
            <SimplePieChart
              data={pieData}
              onSlicePress={(item: any) => {
                const sliceData = {
                  label: item.label,
                  value: item.value,
                  amount: item.amount,
                  color: item.color,
                  spent: item.spent,
                };
                setSelectedPieSlice(
                  selectedPieSlice?.label === item.label ? null : sliceData
                );
              }}
            />
          </View>
        </View>

        {/* Categories */}
        {renderCategory(
          "Needs (50%)",
          data.needs,
          "needs",
          needsBudget,
          "#FF6B6B"
        )}
        {renderCategory(
          "Wants (30%)",
          data.wants,
          "wants",
          wantsBudget,
          "#4ECDC4"
        )}
        {renderCategory(
          "Savings (20%)",
          data.savings,
          "savings",
          savingsBudget,
          "#45B7D1"
        )}

        {/* Add New Item Button */}
        <View style={styles.addItemButtonContainer}>
          <TouchableOpacity
            style={styles.addItemButton}
            onPress={() => setIsModalVisible(true)}
          >
            <Text style={styles.addItemButtonText}>+ Add New Item</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Add Item Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Item</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.categorySelector}>
              {(["needs", "wants", "savings"] as const).map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category &&
                      styles.selectedCategoryButton,
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text
                    style={[
                      styles.categoryButtonText,
                      selectedCategory === category &&
                        styles.selectedCategoryButtonText,
                    ]}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              style={styles.input}
              placeholder="Item name"
              value={newItemName}
              onChangeText={setNewItemName}
            />

            <TextInput
              style={styles.input}
              placeholder="Amount (RM)"
              value={newItemAmount}
              onChangeText={setNewItemAmount}
              keyboardType="numeric"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={addNewItem}
              >
                <Text style={styles.confirmButtonText}>Add Item</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
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
  simplePieChartContainer: {
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
  pieChartVisual: {
    position: "relative",
    height: 200,
    width: 200,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  legendContainer: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 10,
    minWidth: 200,
    alignItems: "center",
    marginTop: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: "#666",
  },
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    width: "90%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 28,
    color: "#666",
    fontWeight: "bold",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  confirmButton: {
    backgroundColor: "#28a745",
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "bold",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  categorySelector: {
    flexDirection: "row",
    marginBottom: 15,
  },
  categoryButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginHorizontal: 2,
    alignItems: "center",
  },
  selectedCategoryButton: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  categoryButtonText: {
    fontSize: 14,
  },
  selectedCategoryButtonText: {
    color: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
