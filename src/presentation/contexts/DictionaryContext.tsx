"use client";

import { Dictionary } from "@/types/dictionary.type";
import { Locale } from "@/types/locale.type";
import React from "react";

const DictionaryContext = React.createContext<{
  dictionary: Dictionary;
  currentLocale: Locale;
} | null>(null);

export default function DictionaryProvider({
  currentLocale,
  dictionary,
  children,
}: {
  currentLocale: Locale;
  dictionary: Dictionary;
  children: React.ReactNode;
}) {
  return (
    <DictionaryContext.Provider value={{ dictionary, currentLocale }}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useDictionary() {
  const value = React.useContext(DictionaryContext);
  if (value === null) {
    throw new Error(
      "useDictionary hook must be used within DictionaryProvider"
    );
  }

  return value;
}
