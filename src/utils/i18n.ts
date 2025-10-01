export const SUPPORTED_LANGS = ['en', 'fr'] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];
export const DEFAULT_LANG: SupportedLang = 'en';

export const isSupportedLang = (value: string): value is SupportedLang =>
  SUPPORTED_LANGS.includes(value as SupportedLang);
