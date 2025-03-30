import { redirect } from "next/navigation";

type AdminPageProps = {
  params: Promise<{
    lang: string;
  }>;
};

const AdminPage = async ({ params }: AdminPageProps) => {
  const { lang } = await params;
  redirect(`/${lang}/admin/dashboard`);
};

export default AdminPage;
