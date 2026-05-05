"use client";

import { useState } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface DangerZoneCardProps {
  title: string;
  description: string;
  confirmText: string;
  buttonLabel: string;
  onConfirm: () => Promise<void>;
  isLoading?: boolean;
  severity?: "danger" | "critical";
}

export function DangerZoneCard({
  title,
  description,
  confirmText,
  buttonLabel,
  onConfirm,
  isLoading: externalLoading,
  severity = "danger",
}: DangerZoneCardProps) {
  const [confirmInput, setConfirmInput] = useState("");
  const [internalLoading, setInternalLoading] = useState(false);

  const isLoading = externalLoading || internalLoading;
  const isConfirmed = confirmInput === confirmText;

  const handleConfirm = async () => {
    if (!isConfirmed) return;
    setInternalLoading(true);
    try {
      await onConfirm();
      setConfirmInput("");
      toast.success("Action completed successfully");
    } catch (err) {
      toast.error(String(err));
    } finally {
      setInternalLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "p-5 rounded-[14px] border transition-all duration-200",
        severity === "danger"
          ? "bg-red-500/4 border-red-500/18"
          : "bg-red-500/8 border-red-500/32"
      )}
    >
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle size={16} className="text-red-500" />
        <h4 className="text-[13px] font-bold text-red-500 font-heading uppercase tracking-tight">
          {title}
        </h4>
      </div>
      
      <p className="text-[11.5px] text-red-300/55 leading-relaxed mb-4">
        {description}
      </p>

      <div className="flex flex-col gap-3">
        <input
          type="text"
          value={confirmInput}
          onChange={(e) => setConfirmInput(e.target.value)}
          placeholder={`Type "${confirmText}" to confirm`}
          className="w-full bg-black/20 border border-red-500/20 rounded-[8px] px-3 py-2 text-[12px] text-red-200 font-mono placeholder:text-red-900/40 outline-none focus:border-red-500/50"
        />

        <button
          onClick={handleConfirm}
          disabled={!isConfirmed || isLoading}
          className={cn(
            "w-full h-9 rounded-[8px] text-[11px] font-bold uppercase tracking-widest transition-all duration-200",
            isConfirmed && !isLoading
              ? "bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-900/20"
              : "bg-red-900/20 text-red-500/40 cursor-not-allowed"
          )}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 size={12} className="animate-spin" />
              <span>Processing...</span>
            </div>
          ) : (
            buttonLabel
          )}
        </button>
      </div>
    </div>
  );
}
