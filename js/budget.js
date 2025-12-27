// INITIALIZE PAGE
document.addEventListener("DOMContentLoaded", () => {
  console.log("🎯 BUDGET PAGE LOADING...");

  console.log("✅ BUDGET PAGE READY");
});

function displayCategoryBudgets() {
  const container = document.querySelector(".budg-percentage");
  if (!container) return;

  container.innerHTML = "";

  const categories = financeData.getCategorySummary();
  const hasBudgets = categories.some((cat) => cat.budget > 0);

  if (!hasBudgets) {
    container.innerHTML = `
      <div style="text-align: center; padding: 60px 20px;">
        <div style="font-size: 60px; margin-bottom: 20px;">🎯</div>
        <h3 style="color: #2c3e50; margin-bottom: 10px;">No Budgets Set</h3>
        <p style="color: #6b7280; margin-bottom: 20px;">
          Set budgets for different categories to track your spending
        </p>
        <button onclick="openBudgetModal()" class="btn" style="background: #4a6cf7; color: white; padding: 12px 24px; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">
          Set Your First Budget
        </button>
      </div>
    `;
    return;
  }

  categories.forEach((category) => {
    const percentage = category.percentage;
    const remaining = category.remaining;
    const isOverBudget = remaining < 0;

    let barColor = "#10b981";
    if (percentage >= 90) barColor = "#ef4444";
    else if (percentage >= 75) barColor = "#f59e0b";
    else if (percentage >= 50) barColor = "#3b82f6";

    const item = document.createElement("div");
    item.className = "budg-percentage-item";

    item.innerHTML = `
      <span class="budgcat-icon-cards">${category.icon}</span>
      <div class="budg-text-content">
        <h4>${category.name}</h4>
        <p>₱${category.spent.toLocaleString()} of ₱${category.budget.toLocaleString()}</p>
        ${
          isOverBudget
            ? `<p style="color: #ef4444; font-size: 12px; margin-top: 4px;">Over by ₱${Math.abs(
                remaining
              ).toLocaleString()}</p>`
            : ""
        }
      </div>
      <div class="budg-progress-wrapper">
        <div class="budg-progress-bar">
          <div class="budg-progress-fill" style="width: ${Math.min(
            percentage,
            100
          )}%; background-color: ${barColor};"></div>
        </div>
      </div>
      <span class="budg-percentage" style="color: ${barColor};">${percentage}%</span>
      <button class="btn-icon edit" onclick="editCategoryBudget('${
        category.id
      }')" title="Edit Budget" style="margin-left: 12px;">✏️</button>
    `;

    container.appendChild(item);
  });
}
