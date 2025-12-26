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
