import type { SupportedLang } from "../utils/i18n";

type ProfileStrings = {
  about: string;
  experience: string;
  toolbox: string;
  writing: string;
  contact: string;
  projects: string;
  breakdown: string;
  expandAll: string;
  collapseAll: string;
  printCV: string;
  downloadCV: string;
  openTo: string;
  relocation: string;
  emailLabel: string;
  linkedinLabel: string;
  githubLabel: string;
  cvLabel: string;
  contactCta: string;
};

export const profileI18n: Record<SupportedLang, ProfileStrings> = {
  en: {
    about: "About",
    experience: "Experience",
    toolbox: "Toolbox",
    writing: "Writing / Deep-dives",
    contact: "Contact / Links",
    projects: "Personal projects",
    breakdown: "Technical breakdown",
    expandAll: "Expand all",
    collapseAll: "Collapse all",
    printCV: "Print CV",
    downloadCV: "Download CV",
    openTo: "Open to",
    relocation: "Relocation",
    emailLabel: "Email",
    linkedinLabel: "LinkedIn",
    githubLabel: "GitHub",
    cvLabel: "CV",
    contactCta: "Contact",
  },
  fr: {
    about: "À propos",
    experience: "Expérience",
    toolbox: "Boîte à outils",
    writing: "Écrits / Analyses",
    contact: "Contact / Liens",
    projects: "Projets personnels",
    breakdown: "Analyse technique",
    expandAll: "Tout développer",
    collapseAll: "Tout réduire",
    printCV: "Imprimer CV",
    downloadCV: "Télécharger le CV",
    openTo: "Ouvert à",
    relocation: "Relocalisation",
    emailLabel: "Courriel",
    linkedinLabel: "LinkedIn",
    githubLabel: "GitHub",
    cvLabel: "CV",
    contactCta: "Contacter",
  },
};
