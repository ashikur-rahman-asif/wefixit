import { MainNav } from "@/components/main-nav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-col">
      <MainNav />
      <main className="flex-1 flex flex-col w-full">{children}</main>
    </div>
  );
}
