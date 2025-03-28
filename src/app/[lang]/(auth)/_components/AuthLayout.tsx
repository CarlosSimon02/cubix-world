"use client";

import { Card } from "primereact/card";
import { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
  title: string;
  description?: string;
};

const AuthLayout = ({ children, title, description }: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card
        title={title}
        subTitle={description}
        className="mx-auto w-full max-w-xs gap-4"
      >
        {children}
      </Card>
    </div>
  );
};

export default AuthLayout;
