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
  const thisMonthTransactions = Utils.getThisMonthTransactions(
    financeData.transactions
  );
  const expenses = thisMonthTransactions.filter((t) => t.type === "expense");

  const now = new Date();
  const daysInMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
  ).getDate();
  const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
  const avgDaily = daysInMonth > 0 ? totalExpenses / daysInMonth : 0;

  const categories = financeData.getCategorySummary();
  const highestCategory = categories.reduce(
    (max, cat) => (cat.spent > max.spent ? cat : max),
    { spent: 0, name: "None", icon: "📦" }
  );

  const totalTransactions = thisMonthTransactions.length;

  const budgetPercentage = financeData.budgetUsedPercentage;
  let performance = "✓ Good";
  if (budgetPercentage >= 100) performance = "⚠️ Over Budget";
  else if (budgetPercentage >= 90) performance = "⚠️ Warning";
  else if (budgetPercentage >= 75) performance = "→ Moderate";

  const avgDailyEl = document.querySelector(".card--blue .card__value");
  const avgDailyFooter = document.querySelector(".card--blue .card__footer");

  const highestCatEl = document.querySelector(".card--yellow .card__value");
  const highestCatFooter = document.querySelector(
    ".card--yellow .card__footer"
  );

  const totalTransEl = document.querySelector(".card--purple .card__value");

  const performanceEl = document.querySelector(".card--green .card__value");
  const performanceFooter = document.querySelector(
    ".card--green .card__footer"
  );

  if (avgDailyEl) avgDailyEl.textContent = Utils.formatCurrency(avgDaily);
  if (avgDailyFooter)
    avgDailyFooter.textContent = `Based on ${daysInMonth} days`;

  if (highestCatEl)
    highestCatEl.textContent = `${highestCategory.icon}${highestCategory.name}`;
  if (highestCatFooter && highestCategory.spent > 0) {
    const percentage = Utils.calculatePercentage(
      highestCategory.spent,
      totalExpenses
    );
    highestCatFooter.textContent = `${Utils.formatCurrency(
      highestCategory.spent
    )} (${percentage}% of Total)`;
  }

  if (totalTransEl) totalTransEl.textContent = totalTransactions;

  if (performanceEl) performanceEl.textContent = performance;
  if (performanceFooter)
    performanceFooter.textContent =
      budgetPercentage > 0
        ? `${budgetPercentage}% of budget used`
        : "Set budgets to track";
}

function updateMonthlySpendingChart() {
  const canvas = document.getElementById("monthlySpendingChart");
  if (!canvas) return;

  const monthlyExpenses = financeData.getMonthlyExpenses();
  const now = new Date();

  const labels = [];
  const data = [];

  for (let i = 9; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthKey = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}`;
    const monthName = date.toLocaleDateString("en-US", { month: "short" });

    labels.push(monthName);
    data.push(monthlyExpenses[monthKey] || 0);
  }

  const backgroundColor = data.map((_, index) =>
    index === data.length - 1 ? "#ff8b8b" : "#8a9af2"
  );

  const existingChart = Chart.getChart(canvas);
  if (existingChart) {
    existingChart.data.labels = labels;
    existingChart.data.datasets[0].data = data;
    existingChart.data.datasets[0].backgroundColor = backgroundColor;
    existingChart.update();
  } else {
    new Chart(canvas, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Expenses",
            data: data,
            backgroundColor: backgroundColor,
            borderRadius: 8,
            maxBarThickness: 50,
          },
        ],
      },
      options: {
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => `₱${ctx.raw.toLocaleString()}`,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => `₱${value / 1000}k`,
            },
            grid: { drawBorder: false },
          },
          x: { grid: { display: false } },
        },
      },
    });
  }
}
