"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { GitBranch, Users, Activity, MapPin, Phone, Plus, Edit2 } from "lucide-react";

const branches = [
  {
    id: "BR001", name: "Patna Main", city: "Patna", state: "Bihar",
    address: "15, Exhibition Road, Patna - 800001",
    phone: "+91 612 2234567", status: "active",
    patients: 648, staff: 12, doctors: 4,
    revenue: "₹2.4L", established: "Jan 2019",
    head: "Dr. Rajesh Kumar",
  },
  {
    id: "BR002", name: "Muzaffarpur Branch", city: "Muzaffarpur", state: "Bihar",
    address: "7, Station Road, Muzaffarpur - 842001",
    phone: "+91 621 2345678", status: "active",
    patients: 312, staff: 7, doctors: 2,
    revenue: "₹1.1L", established: "Jun 2021",
    head: "Dr. Priya Sinha",
  },
  {
    id: "BR003", name: "Gaya Center", city: "Gaya", state: "Bihar",
    address: "3, Hospital Road, Gaya - 823001",
    phone: "+91 631 2456789", status: "active",
    patients: 189, staff: 5, doctors: 1,
    revenue: "₹0.72L", established: "Mar 2022",
    head: "Dr. Amit Roy",
  },
  {
    id: "BR004", name: "Bhagalpur Clinic", city: "Bhagalpur", state: "Bihar",
    address: "22, Tilkamanjhi, Bhagalpur - 812001",
    phone: "+91 641 2567890", status: "maintenance",
    patients: 135, staff: 4, doctors: 1,
    revenue: "₹0.58L", established: "Sep 2022",
    head: "Dr. Neha Jha",
  },
];

export default function BranchesPage() {
  const [selected, setSelected] = useState(branches[0]);
  const [addModal, setAddModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Branch Management</h1>
          <p className="mt-1 text-sm text-text-muted">{branches.length} branches across Bihar</p>
        </div>
        <Button size="sm" onClick={() => setAddModal(true)}>
          <Plus size={14} />
          Add Branch
        </Button>
      </div>

      {/* Totals */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Branches", value: branches.length, color: "#8b5cf6" },
          { label: "Total Patients", value: branches.reduce((a, b) => a + b.patients, 0).toLocaleString(), color: "#06b6d4" },
          { label: "Total Staff", value: branches.reduce((a, b) => a + b.staff, 0), color: "#10b981" },
          { label: "Active Branches", value: branches.filter(b => b.status === "active").length, color: "#f59e0b" },
        ].map((s) => (
          <Card key={s.label}>
            <p className="text-xs text-text-muted">{s.label}</p>
            <p className="mt-1 text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-6">
        {/* Branch list */}
        <div className="col-span-2 space-y-2">
          {branches.map((b) => (
            <button
              key={b.id}
              onClick={() => setSelected(b)}
              className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 ${
                selected.id === b.id
                  ? "bg-neon-purple/10 border-neon-purple/30 shadow-[0_0_20px_rgba(139,92,246,0.1)]"
                  : "bg-bg-card border-border hover:border-neon-purple/20 hover:bg-neon-purple/5"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  selected.id === b.id ? "bg-neon-purple/20 text-neon-purple" : "bg-bg-elevated text-text-muted"
                }`}>
                  <GitBranch size={15} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-text-primary truncate">{b.name}</p>
                  <p className="text-xs text-text-muted">{b.city}, {b.state}</p>
                </div>
                <Badge variant={b.status === "active" ? "success" : "warning"} dot>{b.status}</Badge>
              </div>
              <div className="flex items-center gap-4 text-xs text-text-muted pl-11">
                <span className="flex items-center gap-1"><Users size={11} />{b.patients} patients</span>
                <span className="flex items-center gap-1"><Activity size={11} />{b.doctors} doctors</span>
              </div>
            </button>
          ))}
        </div>

        {/* Branch detail */}
        <div className="col-span-3 space-y-4">
          <Card padding="lg">
            <div className="flex items-start justify-between mb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-lg font-bold text-text-primary">{selected.name}</h2>
                  <Badge variant={selected.status === "active" ? "success" : "warning"} dot>{selected.status}</Badge>
                </div>
                <p className="text-xs text-text-muted">Est. {selected.established} · Head: {selected.head}</p>
              </div>
              <Button variant="secondary" size="sm">
                <Edit2 size={13} />
                Edit
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <MapPin size={14} />, label: "Address", value: selected.address },
                { icon: <Phone size={14} />, label: "Phone", value: selected.phone },
              ].map((item) => (
                <div key={item.label} className="flex gap-3 p-3 bg-bg-elevated rounded-xl border border-border">
                  <span className="text-text-muted flex-shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <p className="text-[10px] text-text-muted uppercase tracking-wider mb-0.5">{item.label}</p>
                    <p className="text-xs text-text-secondary">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Total Patients", value: selected.patients.toLocaleString(), color: "#06b6d4" },
              { label: "Staff Members", value: selected.staff, color: "#8b5cf6" },
              { label: "Doctors", value: selected.doctors, color: "#10b981" },
              { label: "Monthly Revenue", value: selected.revenue, color: "#f59e0b" },
            ].map((s) => (
              <Card key={s.label} padding="sm">
                <p className="text-xs text-text-muted">{s.label}</p>
                <p className="mt-1 text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
              </Card>
            ))}
          </div>

          {/* Switch branch */}
          <Card padding="md">
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Quick Switch</p>
            <div className="flex flex-wrap gap-2">
              {branches.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelected(b)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-xl border transition-all duration-200 ${
                    selected.id === b.id
                      ? "bg-neon-purple text-white border-neon-purple/50 shadow-[0_0_10px_rgba(139,92,246,0.3)]"
                      : "bg-bg-elevated text-text-muted border-border hover:border-neon-purple/30"
                  }`}
                >
                  {b.city}
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Add branch modal */}
      <Modal open={addModal} onClose={() => setAddModal(false)} title="Add New Branch" size="md">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Branch Name *" placeholder="e.g. Hajipur Branch" />
            <Input label="City *" placeholder="e.g. Hajipur" />
            <Input label="Address *" placeholder="Full address" />
            <Input label="Phone" placeholder="+91 XXXXX XXXXX" />
            <Input label="Branch Head (Doctor)" placeholder="Dr. Name" />
            <Input label="State" placeholder="Bihar" />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setAddModal(false)}>Cancel</Button>
            <Button onClick={() => setAddModal(false)}>Create Branch</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
