"use client";

import { Card, StatCard } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  TrendingUp,
  IndianRupee,
  Users,
  BarChart2,
  Download,
} from "lucide-react";

const dailyData = [
  { date: "25 Mar", revenue: 18400, patients: 22 },
  { date: "26 Mar", revenue: 22100, patients: 27 },
  { date: "27 Mar", revenue: 19800, patients: 24 },
  { date: "28 Mar", revenue: 31200, patients: 38 },
  { date: "29 Mar", revenue: 27600, patients: 33 },
  { date: "30 Mar", revenue: 24900, patients: 30 },
  { date: "31 Mar", revenue: 29400, patients: 35 },
];

const monthlyData = [
  { month: "Sep", revenue: 312000, target: 300000 },
  { month: "Oct", revenue: 348000, target: 320000 },
  { month: "Nov", revenue: 295000, target: 330000 },
  { month: "Dec", revenue: 380000, target: 350000 },
  { month: "Jan", revenue: 420000, target: 380000 },
  { month: "Feb", revenue: 398000, target: 400000 },
  { month: "Mar", revenue: 453000, target: 420000 },
];

const branchSales = [
  { branch: "Patna Main", revenue: 240000, share: 53 },
  { branch: "Muzaffarpur", revenue: 110000, share: 24 },
  { branch: "Gaya", revenue: 72000, share: 16 },
  { branch: "Bhagalpur", revenue: 31000, share: 7 },
];

const serviceBreakdown = [
  { service: "Retinal Scan", count: 89, revenue: 133500 },
  { service: "MRI Analysis", count: 42, revenue: 126000 },
  { service: "X-Ray / CT", count: 156, revenue: 93600 },
  { service: "Blood Panel", count: 213, revenue: 53250 },
  { service: "Ultrasound", count: 67, revenue: 46900 },
];

const formatINR = (v: number) => `₹${(v / 1000).toFixed(0)}K`;

export default function SalesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Sales Dashboard
          </h1>
          <p className="mt-1 text-sm text-text-muted">
            Revenue tracking and distribution across all branches.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-bg-elevated border border-border rounded-xl">
            {["7D", "30D", "90D"].map((p) => (
              <button
                key={p}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-all duration-200 ${p === "7D" ? "bg-neon-purple text-white" : "text-text-muted hover:text-text-secondary"}`}
              >
                {p}
              </button>
            ))}
          </div>
          <Button variant="secondary" size="sm">
            <Download size={14} />
            Export
          </Button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          label="Revenue MTD"
          value="₹4,53,000"
          delta="+7.8% vs target"
          deltaType="up"
          icon={<IndianRupee size={17} />}
          accent="#8b5cf6"
        />
        <StatCard
          label="Patients MTD"
          value="1,284"
          delta="+12% this month"
          deltaType="up"
          icon={<Users size={17} />}
          accent="#06b6d4"
        />
        <StatCard
          label="Avg. Ticket Size"
          value="₹353"
          delta="+3.2% vs last month"
          deltaType="up"
          icon={<TrendingUp size={17} />}
          accent="#10b981"
        />
        <StatCard
          label="Best Branch"
          value="Patna"
          delta="₹2.4L this month"
          deltaType="neutral"
          icon={<BarChart2 size={17} />}
          accent="#f59e0b"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-2 gap-6">
        {/* Daily revenue */}
        <Card padding="lg">
          <h2 className="text-sm font-semibold text-text-primary mb-1">
            Daily Revenue (Last 7 Days)
          </h2>
          <p className="text-xs text-text-muted mb-4">Revenue in INR per day</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={dailyData}
              margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.04)"
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: "#606080" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#606080" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={formatINR}
              />
              <Tooltip
                contentStyle={{
                  background: "#1a1a26",
                  border: "1px solid rgba(139,92,246,0.25)",
                  borderRadius: "12px",
                  color: "#f0f0ff",
                  fontSize: 12,
                }}
                formatter={(value) => {
                  const num = typeof value === "number" ? value : Number(value);
                  const formatted = Number.isFinite(num)
                    ? `₹${num.toLocaleString()}`
                    : String(value ?? "");
                  return [formatted, "Revenue"] as [string, string];
                }}
                cursor={{ fill: "rgba(139,92,246,0.06)" }}
              />
              <Bar
                dataKey="revenue"
                fill="#8b5cf6"
                radius={[6, 6, 0, 0]}
                maxBarSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Monthly revenue vs target */}
        <Card padding="lg">
          <h2 className="text-sm font-semibold text-text-primary mb-1">
            Monthly Revenue vs Target
          </h2>
          <p className="text-xs text-text-muted mb-4">
            Last 7 months performance
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart
              data={monthlyData}
              margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.04)"
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "#606080" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#606080" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={formatINR}
              />
              <Tooltip
                contentStyle={{
                  background: "#1a1a26",
                  border: "1px solid rgba(139,92,246,0.25)",
                  borderRadius: "12px",
                  color: "#f0f0ff",
                  fontSize: 12,
                }}
                formatter={(value) => {
                  const num = typeof value === "number" ? value : Number(value);
                  if (!Number.isFinite(num)) return value ?? "";
                  return `₹${num.toLocaleString()}`;
                }}
              />
              <Legend
                iconType="circle"
                wrapperStyle={{ fontSize: 11, color: "#606080" }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#8b5cf6"
                strokeWidth={2.5}
                dot={{ fill: "#8b5cf6", r: 3 }}
                name="Revenue"
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke="#06b6d4"
                strokeWidth={2}
                strokeDasharray="5 3"
                dot={false}
                name="Target"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Branch breakdown + Service breakdown */}
      <div className="grid grid-cols-2 gap-6">
        {/* Branch */}
        <Card padding="lg">
          <h2 className="text-sm font-semibold text-text-primary mb-4">
            Revenue by Branch
          </h2>
          <div className="space-y-3">
            {branchSales.map((b) => (
              <div key={b.branch}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-text-secondary">
                    {b.branch}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-text-primary">
                      ₹{b.revenue.toLocaleString()}
                    </span>
                    <Badge variant="purple">{b.share}%</Badge>
                  </div>
                </div>
                <div className="h-2 bg-bg-base rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-neon-purple to-neon-violet transition-all duration-700"
                    style={{ width: `${b.share}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Service */}
        <Card padding="lg">
          <h2 className="text-sm font-semibold text-text-primary mb-4">
            Revenue by Service
          </h2>
          <div className="space-y-2">
            {serviceBreakdown.map((s) => (
              <div
                key={s.service}
                className="flex items-center gap-3 p-3 bg-bg-elevated rounded-xl border border-border"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-text-primary">
                    {s.service}
                  </p>
                  <p className="text-[10px] text-text-muted mt-0.5">
                    {s.count} cases
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-text-primary">
                    ₹{s.revenue.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-text-muted">
                    avg ₹{Math.round(s.revenue / s.count).toLocaleString()}/case
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
