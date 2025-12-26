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
    
    elements.forEach(element => {
      if (fieldName.includes('Percentage')) {
        element.textContent = `${value}%`;
      } else if (fieldName.includes('count') || fieldName.includes('Count')) {
        element.textContent = value;
      } else {
        element.textContent = this.formatCurrency(value);
      }
    });
  },
};
