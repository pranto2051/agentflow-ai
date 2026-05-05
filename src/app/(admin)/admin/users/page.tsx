"use client";

import { useState } from "react";
import UsersTable from "@/components/admin/UsersTable";
import { Search, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useEffect } from "react";

interface User {
  id: string;
  full_name: string;
  email: string;
  role: string;
  status: string;
  created_at: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const supabase = createClient();

  useEffect(() => {
    async function loadUsers() {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("id, full_name, role, status, created_at");

        if (error) throw error;
        
        // Profiles don't have email directly in this schema, 
        // they are linked by ID. For now we just use a placeholder 
        // or join if needed.
        const usersWithEmail = (data || []).map(p => ({
          ...p,
          email: "User " + p.id.slice(0, 5) // Placeholder since email is in auth schema
        }));

        setUsers(usersWithEmail as User[]);
      } catch (err) {
        console.error("Error loading users:", err);
        toast.error("Failed to load users from database");
      } finally {
        setIsLoading(false);
      }
    }
    loadUsers();
  }, [supabase]);

  const filteredUsers = users.filter(user => 
    (user.full_name?.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (user.email?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-orange-500">User Management</h1>
          <p className="text-sm text-amber-500/60 uppercase tracking-wider mt-1">Manage and monitor platform users</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700 text-white shadow-orange-900/20">
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-amber-500/40" />
          <Input 
            placeholder="Search by name or email..." 
            className="pl-10 h-10 bg-orange-500/5 border-orange-500/10 text-amber-100 placeholder:text-amber-500/30 focus:border-orange-500/30"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <UsersTable users={filteredUsers} />
    </div>
  );
}
