"use client";

import { UserEntity } from "@/core/entities/UserEntity";
import { AuthProvider } from "@/presentation/contexts/AuthContext";
import DictionaryProvider from "@/presentation/contexts/DictionaryContext";
import { ThemeProvider } from "@/presentation/contexts/ThemeContext";
import { ToastProvider } from "@/presentation/contexts/ToastContext";
import { Dictionary } from "@/types/dictionary.type";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type ProvidersProps = {
  children: React.ReactNode;
  user: UserEntity | null;
  dictionary: Dictionary;
  initialTheme: Theme;
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
  initialTheme,
}: ProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider user={user}>
        <DictionaryProvider dictionary={dictionary}>
          <ThemeProvider initialTheme={initialTheme}>
            <ToastProvider>{children}</ToastProvider>
          </ThemeProvider>
        </DictionaryProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default Providers;
