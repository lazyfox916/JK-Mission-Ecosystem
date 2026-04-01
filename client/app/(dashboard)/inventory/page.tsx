"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Package, Search, Plus, AlertCircle, TrendingDown, TrendingUp } from "lucide-react";

type StockLevel = "ok" | "low" | "critical";

const inventory = [
  { id: "INV001", name: "Retinal Camera Film", category: "Consumables", stock: 48, unit: "rolls", minStock: 20, status: "ok" as StockLevel, lastRestocked: "25 Mar 2025", cost: 1200 },
  { id: "INV002", name: "Ultrasound Gel", category: "Consumables", stock: 12, unit: "bottles", minStock: 15, status: "low" as StockLevel, lastRestocked: "20 Mar 2025", cost: 350 },
  { id: "INV003", name: "ECG Electrodes", category: "Consumables", stock: 3, unit: "packs", minStock: 10, status: "critical" as StockLevel, lastRestocked: "10 Mar 2025", cost: 800 },
  { id: "INV004", name: "Latex Gloves (M)", category: "PPE", stock: 500, unit: "pairs", minStock: 100, status: "ok" as StockLevel, lastRestocked: "28 Mar 2025", cost: 12 },
  { id: "INV005", name: "Surgical Masks", category: "PPE", stock: 85, unit: "pieces", minStock: 50, status: "ok" as StockLevel, lastRestocked: "27 Mar 2025", cost: 15 },
  { id: "INV006", name: "Contrast Dye (MRI)", category: "Reagents", stock: 8, unit: "vials", minStock: 15, status: "low" as StockLevel, lastRestocked: "15 Mar 2025", cost: 2400 },
  { id: "INV007", name: "Sterile Syringes 5ml", category: "Consumables", stock: 200, unit: "pieces", minStock: 100, status: "ok" as StockLevel, lastRestocked: "30 Mar 2025", cost: 8 },
  { id: "INV008", name: "Blood Collection Tubes", category: "Lab", stock: 2, unit: "packs", minStock: 10, status: "critical" as StockLevel, lastRestocked: "05 Mar 2025", cost: 450 },
];

const statusConfig: Record<StockLevel, { variant: "success" | "warning" | "danger"; label: string }> = {
  ok: { variant: "success", label: "In Stock" },
  low: { variant: "warning", label: "Low Stock" },
  critical: { variant: "danger", label: "Critical" },
};

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [editRow, setEditRow] = useState<string | null>(null);

  const filtered = inventory.filter(
    (i) =>
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.category.toLowerCase().includes(search.toLowerCase())
  );

  const criticalCount = inventory.filter((i) => i.status === "critical").length;
  const lowCount = inventory.filter((i) => i.status === "low").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Inventory</h1>
          <p className="mt-1 text-sm text-text-muted">{inventory.length} items tracked across all branches</p>
        </div>
        <Button size="sm">
          <Plus size={14} />
          Add Item
        </Button>
      </div>

      {/* Alert banner */}
      {(criticalCount > 0 || lowCount > 0) && (
        <div className="flex items-center gap-3 p-4 bg-danger/5 border border-danger/20 rounded-2xl">
          <AlertCircle size={18} className="text-danger flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-text-primary">Stock Alert</p>
            <p className="text-xs text-text-muted">
              {criticalCount > 0 && <span className="text-danger font-medium">{criticalCount} critical items</span>}
              {criticalCount > 0 && lowCount > 0 && " and "}
              {lowCount > 0 && <span className="text-warning font-medium">{lowCount} low stock items</span>}
              {" "}need immediate restocking.
            </p>
          </div>
          <Button variant="danger" size="sm" className="ml-auto flex-shrink-0">Reorder Now</Button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Items", value: inventory.length, icon: <Package size={17} />, color: "#8b5cf6" },
          { label: "Low / Critical", value: criticalCount + lowCount, icon: <TrendingDown size={17} />, color: "#ef4444" },
          { label: "Well Stocked", value: inventory.filter(i => i.status === "ok").length, icon: <TrendingUp size={17} />, color: "#10b981" },
        ].map((s) => (
          <Card key={s.label}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${s.color}18`, color: s.color }}>
                {s.icon}
              </div>
              <div>
                <p className="text-xs text-text-muted">{s.label}</p>
                <p className="text-xl font-bold text-text-primary">{s.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Search */}
      <div className="max-w-sm">
        <Input
          placeholder="Search inventory..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<Search size={15} />}
        />
      </div>

      {/* Table */}
      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {["Item", "Category", "Stock", "Min. Stock", "Last Restocked", "Unit Cost", "Status", ""].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((item) => {
                const pct = Math.min(100, (item.stock / (item.minStock * 3)) * 100);
                const status = statusConfig[item.status];
                return (
                  <tr key={item.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-bg-elevated border border-border flex items-center justify-center flex-shrink-0">
                          <Package size={14} className="text-text-muted" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-text-primary">{item.name}</p>
                          <code className="text-[10px] font-mono text-text-muted">{item.id}</code>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge variant="default">{item.category}</Badge>
                    </td>
                    <td className="px-5 py-3.5">
                      {editRow === item.id ? (
                        <input
                          type="number"
                          defaultValue={item.stock}
                          className="w-20 px-2 py-1 bg-bg-base border border-neon-purple/40 rounded-lg text-xs text-text-primary outline-none"
                          onBlur={() => setEditRow(null)}
                          autoFocus
                        />
                      ) : (
                        <div className="min-w-[80px]">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-sm font-semibold ${item.status === "critical" ? "text-danger" : item.status === "low" ? "text-warning" : "text-text-primary"}`}>
                              {item.stock}
                            </span>
                            <span className="text-xs text-text-muted">{item.unit}</span>
                          </div>
                          <div className="h-1 w-20 bg-bg-base rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-300"
                              style={{
                                width: `${pct}%`,
                                background: item.status === "critical" ? "#ef4444" : item.status === "low" ? "#f59e0b" : "#10b981",
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-xs text-text-muted">{item.minStock} {item.unit}</td>
                    <td className="px-5 py-3.5 text-xs text-text-muted">{item.lastRestocked}</td>
                    <td className="px-5 py-3.5 text-xs text-text-secondary">₹{item.cost.toLocaleString()}</td>
                    <td className="px-5 py-3.5">
                      <Badge variant={status.variant} dot>{status.label}</Badge>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm" onClick={() => setEditRow(item.id)}>Edit</Button>
                        <Button variant="secondary" size="sm">Reorder</Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
