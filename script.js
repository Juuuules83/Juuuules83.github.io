// Année du pied de page : elle se met à jour automatiquement.
const annee = document.querySelector("#annee");

if (annee) {
  annee.textContent = String(new Date().getFullYear());
}

// Menu mobile : sans JavaScript, les liens de navigation restent visibles.
const boutonMenu = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

if (boutonMenu && navigation) {
  document.documentElement.classList.add("js-ready");

  const fermerMenu = () => {
    boutonMenu.setAttribute("aria-expanded", "false");
    boutonMenu.textContent = "Menu";
    navigation.classList.remove("is-open");
  };

  boutonMenu.addEventListener("click", () => {
    const estOuvert = boutonMenu.getAttribute("aria-expanded") === "true";
    boutonMenu.setAttribute("aria-expanded", String(!estOuvert));
    boutonMenu.textContent = estOuvert ? "Menu" : "Fermer";
    navigation.classList.toggle("is-open", !estOuvert);
  });

  navigation.querySelectorAll("a").forEach((lien) => {
    lien.addEventListener("click", fermerMenu);
  });

  document.addEventListener("keydown", (evenement) => {
    if (evenement.key === "Escape" && boutonMenu.getAttribute("aria-expanded") === "true") {
      fermerMenu();
      boutonMenu.focus();
    }
  });
}
