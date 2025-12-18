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
};
