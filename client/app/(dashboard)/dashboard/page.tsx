"use client";

import { Card, StatCard } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  Users,
  Activity,
  Brain,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Link from "next/link";

const activityData = [
  { day: "Mon", patients: 12, analyses: 8 },
  { day: "Tue", patients: 19, analyses: 14 },
  { day: "Wed", patients: 15, analyses: 11 },
  { day: "Thu", patients: 24, analyses: 18 },
  { day: "Fri", patients: 20, analyses: 16 },
  { day: "Sat", patients: 8, analyses: 6 },
  { day: "Sun", patients: 5, analyses: 4 },
];

const recentPatients = [
  { id: "P001", name: "Ananya Singh", age: 34, status: "completed", condition: "Retinal Scan", time: "2 hrs ago" },
  { id: "P002", name: "Ravi Mehta", age: 52, status: "processing", condition: "MRI Brain", time: "4 hrs ago" },
  { id: "P003", name: "Priya Sharma", age: 28, status: "completed", condition: "X-Ray Chest", time: "5 hrs ago" },
  { id: "P004", name: "Kiran Patel", age: 45, status: "pending", condition: "Blood Panel", time: "6 hrs ago" },
  { id: "P005", name: "Deepak Nair", age: 61, status: "review", condition: "CT Scan", time: "8 hrs ago" },
];

const statusMap: Record<string, "success" | "info" | "warning" | "default"> = {
  completed: "success",
  processing: "info",
  pending: "warning",
  review: "default",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Good morning, Dr. Rajesh 👋</h1>
          <p className="mt-1 text-sm text-text-muted">Here&#39;s what&#39;s happening at your clinic today.</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-text-muted bg-bg-elevated border border-border px-3 py-1.5 rounded-xl">
          <Clock size={13} />
          <span>Last updated: 2 min ago</span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          label="Total Patients"
          value="1,284"
          delta="+12% this month"
          deltaType="up"
          icon={<Users size={18} />}
          accent="#8b5cf6"
        />
        <StatCard
          label="Active Cases"
          value="48"
          delta="3 critical"
          deltaType="down"
          icon={<Activity size={18} />}
          accent="#ef4444"
        />
        <StatCard
          label="AI Analyses"
          value="324"
          delta="+8% this week"
          deltaType="up"
          icon={<Brain size={18} />}
          accent="#06b6d4"
        />
        <StatCard
          label="Revenue (MTD)"
          value="₹4.8L"
          delta="+18% vs last month"
          deltaType="up"
          icon={<TrendingUp size={18} />}
          accent="#10b981"
        />
      </div>

      {/* Charts + Recent patients */}
      <div className="grid grid-cols-3 gap-6">
        {/* Activity chart */}
        <Card className="col-span-2" padding="lg">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-sm font-semibold text-text-primary">Weekly Activity</h2>
              <p className="text-xs text-text-muted mt-0.5">Patients & AI analyses this week</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-text-muted">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-neon-purple inline-block" />Patients</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-neon-cyan inline-block" />AI Analyses</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={activityData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gradPurple" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradCyan" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#606080" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#606080" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "#1a1a26", border: "1px solid rgba(139,92,246,0.25)", borderRadius: "12px", color: "#f0f0ff", fontSize: 12 }}
                cursor={{ stroke: "rgba(139,92,246,0.2)", strokeWidth: 1 }}
              />
              <Area type="monotone" dataKey="patients" stroke="#8b5cf6" strokeWidth={2} fill="url(#gradPurple)" />
              <Area type="monotone" dataKey="analyses" stroke="#06b6d4" strokeWidth={2} fill="url(#gradCyan)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Quick status */}
        <Card padding="lg">
          <h2 className="text-sm font-semibold text-text-primary mb-4">Case Status</h2>
          <div className="space-y-3">
            {[
              { label: "Completed", count: 18, color: "#10b981", icon: <CheckCircle size={14} /> },
              { label: "Processing", count: 7, color: "#06b6d4", icon: <Activity size={14} /> },
              { label: "Pending Review", count: 5, color: "#f59e0b", icon: <Clock size={14} /> },
              { label: "Needs Attention", count: 3, color: "#ef4444", icon: <AlertCircle size={14} /> },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${item.color}18`, color: item.color }}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-text-secondary">{item.label}</span>
                    <span className="text-xs font-semibold text-text-primary">{item.count}</span>
                  </div>
                  <div className="h-1 bg-bg-base rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${(item.count / 33) * 100}%`, background: item.color }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent patients */}
      <Card padding="none">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-sm font-semibold text-text-primary">Recent Patients</h2>
          <Link href="/patients" className="flex items-center gap-1 text-xs text-neon-purple hover:text-neon-violet transition-colors font-medium">
            View all <ChevronRight size={13} />
          </Link>
        </div>
        <div className="divide-y divide-border">
          {recentPatients.map((patient) => (
            <Link
              key={patient.id}
              href={`/patients/${patient.id}`}
              className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.02] transition-colors group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-neon-purple/20 to-neon-violet/10 border border-neon-purple/15 flex items-center justify-center text-neon-purple text-xs font-bold flex-shrink-0">
                {patient.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary group-hover:text-neon-purple transition-colors truncate">{patient.name}</p>
                <p className="text-xs text-text-muted">{patient.condition} · Age {patient.age}</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <Badge variant={statusMap[patient.status] ?? "default"} dot>
                  {patient.status}
                </Badge>
                <span className="text-xs text-text-muted">{patient.time}</span>
                <ChevronRight size={14} className="text-text-muted group-hover:text-neon-purple transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
