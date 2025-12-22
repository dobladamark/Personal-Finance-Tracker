// UTILITY FUNCTIONS REUSABLE HELPERSS

const Utils = {
formatCurrency(amount) {
    return `₱${Math.abs(amount).toLocaleString('en-PH', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    })}`;
  },

};