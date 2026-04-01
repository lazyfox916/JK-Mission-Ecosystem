"use client";

import { usePathname } from "next/navigation";
import { Bell, Search, ChevronRight } from "lucide-react";

const routeLabels: Record<string, string[]> = {
  "/dashboard": ["Dashboard"],
  "/patients": ["Patients"],
  "/upload": ["Upload"],
  "/analysis": ["AI Analysis"],
  "/inventory": ["Inventory"],
  "/branches": ["Branches"],
  "/sales": ["Sales"],
  "/profit": ["Profit Distribution"],
};

function getBreadcrumb(pathname: string): string[] {
  // Handle dynamic routes like /patients/[id]
  for (const [key, label] of Object.entries(routeLabels)) {
    if (pathname === key || pathname.startsWith(key + "/")) {
      if (pathname !== key) {
        const sub = pathname.split("/").pop();
        return [...label, sub ?? ""];
      }
      return label;
    }
  }
  return ["Dashboard"];
}

export function Topbar() {
  const pathname = usePathname();
  const breadcrumb = getBreadcrumb(pathname);

  return (
    <header className="fixed top-0 left-60 right-0 h-14 flex items-center justify-between px-6 bg-bg-surface/80 backdrop-blur-xl border-b border-border z-20">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm">
        {breadcrumb.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight size={12} className="text-text-muted" />}
            <span className={i === breadcrumb.length - 1 ? "text-text-primary font-semibold" : "text-text-muted"}>
              {crumb}
            </span>
          </span>
        ))}
      </nav>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        <button className="w-9 h-9 flex items-center justify-center rounded-xl text-text-muted hover:text-text-primary hover:bg-white/5 border border-transparent hover:border-border transition-all duration-200">
          <Search size={16} />
        </button>
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl text-text-muted hover:text-text-primary hover:bg-white/5 border border-transparent hover:border-border transition-all duration-200">
          <Bell size={16} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-neon-purple" />
        </button>
        <div className="h-6 w-px bg-border mx-1" />
        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-white/5 cursor-pointer transition-all duration-200 border border-transparent hover:border-border">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-neon-purple to-neon-violet flex items-center justify-center text-white text-[9px] font-bold">
            DR
          </div>
          <span className="text-xs font-medium text-text-secondary">Dr. Rajesh</span>
        </div>
      </div>
    </header>
  );
}
