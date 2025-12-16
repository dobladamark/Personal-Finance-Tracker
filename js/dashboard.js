// SPENDING CHART
const ctx = document.getElementById("spendingChart");

new Chart(ctx, {
  type: "line",
  data: {
    labels: [
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
    ],
    datasets: [
      {
        label: "Spending",
        data: [
          10000, 11500, 12500, 13400, 13500, 20000, 11000, 14000, 12500, 20000,
          13000, 15000,
        ],
        borderWidth: 3,
        borderColor: "#6C8CFF",
        backgroundColor: "rgba(108,140,255,0.3)",
        pointBackgroundColor: "#6C8CFF",
        pointRadius: 6,
        tension: 0.4,
      },
    ],
  },

  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  },
});

// DONUT CHART
const categoryCtx = document.getElementById("categoryChart");

new Chart(categoryCtx, {
  type: "doughnut",
  data: {
    labels: ["Food", "Transport", "Shopping", "Others"],
    datasets: [
      {
        data: [6040, 2000, 4000, 2960],
        backgroundColor: ["#4B6EF5", "#F25C54", "#F2C94C", "#E0E0E0"],
        borderWidth: 0,
        cutout: "80%",
      },
    ],
  },
  options: {
    plugins: {
      legend: { display: false },
    },
  },
  plugins: [
    {
      id: "center-text",
      beforeDraw(chart) {
        const {
          ctx,
          chartArea: { width, height },
        } = chart;
        ctx.save();
        ctx.font = "bold 24px Roboto";
        ctx.fillStyle = "#2C3E50";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const total = chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
        ctx.fillText(`₱${total.toLocaleString()}`, width / 2, height / 2);
        ctx.font = "14px Roboto";
        ctx.fillStyle = "#6b7280";
        ctx.fillText("Total", width / 2, height / 2 + 30);
      },
    },
  ],
});
