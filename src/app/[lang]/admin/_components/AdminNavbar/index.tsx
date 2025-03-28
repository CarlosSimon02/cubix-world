import UserAvatar from "@/presentation/components/UserAvatar";
import withAuth from "@/utils/withAuth";
import HeaderSearch from "./HeaderSearch";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";

const AdminNavbar = withAuth(({ user }) => {
  return (
    <header className="bg-surface-ground border-bottom-1 surface-border p-4">
      <div className="align-items-center justify-content-between flex">
        <HeaderSearch />
        <div className="align-items-center flex gap-3">
          <LanguageSwitcher />
          <ThemeSwitcher />
          <UserAvatar user={user} />
        </div>
      </div>
    </header>
  );
});

export default AdminNavbar;
