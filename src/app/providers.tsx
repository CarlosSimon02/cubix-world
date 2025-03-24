"use client";

import { UserEntity } from "@/core/entities/UserEntity";
import { AuthProvider } from "@/presentation/contexts/AuthContext";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type ProvidersProps = {
  children: React.ReactNode;
  user: UserEntity | null;
};

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false, // Don't retry auth mutations by default
    },
  },
});

export function Providers({ user, children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider user={user}>
        <AntdRegistry>{children}</AntdRegistry>
      </AuthProvider>
    </QueryClientProvider>
  );
}
