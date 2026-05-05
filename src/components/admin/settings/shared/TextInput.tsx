"use client";

import { useState } from "react";
import { Copy, Check, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface TextInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  type?: "text" | "password" | "email" | "number";
  width?: string;
  readOnly?: boolean;
  copyable?: boolean;
  error?: boolean;
}

export function TextInput({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  width = "100%",
  readOnly,
  copyable,
  error,
}: TextInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setIsCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setIsCopied(false), 2000);
  };

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="flex flex-col gap-1.5" style={{ width }}>
      {label && (
        <label className="text-[11px] font-bold text-txt-muted uppercase tracking-wider px-0.5">
          {label}
        </label>
      )}
      <div className="relative group">
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          readOnly={readOnly}
          className={cn(
            "w-full bg-white/[0.042] border border-white/10 rounded-[10px] px-[14px] py-[8px] text-[13px] text-txt-primary font-sans placeholder:text-txt-muted transition-all duration-200 outline-none",
            "focus:border-admin-orange focus:ring-4 focus:ring-admin-orange/12",
            error && "border-red-500/50",
            readOnly && "opacity-70 cursor-default",
            (copyable || type === "password") && "pr-[38px]"
          )}
        />
        
        {type === "password" && (
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-txt-muted hover:text-txt-primary transition-colors"
          >
            {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        )}

        {copyable && !readOnly && type !== "password" && (
          <button
            onClick={handleCopy}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-txt-muted hover:text-txt-primary transition-colors"
          >
            {isCopied ? <Check size={14} className="text-green" /> : <Copy size={14} />}
          </button>
        )}
      </div>
    </div>
  );
}
