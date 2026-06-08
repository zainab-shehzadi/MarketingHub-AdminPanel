import { AdminAuthGuard } from "@/components/Auth/AdminAuthGuard";
import { AdminLayout } from "@/components/layout/AdminLayout";

export default function RootAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthGuard>
      <AdminLayout>{children}</AdminLayout>
    </AdminAuthGuard>
  );
}