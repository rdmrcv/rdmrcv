import type { SupportedLang } from '../utils/i18n';

type ProfileStrings = {
  about: string;
  highlights: string;
  experience: string;
  toolbox: string;
  writing: string;
  contact: string;
  projects: string;
  breakdown: string;
  expandAll: string;
  collapseAll: string;
  printCV: string;
  openTo: string;
  relocation: string;
  emailLabel: string;
  linkedinLabel: string;
  githubLabel: string;
  cvLabel: string;
  contactCta: string;
  heroAltPrefix: string;
};

export const profileI18n: Record<SupportedLang, ProfileStrings> = {
  en: {
    about: 'About',
    highlights: 'Highlights',
    experience: 'Experience',
    toolbox: 'Toolbox',
    writing: 'Writing / Deep-dives',
    contact: 'Contact / Links',
    projects: 'Personal projects',
    breakdown: 'Technical breakdown',
    expandAll: 'Expand all',
    collapseAll: 'Collapse all',
    printCV: 'Print CV',
    openTo: 'Open to',
    relocation: 'Relocation',
    emailLabel: 'Email',
    linkedinLabel: 'LinkedIn',
    githubLabel: 'GitHub',
    cvLabel: 'CV',
    contactCta: 'Contact',
    heroAltPrefix: 'Portrait of'
  },
  fr: {
    about: 'À propos',
    highlights: 'Points forts',
    experience: 'Expérience',
    toolbox: 'Boîte à outils',
    writing: 'Écrits / Analyses',
    contact: 'Contact / Liens',
    projects: 'Projets personnels',
    breakdown: 'Analyse technique',
    expandAll: 'Tout développer',
    collapseAll: 'Tout réduire',
    printCV: 'Imprimer CV',
    openTo: 'Ouvert à',
    relocation: 'Relocalisation',
    emailLabel: 'Courriel',
    linkedinLabel: 'LinkedIn',
    githubLabel: 'GitHub',
    cvLabel: 'CV',
    contactCta: 'Contacter',
    heroAltPrefix: 'Portrait de'
  }
};
