// INITIALIZE PAGE
document.addEventListener("DOMContentLoaded", () => {
  console.log("💸 EXPENSES PAGE LOADING...");

  // SET TODAY'S DATE
  const dateInput = document.querySelector('input[type="date"]');
  if (dateInput) {
    dateInput.valueAsDate = new Date();
  }

  console.log("✅ EXPENSES PAGE READY");
});

function setupExpenseForm() {
  const form = document.querySelector(".add-expense-card form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // GET FORM VALUES
    const amountInput = form.querySelector('input[type="number"]');
    const categorySelect = form.querySelector("select");
    const descriptionInput = form.querySelector('input[type="text"]');
    const dateInput = form.querySelector('input[type="date"]');
    const paymentInput = form.querySelectorAll('input[type="text"]')[1];
    const notesTextarea = form.querySelector("textarea");

    const amount = parseFloat(amountInput.value);
    const category = categorySelect.value.toLowerCase();
    const description = descriptionInput.value;
    const date = dateInput.value;
    const payment = paymentInput.value;
    const notes = notesTextarea.value;

    // VALIDATE
    if (!amount || amount <= 0) {
      Utils.showNotification("Please enter a valid amount", "error");
      return;
    }

    if (!category || category === "select category") {
      Utils.showNotification("Please select a category", "error");
      return;
    }

    if (!description.trim()) {
      Utils.showNotification("Please enter a description", "error");
      return;
    }

    if (!date) {
      Utils.showNotification("Please select a date", "error");
      return;
    }

    //CREATE
    const transaction = {
      type: "expense",
      amount: amount,
      category: category,
      description: description,
      date: date,
      paymentMethod: payment || "Cash",
      notes: notes,
      icon: Utils.getCategoryIcon(category),
    };

    // ADD TO DATA STORE
    const result = financeData.addTransaction(transaction);

    if (result) {
      Utils.showNotification("Expense added successfully! 💸", "success");

      form.reset();
      dateInput.valueAsDate = new Date();

      // REFRESH EXPENSE LIST
      displayAllExpenses();

      // SCROLL TO TOP
      const expenseList = document.querySelector(".all-expenses-card");
      if (expenseList) {
        expenseList.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      Utils.showNotification("Failed to add expense", "error");
    }
  });
}

function displayAllExpenses() {
  const container = document.querySelector(".all-expenses-card");
  if (!container) return;

  // REMOVE OLD EXPENSE ITEM
  const oldItems = container.querySelectorAll(".expense-item");
  oldItems.forEach((item) => item.remove());

  // GET EXPENSES
  let expenses = financeData.getTransactionsByType("expense");

  //ACTIVE FILTERS
  const searchInput = document.querySelector(
    '.expenses-header input[type="text"]'
  );
  const filterSelect = document.querySelector(".expenses-header select");

  if (searchInput && searchInput.value.trim()) {
    const searchTerm = searchInput.value.toLowerCase();
    expenses = expenses.filter(
      (e) =>
        e.description.toLowerCase().includes(searchTerm) ||
        e.category.toLowerCase().includes(searchTerm)
    );
  }

  if (
    filterSelect &&
    filterSelect.value &&
    filterSelect.value !== "Filter by category"
  ) {
    const filterCategory = filterSelect.value.toLowerCase();
    expenses = expenses.filter((e) => e.category === filterCategory);
  }

  // CHECK IF EMPTY
  if (expenses.length === 0) {
    const emptyDiv = document.createElement("div");
    emptyDiv.className = "expense-item";
    emptyDiv.style.background = "#f9fafb";
    emptyDiv.style.textAlign = "center";
    emptyDiv.style.padding = "40px";
    emptyDiv.innerHTML =
      '<p style="color: #9ca3af; margin: 0;">No expenses found</p>';
    container.appendChild(emptyDiv);
    return;
  }

  // SORT BY DATE (NEWEST FIRST)
  expenses.sort((a, b) => new Date(b.date) - new Date(a.date));

  // DISPLAY EXPENSES
  expenses.forEach((expense) => {
    const item = document.createElement("div");
    item.className = "expense-item";
    item.dataset.id = expense.id;

    item.innerHTML = `
      <div class="expense-info">
        <h4>${expense.icon || Utils.getCategoryIcon(expense.category)} ${
      expense.description
    }</h4>
        <p>${Utils.getCategoryLabel(expense.category)} • ${Utils.formatDate(
      expense.date
    )}</p>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <span class="amount negative">- ${Utils.formatCurrency(
          expense.amount
        )}</span>
        <button class="btn-icon edit" onclick="editExpense(${
          expense.id
        })" title="Edit">✏️</button>
        <button class="btn-icon delete" onclick="deleteExpense(${
          expense.id
        })" title="Delete">🗑️</button>
      </div>
    `;

    container.appendChild(item);
  });
}
