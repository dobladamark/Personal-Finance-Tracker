function updateIncomeSummary() {
  const thisMonthTransactions = Utils.getThisMonthTransactions(
    financeData.transactions
  );

  const monthlyIncome = thisMonthTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyExpenses = thisMonthTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const netSavings = monthlyIncome - monthlyExpenses;
  const savingsRate =
    monthlyIncome > 0 ? ((netSavings / monthlyIncome) * 100).toFixed(1) : 0;

  const incomeBox = document.querySelector(".summary-box.income h2");
  const expenseBox = document.querySelector(".summary-box.expense h2");
  const savingsBox = document.querySelector(".summary-box.savings h2");
  const savingsRateBox = document.querySelector(".savings-rate strong");

  if (incomeBox) incomeBox.textContent = Utils.formatCurrency(monthlyIncome);
  if (expenseBox)
    expenseBox.textContent = Utils.formatCurrency(monthlyExpenses);
  if (savingsBox) savingsBox.textContent = Utils.formatCurrency(netSavings);
  if (savingsRateBox) savingsRateBox.textContent = `${savingsRate}%`;
}
