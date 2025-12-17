const Navbar = {
  template: `
    <header>
      <nav class="navbar">
        <a href="#"><img src="LOGO_PATH/assets/logo.png" class="logo" alt="logo" /></a>
        <a href="#" class="logo-text">FINANCE TRACKER</a>
        <ul class="nav-list">
          <li class="nav-item"><a href="PATH_PREFIX/index.html" data-page="dashboard">Dashboard</a></li>
          <li class="nav-item"><a href="PATH_PREFIX/pages/budget.html" data-page="budget">Budget</a></li>
          <li class="nav-item"><a href="PATH_PREFIX/pages/expenses.html" data-page="expenses">Expenses</a></li>
          <li class="nav-item"><a href="PATH_PREFIX/pages/reports.html" data-page="reports">Reports</a></li>
        </ul>
      </nav>
    </header>
  `,

  render(currentPage = "", pathPrefix = "") {
    let html = this.template
      .replace(/PATH_PREFIX\//g, pathPrefix)
      .replace("LOGO_PATH/", pathPrefix);

    document.body.insertAdjacentHTML("afterbegin", html);

    if (currentPage) {
      this.setActivePage(currentPage);
    }
  },

  setActivePage(pageName) {
    const links = document.querySelectorAll(".nav-item a");
    links.forEach((link) => {
      if (link.dataset.page === pageName) {
        link.classList.add("active");
        link.parentElement.classList.add("active");
      }
    });
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const currentPage = body.dataset.page;
  const pathPrefix = body.dataset.pathPrefix || "";

  if (currentPage) {
    Navbar.render(currentPage, pathPrefix);
  }
});
