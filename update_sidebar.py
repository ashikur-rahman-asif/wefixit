import re

with open("components/admin/sidebar.tsx", "r") as f:
    content = f.read()

# Add "use client"; and usePathname import
content = '"use client";\n\nimport { usePathname } from "next/navigation";\n' + content

# Replace the beginning of SidebarContent to add the hooks and helpers
new_sidebar_start = """function SidebarContent({ isCollapsed }: { isCollapsed?: boolean }) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '#' || !path) return false;
    if (path === '/admin') {
      return pathname === '/admin';
    }
    return pathname?.startsWith(path);
  };

  const getLinkClasses = (path: string, hasRightArrow = false) => {
    const baseClasses = `flex items-center rounded-xl transition-colors ${isCollapsed ? 'justify-center p-3' : (hasRightArrow ? 'justify-between px-4 py-3' : 'px-4 py-3 gap-3')}`;
    const activeClasses = isActive(path) ? 'bg-brand text-white' : 'text-gray-400 hover:text-white hover:bg-white/5';
    return `${baseClasses} ${activeClasses}`;
  };

  return ("""

content = re.sub(r'function SidebarContent\(\{ isCollapsed \}: \{ isCollapsed\?: boolean \}\) \{\s*return \(', new_sidebar_start, content)

# Replace Dashboard link
content = re.sub(
    r'<Link href="#" className=\{`flex items-center rounded-xl bg-brand text-white transition-colors \$\{isCollapsed \? \'justify-center p-3\' : \'px-4 py-3 gap-3\'\}`\} title="Dashboard">',
    r'<Link href="/admin" className={getLinkClasses("/admin")} title="Dashboard">',
    content
)

# Replace other generic links without right arrow
content = re.sub(
    r'<Link href="([^"]+)" className=\{`flex items-center rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors \$\{isCollapsed \? \'justify-center p-3\' : \'px-4 py-3 gap-3\'\}`\} title="([^"]+)">',
    r'<Link href="\1" className={getLinkClasses("\1")} title="\2">',
    content
)

# Replace generic links with right arrow (like Customer, Orders, Repairs)
content = re.sub(
    r'<Link href="([^"]+)" className=\{`flex items-center rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors \$\{isCollapsed \? \'justify-center p-3\' : \'justify-between px-4 py-3\'\}`\} title="([^"]+)">',
    r'<Link href="\1" className={getLinkClasses("\1", true)} title="\2">',
    content
)

# Fix the nested text-gray-400 on the orders icon
content = content.replace(
    '<div className="text-gray-400 w-5 h-5 flex items-center justify-center">',
    '<div className="w-5 h-5 flex items-center justify-center">'
)

with open("components/admin/sidebar.tsx", "w") as f:
    f.write(content)

print("Updated sidebar.tsx successfully")
