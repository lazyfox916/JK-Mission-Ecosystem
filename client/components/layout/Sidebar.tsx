"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Upload,
  Brain,
  Package,
  GitBranch,
  BarChart2,
  PieChart,
  LogOut,
  ChevronRight,
  Activity,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={18} /> },
  { label: "Patients", href: "/patients", icon: <Users size={18} />, badge: "24" },
  { label: "Upload", href: "/upload", icon: <Upload size={18} /> },
  { label: "AI Analysis", href: "/analysis", icon: <Brain size={18} /> },
  { label: "Inventory", href: "/inventory", icon: <Package size={18} /> },
  { label: "Branches", href: "/branches", icon: <GitBranch size={18} /> },
  { label: "Sales", href: "/sales", icon: <BarChart2 size={18} /> },
  { label: "Profit", href: "/profit", icon: <PieChart size={18} /> },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-60 flex flex-col bg-bg-surface border-r border-border z-30">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-border">
        <div className="w-8 h-8 rounded-xl bg-neon-purple/20 border border-neon-purple/30 flex items-center justify-center neon-glow">
          <Activity size={16} className="text-neon-purple" />
        </div>
        <div>
          <p className="text-sm font-bold text-text-primary tracking-tight">J.K. Mission</p>
          <p className="text-[10px] text-text-muted">Medical Intelligence</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        <p className="px-3 py-2 text-[10px] font-semibold text-text-muted uppercase tracking-widest">
          Main Menu
        </p>
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                transition-all duration-200
                ${isActive
                  ? "bg-neon-purple/15 text-neon-purple border border-neon-purple/20 shadow-[0_0_16px_rgba(139,92,246,0.12)]"
                  : "text-text-secondary hover:text-text-primary hover:bg-white/5 border border-transparent"
                }
              `}
            >
              <span className={`flex-shrink-0 transition-colors ${isActive ? "text-neon-purple" : "text-text-muted group-hover:text-text-secondary"}`}>
                {item.icon}
              </span>
              <span className="flex-1 truncate">{item.label}</span>
              {item.badge && (
                <span className="flex-shrink-0 text-[10px] font-semibold bg-neon-purple/20 text-neon-purple px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
              {isActive && <ChevronRight size={14} className="flex-shrink-0 text-neon-purple/60" />}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="p-3 border-t border-border">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-all duration-200 cursor-pointer group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-purple to-neon-violet flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            DR
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-text-primary truncate">Dr. Rajesh Kumar</p>
            <p className="text-[10px] text-text-muted">Doctor</p>
          </div>
          <LogOut size={14} className="flex-shrink-0 text-text-muted group-hover:text-danger transition-colors" />
        </div>
      </div>
    </aside>
  );
}
