const FinanceDataStore = {
  // CORE TOTALSS
  totalIncome: 0,
  totalExpenses: 0,
  totalBudget: 0,

  // CATEEGORIES DATA
  categories: {
    food: { name: "Food & Dining", spent: 0, budget: 0, icon: "🍔" },
    transport: { name: "Transport", spent: 0, budget: 0, icon: "🚗" },
    shopping: { name: "Shopping", spent: 0, budget: 0, icon: "🛍️" },
    utilities: { name: "Utilities", spent: 0, budget: 0, icon: "💡" },
    others: { name: "Others", spent: 0, budget: 0, icon: "📦" },
  },

  // ALL TRANSSACTIONS
  transactions: [],

  // CALCULATED DATAA
  get balance() {
    return this.totalIncome - this.totalExpenses;
  },

  get budgetRemaining() {
    return this.totalBudget - this.totalExpenses;
  },

  get budgetUsedPercentage() {
    if (this.totalBudget === 0) return 0;
    return Math.round((this.totalExpenses / this.totalBudget) * 100);
  },

  get hasData() {
    return (
      this.totalIncome > 0 ||
      this.totalExpenses > 0 ||
      this.transactions.length > 0
    );
  },
};
