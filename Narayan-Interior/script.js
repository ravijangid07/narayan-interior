document.addEventListener("DOMContentLoaded", async () => {
  const components = {
    navbar: "Navbar",
    hero: "Hero",
    about: "About",
    services: "Services",
    projects: "Projects",
    strengths: "Strengths",
    company: "Company",
    clients: "Clients",
    contact: "Contact",
    footer: "Footer"
  };

  for (const [id, fileName] of Object.entries(components)) {
    const container = document.getElementById(id);

    if (!container) continue;

    try {
      const response = await fetch(`components/${fileName}.html`);

      if (!response.ok) {
        throw new Error(`Unable to load ${fileName}.html`);
      }

      container.innerHTML = await response.text();
    } catch (error) {
      console.error(error);
      container.innerHTML = "";
    }
  }

  initializeWebsite();
});


function initializeWebsite() {

  // Mobile menu
  const menuButton = document.querySelector(".menu-button");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", () => {

      const isOpen =
        menuButton.getAttribute("aria-expanded") === "true";

      menuButton.setAttribute(
        "aria-expanded",
        String(!isOpen)
      );

      mobileMenu.classList.toggle(
        "is-open",
        !isOpen
      );

      document.body.classList.toggle(
        "menu-open",
        !isOpen
      );
    });


    mobileMenu.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

        mobileMenu.classList.remove("is-open");

        document.body.classList.remove("menu-open");
      });

    });
  }


  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  // Current year
  document.querySelectorAll("[data-current-year]")
    .forEach(element => {
      element.textContent = new Date().getFullYear();
    });

}