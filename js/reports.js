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


function updateFinancialSummary() {
  const thisMonthTransactions = Utils.getThisMonthTransactions(financeData.transactions);
  const expenses = thisMonthTransactions.filter(t => t.type === 'expense');
  
  // AVERAGE DAILY SPENDING
  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
  const avgDaily = daysInMonth > 0 ? totalExpenses / daysInMonth : 0;
  
  // HIGHEST CATEGORY
  const categories = financeData.getCategorySummary();
  const highestCategory = categories.reduce((max, cat) => 
    cat.spent > max.spent ? cat : max, 
    { spent: 0, name: 'None', icon: '📦' }
  );
  
  // TOTAL TRANSACTIONS
  const totalTransactions = thisMonthTransactions.length;
  
  // BUDGET PERFORMANCE
  const budgetPercentage = financeData.budgetUsedPercentage;
  let performance = '✓ Good';
  if (budgetPercentage >= 100) performance = '⚠️ Over Budget';
  else if (budgetPercentage >= 90) performance = '⚠️ Warning';
  else if (budgetPercentage >= 75) performance = '→ Moderate';
  
  // UPDATE DOM
  const avgDailyEl = document.querySelector('.card--blue .card__value');
  const avgDailyFooter = document.querySelector('.card--blue .card__footer');
  
  const highestCatEl = document.querySelector('.card--yellow .card__value');
  const highestCatFooter = document.querySelector('.card--yellow .card__footer');
  
  const totalTransEl = document.querySelector('.card--purple .card__value');
  
  const performanceEl = document.querySelector('.card--green .card__value');
  const performanceFooter = document.querySelector('.card--green .card__footer');
  
  if (avgDailyEl) avgDailyEl.textContent = Utils.formatCurrency(avgDaily);
  if (avgDailyFooter) avgDailyFooter.textContent = `Based on ${daysInMonth} days`;
  
  if (highestCatEl) highestCatEl.textContent = `${highestCategory.icon}${highestCategory.name}`;
  if (highestCatFooter && highestCategory.spent > 0) {
    const percentage = Utils.calculatePercentage(highestCategory.spent, totalExpenses);
    highestCatFooter.textContent = `${Utils.formatCurrency(highestCategory.spent)} (${percentage}% of Total)`;
  }
  
  if (totalTransEl) totalTransEl.textContent = totalTransactions;
  
  if (performanceEl) performanceEl.textContent = performance;
  if (performanceFooter) performanceFooter.textContent = budgetPercentage > 0 ? `${budgetPercentage}% of budget used` : 'Set budgets to track';
}