"use client";

import { UserEntity } from "@/core/entities/UserEntity";
import { AuthProvider } from "@/presentation/contexts/AuthContext";
import DictionaryProvider from "@/presentation/contexts/DictionaryContext";
import ThemeProvider from "@/presentation/contexts/ThemeContext";
import { Dictionary } from "@/types/dictionary.type";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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

export function Providers({ user, dictionary, children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider user={user}>
        <DictionaryProvider dictionary={dictionary}>
          <ThemeProvider>
            <AntdRegistry>{children}</AntdRegistry>
          </ThemeProvider>
        </DictionaryProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
