function setupIncomeForm() {
  const form = document.getElementById("income-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const amount = parseFloat(document.getElementById("income-amount").value);
    const source = document.getElementById("income-source").value;
    const description = document.getElementById("income-description").value;
    const date = document.getElementById("income-date").value;
    const payment = document.getElementById("income-payment").value;
    const notes = document.getElementById("income-notes").value;

    if (!amount || amount <= 0) {
      Utils.showNotification("Please enter a valid amount", "error");
      return;
    }

    if (!source) {
      Utils.showNotification("Please select income source", "error");
      return;
    }

    const transaction = {
      type: "income",
      amount: amount,
      category: source,
      description: description,
      date: date,
      paymentMethod: payment || "Bank",
      notes: notes,
      icon: Utils.getCategoryIcon(source),
    };

    const result = financeData.addTransaction(transaction);

    if (result) {
      Utils.showNotification("Income added successfully! 💰", "success");
      form.reset();
      Utils.setDateToToday("income-date");
      updateIncomePage();
    } else {
      Utils.showNotification("Failed to add income", "error");
    }
  });
}

function updateIncomePage() {
  updateSummaryCards();
  updateIncomeBreakdown();
  displayIncomeList();
}

function updateSummaryCards() {
  const incomes = financeData.getTransactionsByType("income");

  Utils.updateField("totalIncome", financeData.totalIncome);

  const sources = new Set(incomes.map((t) => t.category));
  const sourcesEl = document.getElementById("income-sources-count");
  if (sourcesEl) sourcesEl.textContent = sources.size;

  const avgIncome =
    incomes.length > 0 ? financeData.totalIncome / incomes.length : 0;
  const avgEl = document.getElementById("average-income");
  if (avgEl) avgEl.textContent = Utils.formatCurrency(avgIncome);

  if (incomes.length > 0) {
    const lastIncome = incomes[0];
    const amountEl = document.getElementById("last-income-amount");
    const dateEl = document.getElementById("last-income-date");
    if (amountEl)
      amountEl.textContent = Utils.formatCurrency(lastIncome.amount);
    if (dateEl) dateEl.textContent = Utils.formatDate(lastIncome.date);
  }
}

function updateIncomeBreakdown() {
  const container = document.getElementById("income-breakdown");
  if (!container) return;

  const incomes = financeData.getTransactionsByType("income");

  if (incomes.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 20px;">
        <div style="font-size: 50px; opacity: 0.3; margin-bottom: 10px;">📊</div>
        <p style="color: #9ca3af; margin: 0;">No income data yet</p>
      </div>
    `;
    return;
  }

  const breakdown = {};
  incomes.forEach((income) => {
    if (!breakdown[income.category]) {
      breakdown[income.category] = { total: 0, count: 0, icon: income.icon };
    }
    breakdown[income.category].total += income.amount;
    breakdown[income.category].count++;
  });

  const sorted = Object.entries(breakdown).sort(
    (a, b) => b[1].total - a[1].total
  );

  container.innerHTML = sorted
    .map(([source, data]) => {
      const percentage = Utils.calculatePercentage(
        data.total,
        financeData.totalIncome
      );
      return `
      <div class="breakdown-item">
        <div class="breakdown-info">
          <div class="breakdown-icon">${data.icon}</div>
          <div class="breakdown-details">
            <h4>${Utils.getCategoryLabel(source)}</h4>
            <p>${data.count} ${data.count === 1 ? "entry" : "entries"}</p>
          </div>
        </div>
        <div class="breakdown-amount">
          <span class="amount">${Utils.formatCurrency(data.total)}</span>
          <span class="percentage">${percentage}%</span>
        </div>
      </div>
    `;
    })
    .join("");
}

function displayIncomeList() {
  applyFilters();
}


function applyFilters() {
  const container = document.getElementById('income-list');
  let incomes = financeData.getTransactionsByType('income');


  const sourceFilter = document.getElementById('filter-source').value;
  if (sourceFilter) {
    incomes = incomes.filter(t => t.category === sourceFilter);
  }


  const periodFilter = document.getElementById('filter-period').value;
  if (periodFilter !== 'all') {
    const now = new Date();
    incomes = incomes.filter(t => {
      const transactionDate = new Date(t.date);
      switch (periodFilter) {
        case 'this-month':
          return transactionDate.getMonth() === now.getMonth() &&
                 transactionDate.getFullYear() === now.getFullYear();
        case 'last-month':
          const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);
          return transactionDate.getMonth() === lastMonth.getMonth() &&
                 transactionDate.getFullYear() === lastMonth.getFullYear();
        case 'this-year':
          return transactionDate.getFullYear() === now.getFullYear();
        default:
          return true;
      }
    });
  }

  if (incomes.length === 0) {
    container.innerHTML = `
      <div class="no-data">
        <div class="no-data__icon">💵</div>
        <p class="no-data__text">No income entries found for selected filters.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = incomes.map(income => `
    <div class="income-item">
      <div class="income-item-info">
        <div class="income-icon">${income.icon}</div>
        <div class="income-details">
          <h4>${income.description}</h4>
          <p>${getIncomeSourceLabel(income.category)} • ${Utils.formatDate(income.date)}</p>
        </div>
      </div>
      <span class="income-amount">+${Utils.formatCurrency(income.amount)}</span>
      <div class="income-actions">
        <button class="btn-icon edit" onclick="openEditModal(${income.id})" title="Edit">
          ✏️
        </button>
        <button class="btn-icon delete" onclick="deleteIncome(${income.id})" title="Delete">
          🗑️
        </button>
      </div>
    </div>
  `).join('');
}