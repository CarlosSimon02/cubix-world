"use client";

import { UserEntity } from "@/core/entities/UserEntity";
import { AuthProvider } from "@/presentation/contexts/AuthContext";
import { CustomMantineProvider } from "@/presentation/contexts/CustomMantimeContext";
import DictionaryProvider from "@/presentation/contexts/DictionaryContext";
import { Dictionary } from "@/types/dictionary.type";
import { Locale } from "@/types/locale.type";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type ProvidersProps = {
  children: React.ReactNode;
  user: UserEntity | null;
  dictionary: Dictionary;
  currentLocale: Locale;
};

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false, // Don't retry auth mutations by default
    },
  },
});

const Providers = ({
  user,
  dictionary,
  children,
  currentLocale,
}: ProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider user={user}>
        <DictionaryProvider
          dictionary={dictionary}
          currentLocale={currentLocale}
        >
          <CustomMantineProvider>{children}</CustomMantineProvider>
        </DictionaryProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default Providers;
