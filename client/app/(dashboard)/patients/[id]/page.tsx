"use client";

import { use } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  ArrowLeft,
  Brain,
  Calendar,
  Clock,
  FileText,
  User,
  Activity,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const patientData: Record<string, {
  id: string; name: string; age: number; gender: string; dob: string;
  phone: string; address: string; condition: string; status: string;
  branch: string; doctor: string; date: string; notes: string;
  timeline: { label: string; time: string; done: boolean; icon: React.ReactNode }[];
  aiFindings: { label: string; value: string; severity: "normal" | "mild" | "moderate" | "severe" }[];
}> = {
  P001: {
    id: "P001", name: "Ananya Singh", age: 34, gender: "Female", dob: "12 Mar 1991",
    phone: "+91 98765 43210", address: "12, Boring Road, Patna - 800001",
    condition: "Retinal Scan", status: "completed",
    branch: "Patna Main", doctor: "Dr. Rajesh Kumar", date: "31 Mar 2025",
    notes: "Patient presented with blurred vision in the left eye. Retinal scan ordered for detailed analysis.",
    timeline: [
      { label: "Registration", time: "09:00 AM", done: true, icon: <User size={14} /> },
      { label: "Sample Collected", time: "09:30 AM", done: true, icon: <Activity size={14} /> },
      { label: "AI Analysis Started", time: "10:00 AM", done: true, icon: <Brain size={14} /> },
      { label: "Report Generated", time: "11:20 AM", done: true, icon: <FileText size={14} /> },
      { label: "Doctor Review", time: "02:00 PM", done: true, icon: <CheckCircle size={14} /> },
    ],
    aiFindings: [
      { label: "Retinal Thickness", value: "Normal (245µm)", severity: "normal" },
      { label: "Optic Disc", value: "Mild cupping detected", severity: "mild" },
      { label: "Macula", value: "No abnormality", severity: "normal" },
      { label: "Blood Vessels", value: "Mild narrowing in periphery", severity: "mild" },
    ],
  },
};

const severityBadge: Record<string, "success" | "info" | "warning" | "danger"> = {
  normal: "success",
  mild: "warning",
  moderate: "danger",
  severe: "danger",
};

