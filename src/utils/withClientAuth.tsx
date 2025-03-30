"use client";

import { UserEntity } from "@/core/entities/UserEntity";
import { useAuth } from "@/presentation/contexts/AuthContext";
import { redirect } from "next/navigation";

export type WithAuthProps = {
  user: UserEntity;
};

const withClientAuth = <P extends WithAuthProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  return function AuthenticatedComponent(props: Omit<P, keyof WithAuthProps>) {
    const { user } = useAuth();

    if (!user) {
      redirect("login");
    }

    return <WrappedComponent {...(props as P)} user={user} />;
  };
};

export default withClientAuth;
