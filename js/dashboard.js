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


function updateSpendingChart() {
  const canvas = document.getElementById('spendingChart');
  if (!canvas) return;
  
         
  const monthlyExpenses = financeData.getMonthlyExpenses();
  
  // LAST 12 MONTHS
  const months = [];
  const data = [];
  const now = new Date();
  
  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    months.push(Utils.getMonthName(date.getMonth()));
    data.push(monthlyExpenses[monthKey] || 0);
  }
  
  // CREATE OR UPDATE CHART
  const existingChart = Chart.getChart(canvas);
  if (existingChart) {
    existingChart.data.labels = months;
    existingChart.data.datasets[0].data = data;
    existingChart.update();
  } else {
    new Chart(canvas, {
      type: 'line',
      data: {
        labels: months,
        datasets: [{
          label: 'Spending',
          data: data,
          borderWidth: 3,
          borderColor: '#6C8CFF',
          backgroundColor: 'rgba(108,140,255,0.3)',
          pointBackgroundColor: '#6C8CFF',
          pointRadius: 6,
          tension: 0.4,
        }],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            grid: { display: false },
            ticks: {
              callback: (value) => `₱${value.toLocaleString()}`
            }
          },
          x: { grid: { display: false } }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => `₱${ctx.raw.toLocaleString()}`
            }
          }
        },
      },
    });
  }
}



