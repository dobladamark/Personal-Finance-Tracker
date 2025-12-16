const ctx = document.getElementById("monthlySpendingChart");

new Chart(ctx, {
  type: "bar",
  data: {
    labels: [
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
    ],
    datasets: [
      {
        label: "Expenses",
        data: [2800, 3100, 3500, 3800, 3600, 4000, 3700, 3200, 3000, 2900],
        backgroundColor: [
          "#8a9af2",
          "#8a9af2",
          "#8a9af2",
          "#8a9af2",
          "#8a9af2",
          "#8a9af2",
          "#8a9af2",
          "#8a9af2",
          "#8a9af2",
          "#ff8b8b",
        ],
        borderRadius: 8,
        maxBarThickness: 50,
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `₱${ctx.raw.toLocaleString()}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `₱${value / 1000}k`,
        },
        grid: {
          drawBorder: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  },
});
