"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Check, Save } from "lucide-react";
import { SettingsTab } from "@/types/admin-settings";

interface SaveTabButtonProps {
  tab: SettingsTab;
  isDirty: boolean;
  isSaving: boolean;
  onClick: () => void;
}

export function SaveTabButton({
  tab,
  isDirty,
  isSaving,
  onClick,
}: SaveTabButtonProps) {
  return (
    <AnimatePresence>
      {isDirty && (
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          onClick={onClick}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 h-10 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white rounded-[10px] text-[12px] font-bold uppercase tracking-wider shadow-lg shadow-orange-900/20 disabled:opacity-50 transition-all duration-200"
        >
          {isSaving ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save size={14} />
              <span>Save {tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
            </>
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
