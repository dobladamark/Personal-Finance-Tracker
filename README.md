# 💰 Personal Finance Tracker

A modern, intuitive web application for managing personal finances with real-time tracking, budget management, and comprehensive reporting features.

![Finance Tracker](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 🌟 Features

### 📊 **Dashboard**
- Real-time overview of monthly income, expenses, and balance
- Interactive spending trends chart (12-month view)
- Category breakdown with donut chart visualization
- Recent transactions list
- Monthly budget utilization tracking

### 💵 **Income Management**
- Add, edit, and delete income entries
- Multiple income source categories (Salary, Freelance, Business, Investment, etc.)
- Income source breakdown and analytics
- Filter by source type and time period
- Track average income and last received amount

### 🎯 **Budget Tracking**
- Set monthly budgets per category
- Real-time progress bars with color-coded alerts (Green → Blue → Orange → Red)
- Visual spending indicators
- Over-budget warnings
- Edit budgets anytime

### 💸 **Expense Tracking**
- Quick expense entry with detailed categorization
- Search and filter capabilities
- Edit and delete existing expenses
- Payment method tracking
- Optional notes for each transaction

### 📈 **Reports & Analytics**
- Monthly spending comparison charts
- Income vs Expenses analysis
- Financial summary cards (Average daily spending, highest category, etc.)
- Savings rate calculation
- **CSV Export** - Download filtered transaction data
- Custom date range and category filtering

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server or backend required - runs entirely in the browser!

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/yourusername/finance-tracker.git
   cd finance-tracker
```

2. **Open the application**
```bash
   # Simply open index.html in your browser
   # Or use a local server:
   
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js (with npx)
   npx http-server
```

3. **Access the app**
   - Open `http://localhost:8000` in your browser
   - Or directly open `index.html` file

### Quick Start Guide

1. **Set Your Budget**
   - Navigate to the Budget page
   - Click "+ Set Budget"
   - Choose a category and enter your monthly budget limit
   - Click "Set Budget"

2. **Add Income**
   - Go to the Income page
   - Fill in the amount, source, and description
   - Click "Add Income"

3. **Track Expenses**
   - Navigate to the Expenses page
   - Enter expense details
   - Click "Add Expense"

4. **View Reports**
   - Check the Dashboard for overview
   - Visit Reports page for detailed analytics
   - Export data to CSV for external analysis

## 📁 Project Structure
```
finance-tracker/
├── index.html              # Dashboard page
├── pages/
│   ├── income.html        # Income management
│   ├── budget.html        # Budget tracking
│   ├── expenses.html      # Expense tracking
│   └── reports.html       # Analytics & reports
├── css/
│   └── style.css          # All styles
├── js/
│   ├── data.js           # Central data store
│   ├── utils.js          # Helper functions
│   ├── dashboard.js      # Dashboard logic
│   ├── income.js         # Income page logic
│   ├── budget.js         # Budget page logic
│   ├── expenses.js       # Expenses page logic
│   ├── reports.js        # Reports page logic
│   └── navbar.js         # Navigation component
└── assets/
    └── logo.png          # Application logo
```

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Charts**: Chart.js v4.4.0
- **Data Storage**: Browser LocalStorage API
- **Design**: Custom CSS with modern UI/UX principles

## 💾 Data Storage

All data is stored locally in your browser using the LocalStorage API:
- ✅ No server required
- ✅ Data persists between sessions
- ✅ Privacy-focused (data never leaves your device)
- ✅ Export functionality for backup

### Backup Your Data

1. Go to Reports page
2. Click "Export CSV" to download transaction history
3. Alternatively, open browser console and run:
```javascript
   financeData.exportData(); // Downloads JSON backup
```

### Clear All Data

Open browser console and run:
```javascript
financeData.reset(); // Clears all data (cannot be undone)
```

## 📱 Browser Compatibility

| Browser | Supported Version |
|---------|------------------|
| Chrome  | ✅ 90+           |
| Firefox | ✅ 88+           |
| Safari  | ✅ 14+           |
| Edge    | ✅ 90+           |
| Opera   | ✅ 76+           |

## 🎨 Features Breakdown

### Dashboard
- Monthly income/expense overview
- Balance calculation
- Budget utilization percentage
- 12-month spending trend chart
- Category breakdown donut chart
- Recent transactions (last 3)

### Income Page
- Quick add income form
- Income sources: Salary, Freelance, Business, Investment, Bonus, Gift
- Income breakdown by source
- Filter by source and time period
- Edit/delete existing entries
- Average income calculation

### Budget Page
- Set monthly budgets per category
- Real-time spending vs budget tracking
- Color-coded progress bars:
  - 🟢 Green (0-49%): On track
  - 🔵 Blue (50-74%): Moderate
  - 🟠 Orange (75-89%): Warning
  - 🔴 Red (90%+): Over budget
- Edit budgets anytime
- Over-budget alerts

### Expenses Page
- Quick expense entry
- Categories: Food, Transport, Shopping, Utilities, Others
- Search expenses by description/category
- Filter by category
- Edit/delete expenses
- Payment method tracking

### Reports Page
- Monthly spending bar chart (10 months)
- Income vs Expenses comparison
- Net savings calculation
- Savings rate percentage
- Financial summary cards:
  - Average daily spending
  - Highest spending category
  - Total transactions count
  - Budget performance
- CSV export with filters
- Generate custom reports

## 🔒 Privacy & Security

- **100% Local**: All data stays on your device
- **No Tracking**: No analytics or tracking scripts
- **No Account Required**: No registration or login needed
- **Offline Capable**: Works without internet (after first load)

## 🐛 Known Issues & Limitations

- Data is stored per browser (not synced across devices)
- No cloud backup (manual export required)
- Maximum localStorage limit (~5-10MB depending on browser)
- No multi-currency support (PHP only)

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style and conventions
- Test thoroughly before submitting
- Update documentation for new features
- Keep functions small and focused
- Use meaningful variable names

## 📝 Future Enhancements

- [ ] Multi-currency support
- [ ] Dark mode toggle
- [ ] Recurring transactions automation
- [ ] Cloud sync option
- [ ] Mobile app version
- [ ] Password protection
- [ ] Bill reminders
- [ ] Financial goals tracking
- [ ] Investment portfolio tracking
- [ ] Multi-user accounts

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com
- Portfolio: [yourportfolio.com](https://yourportfolio.com)

## 🙏 Acknowledgments

- Chart.js for beautiful chart visualizations
- Font Awesome for icons (if used)
- Inspiration from popular finance apps like Mint, YNAB, and Wallet

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/yourusername/finance-tracker/issues) page
2. Open a new issue with detailed description
3. Contact: your.email@example.com

## 🌟 Show Your Support

Give a ⭐️ if this project helped you manage your finances better!

---

**Made with ❤️ for better financial management**
