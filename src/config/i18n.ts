export const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  nl: () => import("@/dictionaries/de.json").then((module) => module.default),
};

export const LOCALES = Object.keys(dictionaries);

export const DEFAULT_LOCALE = "en";
