// INITIALIZE PAGE
document.addEventListener("DOMContentLoaded", () => {
  console.log("📊 REPORTS PAGE LOADING...");

  updateIncomeSummary();
  updateFinancialSummary();
  updateMonthlySpendingChart();
  setupFilters();
  setupExportButton();

  console.log("✅ REPORTS PAGE READY");
});

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

function setupFilters() {
  const periodFilter = document.querySelector(".filter-pill select");
  const categoryFilter = document.querySelectorAll(".filter-pill select")[1];
  const generateBtn = document.querySelector(".generate-btn");

  if (generateBtn) {
    generateBtn.addEventListener("click", () => {
      const period = periodFilter ? periodFilter.value : "This Month";
      const category = categoryFilter ? categoryFilter.value : "Category: All";

      Utils.showNotification(
        `Generating report for ${period} - ${category}...`,
        "info"
      );

      setTimeout(() => {
        applyFilters(period, category);
        Utils.showNotification("Report generated! 📊", "success");
      }, 500);
    });
  }
}

function applyFilters(period, category) {
  let filteredTransactions = [...financeData.transactions];

  const now = new Date();
  switch (period) {
    case "This Month":
      filteredTransactions =
        Utils.getThisMonthTransactions(filteredTransactions);
      break;
    case "Last Month":
      filteredTransactions =
        Utils.getLastMonthTransactions(filteredTransactions);
      break;
    case "This Year":
      filteredTransactions = filteredTransactions.filter((t) => {
        const date = new Date(t.date);
        return date.getFullYear() === now.getFullYear();
      });
      break;
  }

  if (category && category !== "Category: All") {
    const cat = category.toLowerCase();
    filteredTransactions = filteredTransactions.filter(
      (t) => t.category === cat
    );
  }

  console.log(`Filtered ${filteredTransactions.length} transactions`);

  const income = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const incomeBox = document.querySelector(".summary-box.income h2");
  const expenseBox = document.querySelector(".summary-box.expense h2");
  const savingsBox = document.querySelector(".summary-box.savings h2");
  const savingsRateBox = document.querySelector(".savings-rate strong");

  if (incomeBox) incomeBox.textContent = Utils.formatCurrency(income);
  if (expenseBox) expenseBox.textContent = Utils.formatCurrency(expenses);
  if (savingsBox)
    savingsBox.textContent = Utils.formatCurrency(income - expenses);

  const savingsRate =
    income > 0 ? (((income - expenses) / income) * 100).toFixed(1) : 0;
  if (savingsRateBox) savingsRateBox.textContent = `${savingsRate}%`;
}

function setupExportButton() {
  const exportBtn = document.querySelector(".export-btn");

  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      exportToCSV();
    });
  }
}

// EXPORT TO CSV
function exportToCSV() {
  const transactions = financeData.transactions;

  if (transactions.length === 0) {
    Utils.showNotification("No data to export", "warning");
    return;
  }

  const periodFilter = document.querySelector(".filter-pill select");
  const categoryFilter = document.querySelectorAll(".filter-pill select")[1];

  let filteredTransactions = [...transactions];
  let filename = "finance-report";

  if (periodFilter && periodFilter.value !== "Select Period") {
    const period = periodFilter.value;
    filename += `-${period.toLowerCase().replace(" ", "-")}`;

    const now = new Date();
    switch (period) {
      case "This Month":
        filteredTransactions =
          Utils.getThisMonthTransactions(filteredTransactions);
        break;
      case "Last Month":
        filteredTransactions =
          Utils.getLastMonthTransactions(filteredTransactions);
        break;
      case "This Year":
        filteredTransactions = filteredTransactions.filter((t) => {
          const date = new Date(t.date);
          return date.getFullYear() === now.getFullYear();
        });
        break;
    }
  }

  if (categoryFilter && categoryFilter.value !== "Category: All") {
    const category = categoryFilter.value.toLowerCase();
    filename += `-${category}`;
    filteredTransactions = filteredTransactions.filter(
      (t) => t.category === category
    );
  }

  filteredTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

  let csv = "Date,Type,Category,Description,Amount,Payment Method,Notes\n";

  filteredTransactions.forEach((t) => {
    csv += `${t.date},${t.type},${Utils.getCategoryLabel(t.category)},"${
      t.description
    }",${t.amount},${t.paymentMethod || "N/A"},"${t.notes || ""}"\n`;
  });

  csv += "\n";
  csv += "SUMMARY\n";

  const totalIncome = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  csv += `Total Income,,,₱${totalIncome.toLocaleString()}\n`;
  csv += `Total Expenses,,,₱${totalExpenses.toLocaleString()}\n`;
  csv += `Net Balance,,,₱${(totalIncome - totalExpenses).toLocaleString()}\n`;
  csv += `Total Transactions,,,${filteredTransactions.length}\n`;

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}-${Utils.getTodayDate()}.csv`;
  link.click();
  URL.revokeObjectURL(url);

  Utils.showNotification(
    `CSV exported! ${filteredTransactions.length} transactions 📥`,
    "success"
  );
}

window.addEventListener("focus", () => {
  updateIncomeSummary();
  updateFinancialSummary();
  updateMonthlySpendingChart();
});
