import { DEFAULT_LOCALE, dictionaries } from "@/config/i18n";
import { Locale } from "@/types/locale.type";

const getDictionary = async (locale: Locale) => {
  if (!dictionaries[locale]) return dictionaries[DEFAULT_LOCALE]();
  return dictionaries[locale]();
};

export default getDictionary;