export default function PatientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const patient = patientData[id] ?? {
    id, name: `Patient ${id}`, age: 40, gender: "Unknown", dob: "—",
    phone: "—", address: "—", condition: "General Checkup", status: "pending",
    branch: "Patna Main", doctor: "Dr. Rajesh Kumar", date: "31 Mar 2025",
    notes: "No additional notes.",
    timeline: [
      { label: "Registration", time: "10:00 AM", done: true, icon: <User size={14} /> },
      { label: "Sample Collected", time: "10:30 AM", done: false, icon: <Activity size={14} /> },
      { label: "AI Analysis", time: "—", done: false, icon: <Brain size={14} /> },
      { label: "Report", time: "—", done: false, icon: <FileText size={14} /> },
    ],
    aiFindings: [],
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/patients">
          <Button variant="ghost" size="sm">
            <ArrowLeft size={15} />
            Back
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-text-primary">{patient.name}</h1>
            <Badge variant={severityBadge[patient.status] ?? "default"} dot>
              {patient.status}
            </Badge>
          </div>
          <p className="mt-0.5 text-sm text-text-muted">
            Patient ID: <code className="text-neon-purple font-mono">{patient.id}</code>
            {" · "}{patient.condition}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <FileText size={14} />
            Download Report
          </Button>
          <Link href="/analysis">
            <Button size="sm">
              <Brain size={14} />
              View AI Analysis
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Patient info */}
        <div className="space-y-4">
          <Card padding="md">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-neon-purple/20 to-neon-violet/10 border border-neon-purple/20 flex items-center justify-center text-neon-purple font-bold text-lg">
                {patient.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">{patient.name}</p>
                <p className="text-xs text-text-muted">{patient.gender} · Age {patient.age}</p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { label: "Date of Birth", value: patient.dob },
                { label: "Phone", value: patient.phone },
                { label: "Address", value: patient.address },
                { label: "Branch", value: patient.branch },
                { label: "Assigned Doctor", value: patient.doctor },
                { label: "Visit Date", value: patient.date },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">{label}</p>
                  <p className="mt-0.5 text-xs text-text-secondary">{value}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Notes */}
          <Card padding="md">
            <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Clinical Notes</h3>
            <p className="text-xs text-text-secondary leading-relaxed">{patient.notes}</p>
          </Card>
        </div>

        {/* Timeline + AI findings */}
        <div className="col-span-2 space-y-4">
          {/* Timeline */}
          <Card padding="md">
            <h3 className="text-sm font-semibold text-text-primary mb-4">Patient Timeline</h3>
            <div className="space-y-0">
              {patient.timeline.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      step.done
                        ? "bg-neon-purple/15 text-neon-purple border border-neon-purple/25"
                        : "bg-bg-elevated text-text-muted border border-border"
                    }`}>
                      {step.icon}
                    </div>
                    {i < patient.timeline.length - 1 && (
                      <div className={`w-px flex-1 my-1 min-h-6 ${step.done ? "bg-neon-purple/20" : "bg-border"}`} />
                    )}
                  </div>
                  <div className="pb-4 flex-1">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-medium ${step.done ? "text-text-primary" : "text-text-muted"}`}>
                        {step.label}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-text-muted">
                        <Clock size={11} />
                        <span>{step.time}</span>
                        {step.done && <CheckCircle size={12} className="text-success" />}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* AI Findings */}
          {patient.aiFindings.length > 0 && (
            <Card padding="md">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-neon-cyan/10 flex items-center justify-center">
                  <Brain size={14} className="text-neon-cyan" />
                </div>
                <h3 className="text-sm font-semibold text-text-primary">AI Analysis Findings</h3>
                <Badge variant="info" className="ml-auto">Confidence: 94.2%</Badge>
              </div>
              <div className="space-y-3">
                {patient.aiFindings.map((finding) => (
                  <div key={finding.label} className="flex items-center justify-between p-3 bg-bg-elevated rounded-xl border border-border">
                    <div className="flex items-center gap-2">
                      {finding.severity === "normal"
                        ? <CheckCircle size={15} className="text-success flex-shrink-0" />
                        : <AlertCircle size={15} className="text-warning flex-shrink-0" />
                      }
                      <span className="text-sm text-text-secondary">{finding.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-text-primary">{finding.value}</span>
                      <Badge variant={severityBadge[finding.severity]}>{finding.severity}</Badge>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-neon-purple/5 rounded-xl border border-neon-purple/15">
                <p className="text-xs text-text-secondary">
                  <span className="font-semibold text-neon-purple">AI Recommendation: </span>
                  Mild optic disc cupping detected. Recommend follow-up in 3 months with IOP measurement and visual field testing. No immediate intervention required.
                </p>
              </div>
            </Card>
          )}

          {/* Visit history placeholder */}
          <Card padding="md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-text-primary">Visit History</h3>
              <Badge variant="default">3 visits</Badge>
            </div>
            <div className="space-y-2">
              {[
                { date: "31 Mar 2025", type: "Retinal Scan", doctor: "Dr. Rajesh Kumar", status: "completed" },
                { date: "15 Jan 2025", type: "Eye Pressure Check", doctor: "Dr. Rajesh Kumar", status: "completed" },
                { date: "20 Oct 2024", type: "General Opthalmology", doctor: "Dr. Priya Sinha", status: "completed" },
              ].map((visit, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-bg-elevated rounded-xl border border-border">
                  <div className="w-8 h-8 rounded-lg bg-bg-card flex items-center justify-center flex-shrink-0">
                    <Calendar size={14} className="text-text-muted" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-text-primary">{visit.type}</p>
                    <p className="text-[10px] text-text-muted">{visit.date} · {visit.doctor}</p>
                  </div>
                  <Badge variant="success" className="flex-shrink-0">{visit.status}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
