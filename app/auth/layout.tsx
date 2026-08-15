import { AuthSidebar } from './auth-sidebar';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-screen max-h-screen grid-cols-1 bg-[#F6F9FF] lg:grid-cols-2">
      <AuthSidebar />
      <div className="h-full overflow-y-auto px-4">{children}</div>
    </div>
  );
}
