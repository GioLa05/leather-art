import type { Metadata } from 'next';
import AdminProviders from '@/components/admin/AdminProviders';

export const metadata: Metadata = {
  title: 'LEATHER//ART — Vault Operator',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminProviders>{children}</AdminProviders>;
}
