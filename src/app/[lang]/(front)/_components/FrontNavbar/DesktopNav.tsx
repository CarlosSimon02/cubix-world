import LocaleLink from "@/presentation/components/LocaleLink";
import { UserAvatar } from "@/presentation/components/UserAvatar";
import { useAuth } from "@/presentation/contexts/AuthContext";
import { Button, Group } from "@mantine/core";
import { FeatureDropdown } from "./FeatureDropdown";
import { NavLink } from "./NavLink";
import { NAV_FEATURES } from "./mockData";

const DesktopNav = () => {
  const { user } = useAuth();

  return (
    <>
      <Group h="100%" gap={0} visibleFrom="sm">
        <NavLink href="#">Home</NavLink>
        <FeatureDropdown features={NAV_FEATURES} />
        <NavLink href="#">Learn</NavLink>
        <NavLink href="#">Academy</NavLink>
      </Group>

      <Group visibleFrom="sm">
        {user ? (
          <UserAvatar user={user} />
        ) : (
          <>
            <Button component={LocaleLink} href="/login" variant="default">
              Log in
            </Button>
            <Button component={LocaleLink} href="/signup">
              Sign up
            </Button>
          </>
        )}
      </Group>
    </>
  );
};

export default DesktopNav;
