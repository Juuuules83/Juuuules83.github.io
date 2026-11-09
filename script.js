// Menu mobile : la navigation reste visible si JavaScript est désactivé.
const boutonMenu = document.querySelector(".menu-toggle");
const liensNavigation = document.querySelector(".site-nav__links");

if (boutonMenu && liensNavigation) {
  // La classe n'est ajoutée qu'une fois le menu interactif prêt.
  document.documentElement.classList.add("js-ready");

  const fermerMenu = () => {
    boutonMenu.setAttribute("aria-expanded", "false");
    liensNavigation.classList.remove("is-open");
  };

  boutonMenu.addEventListener("click", () => {
    const menuOuvert = boutonMenu.getAttribute("aria-expanded") === "true";
    boutonMenu.setAttribute("aria-expanded", String(!menuOuvert));
    liensNavigation.classList.toggle("is-open", !menuOuvert);
  });

  liensNavigation.querySelectorAll("a").forEach((lien) => {
    lien.addEventListener("click", fermerMenu);
  });

  document.addEventListener("keydown", (evenement) => {
    if (evenement.key === "Escape") {
      fermerMenu();
      boutonMenu.focus();
    }
  });

  // Ferme le menu si la fenêtre repasse au format ordinateur.
  window.matchMedia("(min-width: 52.01rem)").addEventListener("change", (evenement) => {
    if (evenement.matches) fermerMenu();
  });
}
