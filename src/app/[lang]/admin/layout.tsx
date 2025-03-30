import AdminAppShell from "./_components/AdminAppShell";

type AdminLayoutProps = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return <AdminAppShell>{children}</AdminAppShell>;
};

export default AdminLayout;
