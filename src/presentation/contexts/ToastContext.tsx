"use client";

import type { ToastMessage } from "primereact/toast";
import { Toast } from "primereact/toast";
import { createContext, useContext, useRef } from "react";

type ToastContextType = {
  showToast: (message: ToastMessage) => void;
  showSuccess: (summary: string, detail?: string) => void;
  showError: (summary: string, detail?: string) => void;
  showWarning: (summary: string, detail?: string) => void;
  showInfo: (summary: string, detail?: string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const toastRef = useRef<Toast>(null);

  const showToast = (message: ToastMessage) => {
    toastRef.current?.show(message);
  };

  const showSuccess = (summary: string, detail?: string) => {
    showToast({ severity: "success", summary, detail, life: 3000 });
  };

  const showError = (summary: string, detail?: string) => {
    showToast({ severity: "error", summary, detail, life: 5000 });
  };

  const showWarning = (summary: string, detail?: string) => {
    showToast({ severity: "warn", summary, detail, life: 4000 });
  };

  const showInfo = (summary: string, detail?: string) => {
    showToast({ severity: "info", summary, detail, life: 3000 });
  };

  return (
    <ToastContext.Provider
      value={{ showToast, showSuccess, showError, showWarning, showInfo }}
    >
      <Toast ref={toastRef} position="top-right" />
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
