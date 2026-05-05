"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical, Edit2, Trash2, ShieldCheck, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  joined_at: string;
}

interface UsersTableProps {
  users: UserData[];
}

export default function UsersTable({ users }: UsersTableProps) {
  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return (
          <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Admin
          </Badge>
        );
      default:
        return (
          <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 flex items-center gap-1">
            <User className="w-3 h-3" /> User
          </Badge>
        );
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Active</Badge>;
      default:
        return <Badge className="bg-red-500/10 text-red-400 border-red-500/20">{status}</Badge>;
    }
  };

  return (
    <div className="glass-card overflow-hidden">
      <Table>
        <TableHeader className="bg-white/5">
          <TableRow className="border-white/5 hover:bg-transparent">
            <TableHead className="text-[10px] uppercase tracking-widest font-bold">User</TableHead>
            <TableHead className="text-[10px] uppercase tracking-widest font-bold">Role</TableHead>
            <TableHead className="text-[10px] uppercase tracking-widest font-bold">Status</TableHead>
            <TableHead className="text-[10px] uppercase tracking-widest font-bold">Joined Date</TableHead>
            <TableHead className="text-[10px] uppercase tracking-widest font-bold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-32 text-center text-text-muted">
                No users found.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium text-text-primary">{user.name}</span>
                    <span className="text-xs text-text-muted">{user.email}</span>
                  </div>
                </TableCell>
                <TableCell>{getRoleBadge(user.role)}</TableCell>
                <TableCell>{getStatusBadge(user.status)}</TableCell>
                <TableCell className="text-text-muted text-xs">
                  {new Date(user.joined_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="h-8 w-8 text-text-muted hover:text-text-primary" />}>
                      <MoreVertical className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-[#121222] border-white/10">
                      <DropdownMenuItem className="gap-2 cursor-pointer">
                        <Edit2 className="h-4 w-4" /> Edit User
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 cursor-pointer text-red-400 hover:text-red-400 focus:text-red-400">
                        <Trash2 className="h-4 w-4" /> Suspend
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
