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

function updateRecentTransactions() {
  const container = document.querySelector(".recent-transactions ul");
  if (!container) return;

  container.innerHTML = "";

  const recentTransactions = financeData.getRecentTransactions(3);

  if (recentTransactions.length === 0) {
    container.innerHTML =
      '<li style="text-align: center; padding: 20px; color: #9ca3af;">No transactions yet</li>';
    return;
  }

  recentTransactions.forEach((transaction) => {
    const li = document.createElement("li");
    li.className = "transaction-item";

    const isIncome = transaction.type === "income";
    const sign = isIncome ? "+" : "-";
    const amountClass = isIncome ? "positive" : "negative";

    li.innerHTML = `
      <span class="transaction-icon">${
        transaction.icon || Utils.getCategoryIcon(transaction.category)
      }</span>
      <div class="transaction-details">
        <strong>${transaction.description}</strong>
        <p>${Utils.getCategoryLabel(
          transaction.category
        )} - ${Utils.formatDateShort(transaction.date)}</p>
      </div>
      <span class="transaction-amount ${amountClass}">${sign}${Utils.formatCurrency(
      transaction.amount
    )}</span>
    `;

    container.appendChild(li);
  });
}
