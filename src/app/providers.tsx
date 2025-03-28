"use client";

import { UserEntity } from "@/core/entities/UserEntity";
import { AuthProvider } from "@/presentation/contexts/AuthContext";
import DictionaryProvider from "@/presentation/contexts/DictionaryContext";
import { ThemeProvider } from "@/presentation/contexts/ThemeContext";
import { ToastProvider } from "@/presentation/contexts/ToastContext";
import { Dictionary } from "@/types/dictionary.type";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { PrimeReactProvider } from "primereact/api";

type ProvidersProps = {
  children: React.ReactNode;
  user: UserEntity | null;
  dictionary: Dictionary;
};

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false, // Don't retry auth mutations by default
    },
  },
});

const DynamicThemeLoader = dynamic(
  () => import("@/presentation/components/ThemeLoader"),
  {
    ssr: false,
  }
);

const Providers = ({ user, dictionary, children }: ProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider user={user}>
        <DictionaryProvider dictionary={dictionary}>
          <PrimeReactProvider>
            <ToastProvider>
              <ThemeProvider>
                <DynamicThemeLoader />
                {children}
              </ThemeProvider>
            </ToastProvider>
          </PrimeReactProvider>
        </DictionaryProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default Providers;
