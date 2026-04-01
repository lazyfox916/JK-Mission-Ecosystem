"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Search, Filter, Download, ChevronRight, Users } from "lucide-react";

const patients = [
  { id: "P001", name: "Ananya Singh", age: 34, gender: "F", condition: "Retinal Scan", status: "completed", branch: "Patna Main", date: "31 Mar 2025", doctor: "Dr. Rajesh Kumar" },
  { id: "P002", name: "Ravi Mehta", age: 52, gender: "M", condition: "MRI Brain", status: "processing", branch: "Muzaffarpur", date: "31 Mar 2025", doctor: "Dr. Priya Sinha" },
  { id: "P003", name: "Priya Sharma", age: 28, gender: "F", condition: "X-Ray Chest", status: "completed", branch: "Patna Main", date: "30 Mar 2025", doctor: "Dr. Rajesh Kumar" },
  { id: "P004", name: "Kiran Patel", age: 45, gender: "F", condition: "Blood Panel", status: "pending", branch: "Gaya", date: "30 Mar 2025", doctor: "Dr. Amit Roy" },
  { id: "P005", name: "Deepak Nair", age: 61, gender: "M", condition: "CT Scan", status: "review", branch: "Patna Main", date: "29 Mar 2025", doctor: "Dr. Rajesh Kumar" },
  { id: "P006", name: "Sunita Verma", age: 39, gender: "F", condition: "Ultrasound", status: "completed", branch: "Bhagalpur", date: "29 Mar 2025", doctor: "Dr. Priya Sinha" },
  { id: "P007", name: "Manoj Gupta", age: 57, gender: "M", condition: "ECG", status: "completed", branch: "Muzaffarpur", date: "28 Mar 2025", doctor: "Dr. Amit Roy" },
  { id: "P008", name: "Kavya Reddy", age: 23, gender: "F", condition: "Blood Panel", status: "processing", branch: "Patna Main", date: "28 Mar 2025", doctor: "Dr. Rajesh Kumar" },
];

const statusVariants: Record<string, "success" | "info" | "warning" | "default"> = {
  completed: "success",
  processing: "info",
  pending: "warning",
  review: "default",
};

const filters = ["All", "Completed", "Processing", "Pending", "Review"];

export default function PatientsPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = patients.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.condition.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      activeFilter === "All" || p.status.toLowerCase() === activeFilter.toLowerCase();
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Patients</h1>
          <p className="mt-1 text-sm text-text-muted">{patients.length} total patients across all branches</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <Download size={14} />
            Export
          </Button>
          <Link href="/upload">
            <Button size="sm">Add Patient</Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <Card padding="sm">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex-1 min-w-52">
            <Input
              placeholder="Search by name, ID, or condition..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search size={15} />}
            />
          </div>
          <div className="flex items-center gap-1.5 p-1 bg-bg-base rounded-xl border border-border">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                  activeFilter === f
                    ? "bg-neon-purple text-white shadow-[0_0_10px_rgba(139,92,246,0.3)]"
                    : "text-text-muted hover:text-text-secondary"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <Button variant="secondary" size="sm">
            <Filter size={14} />
            Date range
          </Button>
        </div>
      </Card>

      {/* Table */}
      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Patient</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">ID</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Condition</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Branch</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Doctor</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Date</th>
                <th className="px-5 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-bg-elevated flex items-center justify-center">
                        <Users size={20} className="text-text-muted" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-secondary">No patients found</p>
                        <p className="text-xs text-text-muted mt-0.5">Try adjusting your search or filters</p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((patient) => (
                  <tr key={patient.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-neon-purple/10 border border-neon-purple/15 flex items-center justify-center text-neon-purple text-xs font-bold flex-shrink-0">
                          {patient.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-text-primary">{patient.name}</p>
                          <p className="text-xs text-text-muted">Age {patient.age} · {patient.gender}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <code className="text-xs font-mono text-neon-purple bg-neon-purple/10 px-2 py-0.5 rounded-lg">{patient.id}</code>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-text-secondary">{patient.condition}</td>
                    <td className="px-5 py-3.5 text-xs text-text-muted">{patient.branch}</td>
                    <td className="px-5 py-3.5 text-xs text-text-secondary">{patient.doctor}</td>
                    <td className="px-5 py-3.5">
                      <Badge variant={statusVariants[patient.status] ?? "default"} dot>
                        {patient.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-text-muted">{patient.date}</td>
                    <td className="px-5 py-3.5">
                      <Link href={`/patients/${patient.id}`}>
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          View <ChevronRight size={14} />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {filtered.length > 0 && (
          <div className="px-5 py-3 border-t border-border flex items-center justify-between">
            <p className="text-xs text-text-muted">Showing {filtered.length} of {patients.length} patients</p>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" disabled>Prev</Button>
              <Button variant="ghost" size="sm">Next</Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
