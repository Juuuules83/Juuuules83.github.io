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

// Repère le projet affiché et souligne son lien dans l'index horizontal.
const liensProjet = [...document.querySelectorAll(".project-index a[href^='#']")];
const articlesProjet = liensProjet
  .map((lien) => document.querySelector(lien.getAttribute("href")))
  .filter(Boolean);

if (liensProjet.length && articlesProjet.length && "IntersectionObserver" in window) {
  const marquerProjetActif = (article) => {
    liensProjet.forEach((lien) => {
      const estActif = lien.getAttribute("href") === `#${article.id}`;
      lien.classList.toggle("is-active", estActif);

      if (estActif) {
        lien.setAttribute("aria-current", "location");
      } else {
        lien.removeAttribute("aria-current");
      }
    });
  };

  const observateurProjets = new IntersectionObserver((entrees) => {
    const projetVisible = entrees
      .filter((entree) => entree.isIntersecting)
      .sort((a, b) => {
        const repere = window.innerHeight * 0.3;
        return Math.abs(a.boundingClientRect.top - repere) - Math.abs(b.boundingClientRect.top - repere);
      })[0];

    if (projetVisible) marquerProjetActif(projetVisible.target);
  }, { rootMargin: "-140px 0px -220px 0px", threshold: 0 });

  articlesProjet.forEach((article) => observateurProjets.observe(article));
}
