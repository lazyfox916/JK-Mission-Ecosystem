"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FileUploader } from "@/components/ui/FileUploader";
import { Badge } from "@/components/ui/Badge";
import { Brain, CheckCircle } from "lucide-react";

export default function UploadPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", age: "", gender: "male", phone: "",
    condition: "", notes: "", branch: "patna-main",
  });

  const handleChange = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleNext = () => {
    if (!form.name || !form.age || !form.condition) {
      toast.error("Please fill in all required fields");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setSubmitted(true);
    toast.success("Patient data uploaded successfully!");
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md w-full text-center" padding="lg">
          <div className="w-16 h-16 rounded-2xl bg-success/10 border border-success/25 flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={28} className="text-success" />
          </div>
          <h2 className="text-lg font-bold text-text-primary mb-2">Upload Successful!</h2>
          <p className="text-sm text-text-muted mb-1">
            Patient <strong className="text-text-primary">{form.name}</strong> has been registered.
          </p>
          <p className="text-xs text-text-muted mb-6">
            AI analysis has been queued. You&#39;ll be notified when results are ready.
          </p>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => { setSubmitted(false); setStep(1); setForm({ name: "", age: "", gender: "male", phone: "", condition: "", notes: "", branch: "patna-main" }); }}
            >
              Upload Another
            </Button>
            <Button className="flex-1" onClick={() => window.location.href = "/analysis"}>
              <Brain size={15} />
              View Analysis
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Upload Patient Data</h1>
        <p className="mt-1 text-sm text-text-muted">
          Add a new patient and upload their medical files for AI analysis.
        </p>
      </div>

      {/* Steps indicator */}
      <div className="flex items-center gap-3">
        {[
          { n: 1, label: "Patient Info" },
          { n: 2, label: "Upload Files" },
        ].map(({ n, label }) => (
          <div key={n} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 ${
              step >= n
                ? "bg-neon-purple text-white shadow-[0_0_12px_rgba(139,92,246,0.4)]"
                : "bg-bg-elevated text-text-muted border border-border"
            }`}>
              {n}
            </div>
            <span className={`text-sm font-medium ${step >= n ? "text-text-primary" : "text-text-muted"}`}>{label}</span>
            {n < 2 && <div className={`h-px w-12 transition-all duration-200 ${step > n ? "bg-neon-purple" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <Card padding="lg">
          <h2 className="text-sm font-semibold text-text-primary mb-5">Patient Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Input
                label="Full Name *"
                placeholder="e.g. Ananya Singh"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <Input
              label="Age *"
              type="number"
              placeholder="e.g. 34"
              value={form.age}
              onChange={(e) => handleChange("age", e.target.value)}
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Gender</label>
              <div className="flex gap-2 p-1 bg-bg-base rounded-xl border border-border">
                {["male", "female", "other"].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => handleChange("gender", g)}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-lg capitalize transition-all duration-200 ${
                      form.gender === g ? "bg-neon-purple text-white" : "text-text-muted hover:text-text-secondary"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <Input
              label="Phone Number"
              placeholder="+91 XXXXX XXXXX"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Branch *</label>
              <select
                className="h-10 px-4 bg-bg-elevated border border-border rounded-xl text-sm text-text-primary outline-none focus:border-neon-purple/60 transition-all duration-200"
                value={form.branch}
                onChange={(e) => handleChange("branch", e.target.value)}
              >
                <option value="patna-main">Patna Main</option>
                <option value="muzaffarpur">Muzaffarpur</option>
                <option value="gaya">Gaya</option>
                <option value="bhagalpur">Bhagalpur</option>
              </select>
            </div>
            <div className="col-span-2">
              <Input
                label="Condition / Test Required *"
                placeholder="e.g. Retinal Scan, MRI Brain, Blood Panel"
                value={form.condition}
                onChange={(e) => handleChange("condition", e.target.value)}
              />
            </div>
            <div className="col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Clinical Notes</label>
              <textarea
                placeholder="Add any relevant clinical observations or instructions..."
                value={form.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-bg-elevated border border-border rounded-xl text-sm text-text-primary placeholder-text-muted outline-none focus:border-neon-purple/60 resize-none transition-all duration-200"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button onClick={handleNext} size="md">
              Continue to File Upload →
            </Button>
          </div>
        </Card>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <Card padding="md">
            <div className="flex items-center gap-3 mb-1">
              <Badge variant="purple">{form.id ?? "New Patient"}</Badge>
              <span className="text-sm font-semibold text-text-primary">{form.name}</span>
              <span className="text-xs text-text-muted">·</span>
              <span className="text-xs text-text-muted">Age {form.age} · {form.condition}</span>
            </div>
          </Card>

          <Card padding="lg">
            <h2 className="text-sm font-semibold text-text-primary mb-1">Upload Medical Files</h2>
            <p className="text-xs text-text-muted mb-5">Upload scans, reports, X-rays, or any relevant medical documents. AI will analyze them automatically.</p>
            <FileUploader
              accept="image/*,video/*,.pdf,.doc,.docx"
              multiple
            />
          </Card>

          <Card padding="md">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-neon-cyan/10 flex items-center justify-center flex-shrink-0">
                <Brain size={18} className="text-neon-cyan" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">AI Analysis will start automatically</p>
                <p className="text-xs text-text-muted">Results are typically ready within 15–30 minutes.</p>
              </div>
              <Badge variant="info" className="ml-auto">Auto-queued</Badge>
            </div>
          </Card>

          <div className="flex items-center gap-3 justify-between">
            <Button variant="ghost" onClick={() => setStep(1)}>← Back</Button>
            <Button size="md" loading={loading} onClick={handleSubmit}>
              Submit & Start Analysis
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
