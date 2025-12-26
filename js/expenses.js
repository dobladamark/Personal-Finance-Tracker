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
