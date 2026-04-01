"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Brain,
  Activity,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  TrendingUp,
  Zap,
} from "lucide-react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const analyses = [
  {
    id: "AI001", patient: "Ananya Singh", patientId: "P001",
    type: "Retinal Scan Analysis", status: "completed",
    confidence: 94.2, time: "11:20 AM", date: "31 Mar 2025",
    findings: "Mild optic disc cupping detected. No diabetic retinopathy markers.",
    risk: "low",
  },
  {
    id: "AI002", patient: "Ravi Mehta", patientId: "P002",
    type: "MRI Brain Analysis", status: "processing",
    confidence: null, time: "10:45 AM", date: "31 Mar 2025",
    findings: "Analysis in progress…",
    risk: null,
  },
  {
    id: "AI003", patient: "Priya Sharma", patientId: "P003",
    type: "Chest X-Ray Analysis", status: "completed",
    confidence: 97.8, time: "09:15 AM", date: "30 Mar 2025",
    findings: "Lungs clear. No consolidation or effusion. Normal cardiac silhouette.",
    risk: "low",
  },
  {
    id: "AI004", patient: "Deepak Nair", patientId: "P005",
    type: "CT Scan Analysis", status: "review",
    confidence: 88.5, time: "03:40 PM", date: "29 Mar 2025",
    findings: "Mild cortical atrophy. Possible early-stage marker. Requires specialist review.",
    risk: "moderate",
  },
];

const radarData = [
  { subject: "Clarity", value: 94 },
  { subject: "Accuracy", value: 97 },
  { subject: "Coverage", value: 89 },
  { subject: "Speed", value: 92 },
  { subject: "Reliability", value: 95 },
];

const statusConfig: Record<string, { variant: "success" | "info" | "warning" | "default"; icon: React.ReactNode }> = {
  completed: { variant: "success", icon: <CheckCircle size={14} /> },
  processing: { variant: "info", icon: <Activity size={14} className="animate-spin" /> },
  review: { variant: "warning", icon: <AlertCircle size={14} /> },
};

const riskConfig: Record<string, { label: string; variant: "success" | "warning" | "danger" }> = {
  low: { label: "Low Risk", variant: "success" },
  moderate: { label: "Moderate Risk", variant: "warning" },
  high: { label: "High Risk", variant: "danger" },
};

