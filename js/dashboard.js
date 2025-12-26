// UPDATE ENTIRE DASHBOARD

function updateDashboard() {
  const hasData = financeData.hasData;

  Utils.toggleEmptyState("empty-state", "dashboard-content", hasData);
  // UPDATE SUMMARY CARDS
  Utils.updateField("totalIncome", financeData.totalIncome);
  Utils.updateField("totalExpenses", financeData.totalExpenses);
  Utils.updateField("balance", financeData.balance);
  Utils.updateField("budgetUsedPercentage", financeData.budgetUsedPercentage);
}
