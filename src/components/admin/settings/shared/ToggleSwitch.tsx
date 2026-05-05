"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  color?: "orange" | "green" | "violet";
}

export function ToggleSwitch({
  checked,
  onChange,
  disabled,
  color = "green",
}: ToggleSwitchProps) {
  const bgColors = {
    green: "bg-[#10b981]",
    orange: "bg-[#f97316]",
    violet: "bg-[#7c3aed]",
  };

  return (
    <motion.button
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={cn(
        "relative w-10 h-[22px] rounded-[11px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-admin-orange/20",
        checked ? bgColors[color] : "bg-white/10",
        disabled && "opacity-40 cursor-not-allowed"
      )}
    >
      <motion.div
        animate={{ x: checked ? 20 : 2 }}
        initial={false}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-0.5 left-0 w-[18px] h-[18px] bg-white rounded-full shadow-sm"
      />
    </motion.button>
  );
}