export default function AnalysisPage() {
  const [selected, setSelected] = useState(analyses[0]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">AI Analysis</h1>
          <p className="mt-1 text-sm text-text-muted">
            AI-powered diagnostic insights from uploaded patient data.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-neon-purple/10 border border-neon-purple/25 rounded-xl">
            <Zap size={13} className="text-neon-purple" />
            <span className="text-xs font-medium text-neon-purple">Model v2.4 Active</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Analyses", value: "324", icon: <Brain size={17} />, color: "#8b5cf6" },
          { label: "Completed Today", value: "18", icon: <CheckCircle size={17} />, color: "#10b981" },
          { label: "Processing", value: "7", icon: <Activity size={17} />, color: "#06b6d4" },
          { label: "Avg. Confidence", value: "93.4%", icon: <TrendingUp size={17} />, color: "#f59e0b" },
        ].map((stat) => (
          <Card key={stat.label} className="group hover:border-neon-purple/25 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-text-muted uppercase tracking-wider">{stat.label}</p>
                <p className="mt-1.5 text-2xl font-bold text-text-primary">{stat.value}</p>
              </div>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${stat.color}18`, color: stat.color }}>
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main content */}
      <div className="grid grid-cols-5 gap-6">
        {/* List */}
        <div className="col-span-2 space-y-2">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider px-1">Recent Analyses</p>
          {analyses.map((a) => {
            const status = statusConfig[a.status];
            return (
              <button
                key={a.id}
                onClick={() => setSelected(a)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 ${
                  selected.id === a.id
                    ? "bg-neon-purple/10 border-neon-purple/30 shadow-[0_0_20px_rgba(139,92,246,0.1)]"
                    : "bg-bg-card border-border hover:border-neon-purple/20 hover:bg-neon-purple/5"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      selected.id === a.id ? "bg-neon-purple/20 text-neon-purple" : "bg-bg-elevated text-text-muted"
                    }`}>
                      <Eye size={14} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-text-primary leading-tight">{a.patient}</p>
                      <p className="text-[10px] text-text-muted">{a.patientId}</p>
                    </div>
                  </div>
                  <Badge variant={status.variant} dot>{a.status}</Badge>
                </div>
                <p className="text-xs text-text-secondary mb-2 truncate">{a.type}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-text-muted flex items-center gap-1"><Clock size={10} />{a.time}</span>
                  {a.confidence && (
                    <span className="text-[10px] font-semibold text-neon-purple">{a.confidence}% confident</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detail panel */}
        <div className="col-span-3 space-y-4">
          <Card padding="lg">
            <div className="flex items-start justify-between mb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-base font-bold text-text-primary">{selected.type}</h2>
                  <Badge variant={statusConfig[selected.status]?.variant ?? "default"} dot>
                    {selected.status}
                  </Badge>
                </div>
                <p className="text-xs text-text-muted">
                  Patient: <span className="text-text-secondary">{selected.patient}</span>
                  {" · "}<code className="text-neon-purple font-mono">{selected.id}</code>
                </p>
              </div>
              {selected.status === "completed" && (
                <Button size="sm" variant="secondary">Download Report</Button>
              )}
            </div>

            {selected.status === "processing" ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4">
                <div className="w-16 h-16 rounded-2xl bg-neon-cyan/10 border border-neon-cyan/25 flex items-center justify-center">
                  <Brain size={28} className="text-neon-cyan animate-pulse" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-text-primary">AI Analysis in Progress</p>
                  <p className="text-xs text-text-muted mt-1">Scanning and interpreting medical data…</p>
                </div>
                <div className="w-48 h-1.5 bg-bg-elevated rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-neon-purple to-neon-cyan rounded-full animate-pulse w-3/5" />
                </div>
                <p className="text-xs text-text-muted">Estimated: ~12 minutes remaining</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Confidence score */}
                {selected.confidence && (
                  <div className="p-4 bg-bg-elevated rounded-xl border border-border">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">AI Confidence Score</span>
                      <span className="text-xl font-bold text-neon-purple">{selected.confidence}%</span>
                    </div>
                    <div className="h-2.5 bg-bg-base rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-neon-purple to-neon-cyan transition-all duration-1000"
                        style={{ width: `${selected.confidence}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1.5">
                      <span className="text-[10px] text-text-muted">0%</span>
                      <span className="text-[10px] text-text-muted">100%</span>
                    </div>
                  </div>
                )}

                {/* Risk level */}
                {selected.risk && riskConfig[selected.risk] && (
                  <div className="flex items-center gap-3 p-3 rounded-xl border" style={{
                    background: selected.risk === "low" ? "rgba(16,185,129,0.05)" : selected.risk === "moderate" ? "rgba(245,158,11,0.05)" : "rgba(239,68,68,0.05)",
                    borderColor: selected.risk === "low" ? "rgba(16,185,129,0.2)" : selected.risk === "moderate" ? "rgba(245,158,11,0.2)" : "rgba(239,68,68,0.2)",
                  }}>
                    <AlertCircle size={16} style={{ color: selected.risk === "low" ? "#10b981" : selected.risk === "moderate" ? "#f59e0b" : "#ef4444" }} />
                    <div>
                      <p className="text-xs font-semibold text-text-primary">{riskConfig[selected.risk].label}</p>
                      <p className="text-[10px] text-text-muted">Based on AI analysis of all uploaded files</p>
                    </div>
                    <Badge variant={riskConfig[selected.risk].variant} className="ml-auto">{selected.risk}</Badge>
                  </div>
                )}

                {/* Findings */}
                <div className="p-4 bg-bg-elevated rounded-xl border border-border">
                  <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-2">AI Findings</p>
                  <p className="text-sm text-text-secondary leading-relaxed">{selected.findings}</p>
                </div>
              </div>
            )}
          </Card>

          {/* Radar chart */}
          {selected.status === "completed" && (
            <Card padding="lg">
              <h3 className="text-sm font-semibold text-text-primary mb-4">Analysis Quality Metrics</h3>
              <ResponsiveContainer width="100%" height={200}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.06)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "#606080" }} />
                  <Radar
                    name="Score"
                    dataKey="value"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                  <Tooltip
                    contentStyle={{ background: "#1a1a26", border: "1px solid rgba(139,92,246,0.25)", borderRadius: "12px", color: "#f0f0ff", fontSize: 12 }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
