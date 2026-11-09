// Menu mobile : les liens restent visibles si JavaScript est désactivé.
const boutonMenu = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

if (boutonMenu && navigation) {
  // Les styles du menu ne changent qu'une fois les interactions prêtes.
  document.documentElement.classList.add("js-ready");

  const fermerMenu = () => {
    boutonMenu.setAttribute("aria-expanded", "false");
    boutonMenu.textContent = "Menu";
    navigation.classList.remove("is-open");
  };

  boutonMenu.addEventListener("click", () => {
    const menuOuvert = boutonMenu.getAttribute("aria-expanded") === "true";
    boutonMenu.setAttribute("aria-expanded", String(!menuOuvert));
    boutonMenu.textContent = menuOuvert ? "Menu" : "Fermer";
    navigation.classList.toggle("is-open", !menuOuvert);
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
