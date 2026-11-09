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

// Les onglets remplacent l'étude de cas affichée sans naviguer vers une ancre.
const selecteurProjets = document.querySelector(".project-index[role='tablist']");
const ongletsProjet = [...document.querySelectorAll(".project-index [role='tab']")];
const panneauxProjet = ongletsProjet
  .map((onglet) => document.getElementById(onglet.getAttribute("aria-controls")))
  .filter(Boolean);

if (selecteurProjets && ongletsProjet.length && panneauxProjet.length === ongletsProjet.length) {
  const sectionProjets = document.querySelector("#projets");

  panneauxProjet.forEach((panneau, index) => {
    panneau.setAttribute("role", "tabpanel");
    panneau.setAttribute("aria-labelledby", ongletsProjet[index].id);
    panneau.tabIndex = 0;
  });

  const afficherProjet = (onglet, replacerEnHaut = false) => {
    const panneauActif = onglet.getAttribute("aria-controls");

    ongletsProjet.forEach((autreOnglet) => {
      const estActif = autreOnglet === onglet;
      autreOnglet.setAttribute("aria-selected", String(estActif));
      autreOnglet.tabIndex = estActif ? 0 : -1;
    });

    panneauxProjet.forEach((panneau) => {
      panneau.hidden = panneau.id !== panneauActif;
    });

    if (replacerEnHaut && sectionProjets) {
      const mouvementReduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      sectionProjets.scrollIntoView({ behavior: mouvementReduit ? "auto" : "smooth", block: "start" });
    }
  };

  ongletsProjet.forEach((onglet) => {
    onglet.addEventListener("click", () => afficherProjet(onglet, true));
  });

  selecteurProjets.addEventListener("keydown", (evenement) => {
    const ongletActif = ongletsProjet.indexOf(document.activeElement);
    let prochainIndex = ongletActif;

    if (evenement.key === "ArrowRight" || evenement.key === "ArrowDown") {
      prochainIndex = (ongletActif + 1) % ongletsProjet.length;
    } else if (evenement.key === "ArrowLeft" || evenement.key === "ArrowUp") {
      prochainIndex = (ongletActif - 1 + ongletsProjet.length) % ongletsProjet.length;
    } else if (evenement.key === "Home") {
      prochainIndex = 0;
    } else if (evenement.key === "End") {
      prochainIndex = ongletsProjet.length - 1;
    } else {
      return;
    }

    evenement.preventDefault();
    const prochainOnglet = ongletsProjet[prochainIndex];
    afficherProjet(prochainOnglet, true);
    prochainOnglet.focus();
  });

  const ongletInitial = ongletsProjet.find((onglet) => onglet.getAttribute("aria-selected") === "true")
    || ongletsProjet[0];
  afficherProjet(ongletInitial);
  selecteurProjets.hidden = false;
}
