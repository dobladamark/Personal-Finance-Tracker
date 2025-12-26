// UTILITY FUNCTIONS REUSABLE HELPERSS

const Utils = {
  formatCurrency(amount) {
    return `₱${Math.abs(amount).toLocaleString("en-PH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  },

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  },

  formatDateShort(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  },

  getMonthName(monthIndex) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[monthIndex];
  },

  getCurrentMonthYear() {
    const now = new Date();
    return `${this.getMonthName(now.getMonth())} ${now.getFullYear()}`;
  },

  // UPDATE FIELD VALUEe (USING DATA-FIELD ATTRIBUTE)
  updateField(fieldName, value) {
    const elements = document.querySelectorAll(`[data-field="${fieldName}"]`);

    elements.forEach((element) => {
      if (fieldName.includes("Percentage")) {
        element.textContent = `${value}%`;
      } else if (fieldName.includes("count") || fieldName.includes("Count")) {
        element.textContent = value;
      } else {
        element.textContent = this.formatCurrency(value);
      }
    });
  },

  toggleEmptyState(emptyStateId, contentId, hasData) {
    const emptyState = document.getElementById(emptyStateId);
    const content = document.getElementById(contentId);

    if (!emptyState || !content) return;

    if (hasData) {
      emptyState.style.display = "none";
      content.style.display = "block";
    } else {
      emptyState.style.display = "flex";
      content.style.display = "none";
    }
  },

  showNotification(message, type = "success") {
    const notification = document.createElement("div");
    notification.className = `notification notification--${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add("show"), 10);

    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  },

  getCategoryIcon(category) {
    const icons = {
      food: "🍔",
      transport: "🚗",
      shopping: "🛍️",
      utilities: "💡",
      others: "📦",
      salary: "💼",
      freelance: "💻",
      business: "🏢",
      investment: "📈",
      rental: "🏠",
      bonus: "🎁",
      refund: "↩️",
      gift: "🎉",
    };
    return icons[category] || "💰";
  },

  getCategoryLabel(category) {
    const labels = {
      food: "Food & Dining",
      transport: "Transport",
      shopping: "Shopping",
      utilities: "Utilities",
      others: "Others",
      salary: "Salary/Wages",
      freelance: "Freelance Work",
      business: "Business Income",
      investment: "Investment Returns",
      rental: "Rental Income",
      bonus: "Bonus/Commission",
      refund: "Refund",
      gift: "Gift/Prize",
    };
    return labels[category] || category;
  },

  validateAmount(amount) {
    const num = parseFloat(amount);
    return !isNaN(num) && num > 0;
  },
  //(YYYY-MM-DD FORMAT)
  getTodayDate() {
    return new Date().toISOString().split("T")[0];
  },

  calculatePercentage(part, total) {
    if (total === 0) return 0;
    return Math.round((part / total) * 100);
  },

  truncateText(text, maxLength = 30) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  },
  //(FOR SEARCH)
  debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

   sortBy(array, property, order = 'asc') {
    return [...array].sort((a, b) => {
      if (order === 'asc') {
        return a[property] > b[property] ? 1 : -1;
      } else {
        return a[property] < b[property] ? 1 : -1;
      }
    });
  },
};
