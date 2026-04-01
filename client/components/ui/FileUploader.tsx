"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { Upload, File, X, CheckCircle, AlertCircle } from "lucide-react";

export interface UploadedFile {
  file: File;
  id: string;
  progress: number;
  status: "uploading" | "done" | "error";
  preview?: string;
}

interface FileUploaderProps {
  accept?: string;
  multiple?: boolean;
  onFilesChange?: (files: UploadedFile[]) => void;
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileUploader({ accept = "*/*", multiple = true, onFilesChange }: FileUploaderProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const newFiles: UploadedFile[] = Array.from(incoming).map((f) => ({
      file: f,
      id: Math.random().toString(36).slice(2),
      progress: 0,
      status: "uploading",
      preview: f.type.startsWith("image/") ? URL.createObjectURL(f) : undefined,
    }));

    const updated = [...files, ...newFiles];
    setFiles(updated);
    onFilesChange?.(updated);

    // Simulate upload progress
    newFiles.forEach((uf) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 25;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setFiles((prev) =>
            prev.map((f) =>
              f.id === uf.id ? { ...f, progress: 100, status: "done" } : f
            )
          );
        } else {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === uf.id ? { ...f, progress } : f
            )
          );
        }
      }, 200);
    });
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    processFiles(e.dataTransfer.files);
  };

  const handleRemove = (id: string) => {
    const updated = files.filter((f) => f.id !== id);
    setFiles(updated);
    onFilesChange?.(updated);
  };

  return (
    <div className="space-y-4">
      <div
        className={`
          relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer
          transition-all duration-200
          ${dragging
            ? "border-neon-purple bg-neon-purple/10 shadow-[0_0_30px_rgba(139,92,246,0.2)]"
            : "border-border hover:border-neon-purple/40 hover:bg-neon-purple/5"
          }
        `}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={(e: ChangeEvent<HTMLInputElement>) => processFiles(e.target.files)}
        />
        <div className="flex flex-col items-center gap-3">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 ${dragging ? "bg-neon-purple/20" : "bg-bg-elevated"}`}>
            <Upload size={24} className={dragging ? "text-neon-purple" : "text-text-muted"} />
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary">
              {dragging ? "Drop files here" : "Drag & drop files or click to browse"}
            </p>
            <p className="mt-1 text-xs text-text-muted">
              Supports images, videos, PDFs, and documents
            </p>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((uf) => (
            <div key={uf.id} className="flex items-center gap-3 p-3 bg-bg-elevated rounded-xl border border-border">
              {uf.preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={uf.preview} alt={uf.file.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-bg-card flex items-center justify-center flex-shrink-0">
                  <File size={18} className="text-text-muted" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-text-primary truncate">{uf.file.name}</p>
                <p className="text-xs text-text-muted">{formatSize(uf.file.size)}</p>
                {uf.status === "uploading" && (
                  <div className="mt-1.5 h-1 bg-bg-card rounded-full overflow-hidden">
                    <div
                      className="h-full bg-neon-purple rounded-full transition-all duration-200"
                      style={{ width: `${uf.progress}%` }}
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {uf.status === "done" && <CheckCircle size={16} className="text-success" />}
                {uf.status === "error" && <AlertCircle size={16} className="text-danger" />}
                <button
                  onClick={(e) => { e.stopPropagation(); handleRemove(uf.id); }}
                  className="w-6 h-6 flex items-center justify-center rounded-lg text-text-muted hover:text-danger hover:bg-danger/10 transition-all duration-150"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
