"use client";

import { SectionCard } from "../shared/SectionCard";
import { SettingRow } from "../shared/SettingRow";
import { StatusBadge } from "../shared/StatusBadge";
import { UserPlus, Shield, Trash2 } from "lucide-react";
import useSWR from "swr";
import { AdminUser } from "@/types/admin-settings";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

export function AdminsTab() {
  const { data: admins, mutate, error } = useSWR<AdminUser[] | { error: string }>(
    "/api/admin/settings/admins",
    (url: string) => fetch(url).then((r) => r.json())
  );
  // Handle potential error from API response that returns { error: "..." } instead of array
  const adminsArray = Array.isArray(admins) ? admins : [];
  const apiError = (!Array.isArray(admins) && admins && 'error' in admins) ? admins.error : error;

  const handleDemote = async (userId: string) => {
    try {
      const res = await fetch(`/api/admin/settings/admins/${userId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Admin demoted to user");
        mutate();
      } else {
        const data = await res.json();
        throw new Error(data.error);
      }
    } catch (err) {
      toast.error(String(err));
    }
  };

  return (
    <div className="space-y-6">
      <SectionCard
        title="Admin User Management"
        icon={<Shield size={16} />}
        iconColor="orange"
        badge={
          <button className="flex items-center gap-2 px-3 py-1 bg-admin-orange/10 border border-admin-orange/20 rounded-[6px] text-txt-orange text-[11px] font-bold uppercase tracking-wider hover:bg-admin-orange/20 transition-all">
            <UserPlus size={12} />
            <span>Add Admin</span>
          </button>
        }
      >
        <div className="divide-y divide-white/5">
          {adminsArray.map((admin) => (
            <div key={admin.id} className="p-4 flex items-center justify-between hover:bg-white/2 transition-colors">
              <div className="flex items-center gap-3">
                <Avatar className="w-9 h-9 border border-white/10">
                  <AvatarImage src={admin.avatar_url || ""} />
                  <AvatarFallback className="bg-admin-orange/10 text-txt-orange text-[12px] font-bold uppercase">
                    {admin.full_name?.charAt(0) || "A"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-bold text-txt-primary">{admin.full_name}</span>
                    {admin.isCurrentUser && (
                      <StatusBadge variant="orange">You</StatusBadge>
                    )}
                  </div>
                  <span className="text-[11px] text-txt-muted">{admin.email}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] text-txt-muted uppercase tracking-tighter">Last Login</span>
                  <span className="text-[11px] text-txt-secondary">
                    {admin.last_login ? new Date(admin.last_login).toLocaleDateString() : "Never"}
                  </span>
                </div>

                {!admin.isCurrentUser && (
                  <button
                    onClick={() => handleDemote(admin.id)}
                    className="p-2 text-txt-muted hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all"
                    title="Demote to User"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}

          {adminsArray.length === 0 && !apiError && admins && (
            <div className="p-8 text-center text-txt-muted text-[12px] italic">
              No other administrators found.
            </div>
          )}

          {apiError && (
            <div className="p-8 text-center text-red-400 text-[12px] italic bg-red-500/5">
              Error loading administrators: {String(apiError)}
            </div>
          )}

          {!admins && !apiError && (
            <div className="p-8 text-center text-txt-muted text-[12px] italic">
              Loading administrators...
            </div>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Security Policies" icon={<Shield size={16} />} iconColor="amber">
        <SettingRow label="Two-Factor Required" description="Force all admins to use 2FA to access the panel">
          <StatusBadge variant="warning">Setup Required</StatusBadge>
        </SettingRow>
        <SettingRow label="Admin Session Timeout" description="Auto-logout after period of inactivity">
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-txt-primary font-bold">4 Hours</span>
          </div>
        </SettingRow>
      </SectionCard>
    </div>
  );
}
