"use client";

import { Card, StatCard } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  IndianRupee,
  TrendingUp,
  Users,
  PieChart as PieIcon,
} from "lucide-react";

const profitBreakdown = [
  { name: "Operations", value: 35, amount: 158550 },
  { name: "Doctor Earnings", value: 28, amount: 126840 },
  { name: "Staff Salaries", value: 18, amount: 81540 },
  { name: "Reinvestment", value: 12, amount: 54360 },
  { name: "Net Profit", value: 7, amount: 31710 },
];

const COLORS = ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ec4899"];

const doctorEarnings = [
  {
    name: "Dr. Rajesh Kumar",
    role: "Ophthalmologist",
    cases: 124,
    earning: 62000,
    branch: "Patna Main",
  },
  {
    name: "Dr. Priya Sinha",
    role: "Radiologist",
    cases: 89,
    earning: 44500,
    branch: "Muzaffarpur",
  },
  {
    name: "Dr. Amit Roy",
    role: "Physician",
    cases: 67,
    earning: 33500,
    branch: "Gaya",
  },
  {
    name: "Dr. Neha Jha",
    role: "Sonologist",
    cases: 42,
    earning: 21000,
    branch: "Bhagalpur",
  },
];

const monthlyProfit = [
  { month: "Oct", gross: 348000, expenses: 265000, net: 83000 },
  { month: "Nov", gross: 295000, expenses: 238000, net: 57000 },
  { month: "Dec", gross: 380000, expenses: 284000, net: 96000 },
  { month: "Jan", gross: 420000, expenses: 305000, net: 115000 },
  { month: "Feb", gross: 398000, expenses: 298000, net: 100000 },
  { month: "Mar", gross: 453000, expenses: 316000, net: 137000 },
];

const totalRevenue = 453000;

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: (typeof profitBreakdown)[0] }[];
}) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="bg-bg-card border border-border-strong rounded-xl px-4 py-3 shadow-xl text-xs">
        <p className="font-semibold text-text-primary mb-1">{d.name}</p>
        <p className="text-text-muted">
          Share: <span className="text-neon-purple font-bold">{d.value}%</span>
        </p>
        <p className="text-text-muted">
          Amount:{" "}
          <span className="text-text-primary font-semibold">
            ₹{d.amount.toLocaleString()}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export default function ProfitPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">
          Profit Distribution
        </h1>
        <p className="mt-1 text-sm text-text-muted">
          Monthly earnings breakdown — March 2025
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          label="Gross Revenue"
          value="₹4,53,000"
          delta="+13.8% vs Feb"
          deltaType="up"
          icon={<IndianRupee size={17} />}
          accent="#8b5cf6"
        />
        <StatCard
          label="Total Expenses"
          value="₹3,16,000"
          delta="+6.1% vs Feb"
          deltaType="down"
          icon={<TrendingUp size={17} />}
          accent="#ef4444"
        />
        <StatCard
          label="Net Profit"
          value="₹1,37,000"
          delta="+37% vs Feb"
          deltaType="up"
          icon={<PieIcon size={17} />}
          accent="#10b981"
        />
        <StatCard
          label="Profit Margin"
          value="30.2%"
          delta="+5.4pp vs Feb"
          deltaType="up"
          icon={<Users size={17} />}
          accent="#f59e0b"
        />
      </div>

      {/* Pie chart + monthly bars */}
      <div className="grid grid-cols-5 gap-6">
        {/* Pie */}
        <Card className="col-span-2" padding="lg">
          <h2 className="text-sm font-semibold text-text-primary mb-4">
            Revenue Distribution
          </h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={profitBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
              >
                {profitBreakdown.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index % COLORS.length]}
                    stroke="transparent"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {profitBreakdown.map((item, i) => (
              <div
                key={item.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ background: COLORS[i] }}
                  />
                  <span className="text-xs text-text-secondary">
                    {item.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-text-primary">
                    ₹{item.amount.toLocaleString()}
                  </span>
                  <Badge variant="default">{item.value}%</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Monthly trend */}
        <Card className="col-span-3" padding="lg">
          <h2 className="text-sm font-semibold text-text-primary mb-1">
            Monthly P&L Overview
          </h2>
          <p className="text-xs text-text-muted mb-4">
            Gross vs expenses vs net profit
          </p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart
              data={monthlyProfit}
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
                tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`}
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
                cursor={{ fill: "rgba(255,255,255,0.03)" }}
              />
              <Bar
                dataKey="gross"
                fill="#8b5cf6"
                radius={[4, 4, 0, 0]}
                name="Gross"
                maxBarSize={20}
              />
              <Bar
                dataKey="expenses"
                fill="#374151"
                radius={[4, 4, 0, 0]}
                name="Expenses"
                maxBarSize={20}
              />
              <Bar
                dataKey="net"
                fill="#10b981"
                radius={[4, 4, 0, 0]}
                name="Net Profit"
                maxBarSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Doctor earnings */}
      <Card padding="none">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-sm font-semibold text-text-primary">
            Doctor Earnings — March 2025
          </h2>
          <p className="text-xs text-text-muted mt-0.5">
            Based on cases handled and consultation fees
          </p>
        </div>
        <div className="divide-y divide-border">
          {doctorEarnings.map((doc, i) => (
            <div
              key={doc.name}
              className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center text-neon-purple text-xs font-bold flex-shrink-0">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-text-primary">
                  {doc.name}
                </p>
                <p className="text-xs text-text-muted">
                  {doc.role} · {doc.branch}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-text-primary">
                  ₹{doc.earning.toLocaleString()}
                </p>
                <p className="text-xs text-text-muted">{doc.cases} cases</p>
              </div>
              <div className="w-24">
                <div className="h-1.5 bg-bg-base rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-neon-purple to-neon-cyan"
                    style={{
                      width: `${(doc.earning / doctorEarnings[0].earning) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <div className="text-right min-w-12">
                <Badge variant="purple">
                  {((doc.earning / totalRevenue) * 100).toFixed(1)}%
                </Badge>
              </div>
            </div>
          ))}
        </div>
        <div className="px-5 py-3 border-t border-border flex items-center justify-between">
          <p className="text-xs text-text-muted">
            Total doctor payout this month
          </p>
          <p className="text-sm font-bold text-neon-purple">
            ₹
            {doctorEarnings.reduce((a, b) => a + b.earning, 0).toLocaleString()}
          </p>
        </div>
      </Card>
    </div>
  );
}
