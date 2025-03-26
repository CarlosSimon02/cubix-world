import { UserEntity } from "@/core/entities/UserEntity";
import getAuthTokens from "@/utils/getAuthTokens";
import tokensToUserEntity from "@/utils/tokensToUserEntity";
import { redirect } from "next/navigation";

export type WithAuthProps = {
  user: UserEntity;
};

const withAuth = <P extends WithAuthProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  return async function AuthenticatedComponent(
    props: Omit<P, keyof WithAuthProps>
  ) {
    const tokens = await getAuthTokens();

    if (!tokens) {
      redirect("login");
    }

    const user = tokensToUserEntity(tokens.decodedToken);

    return <WrappedComponent {...(props as P)} user={user} />;
  };
};

export default withAuth;
