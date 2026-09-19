"use client";

import { useState } from "react";
import { Loader, PageLoader } from "@/components/ui/loader";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdminUser } from "@/types/admin";
import { Suspense } from "react";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAdminUsers, useUpdateUserRoles, useUsersFilter } from "@/features/users/hooks/use-admin-users";
import { UpdateRoleModal } from "@/components/admin/UpdateRoleModal";

function AdminUsersContent() {
  const {
    perPage,
    role,
    searchQuery,
    setSearchQuery,
    queryParams,
    handleFilterChange,
  } = useUsersFilter();

  const { data, isLoading } = useAdminUsers(queryParams);
  const updateRoleMutation = useUpdateUserRoles();

  const users = data?.data || [];
  const meta = data?.meta;

  const [userToUpdate, setUserToUpdate] = useState<AdminUser | null>(null);

  const handleConfirmRoleUpdate = (roles: string[]) => {
    if (userToUpdate) {
      updateRoleMutation.mutate(
        { id: userToUpdate.id, roles },
        {
          onSettled: () => setUserToUpdate(null),
        }
      );
    }
  };

  return (
    <div className="bg-[#F8F9FB] min-h-screen p-6">
      <UpdateRoleModal
        isOpen={!!userToUpdate}
        onClose={() => setUserToUpdate(null)}
        onConfirm={handleConfirmRoleUpdate}
        user={userToUpdate}
        isUpdating={updateRoleMutation.isPending}
      />

      <div className="max-w-[1600px] mx-auto space-y-6">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage system users and their roles
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex flex-1 gap-4 items-center w-full">
              <div className="relative flex-1 max-w-md">
                <Input
                  type="text"
                  placeholder="Search by name, email or phone..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    handleFilterChange("search", e.target.value);
                  }}
                  className="py-0! h-10 rounded-lg text-sm border-gray-200"
                  label=""
                />
              </div>

              <Select
                value={role}
                onValueChange={(val) => handleFilterChange("role", val)}
              >
                <SelectTrigger className="md:w-37.5 h-10 border-gray-200 text-sm">
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admins</SelectItem>
                  <SelectItem value="user">Users</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 whitespace-nowrap">
                Show
              </span>
              <Select
                value={perPage.toString()}
                onValueChange={(val) => handleFilterChange("perPage", val)}
              >
                <SelectTrigger className="w-[70px] h-10 border-gray-200 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="overflow-x-auto min-h-[400px]">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-gray-100">
                  <TableHead className="font-medium text-gray-700">Name</TableHead>
                  <TableHead className="font-medium text-gray-700">Email</TableHead>
                  <TableHead className="font-medium text-gray-700">Phone</TableHead>
                  <TableHead className="font-medium text-gray-700">Orders</TableHead>
                  <TableHead className="font-medium text-gray-700">Repairs</TableHead>
                  <TableHead className="font-medium text-gray-700">Roles</TableHead>
                  <TableHead className="font-medium text-gray-700 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-[400px] text-center">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <Loader size="md" />
                        <p className="text-muted-foreground text-sm font-medium">Loading users...</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-[400px] text-center">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <p className="text-lg font-medium text-gray-900 mb-1">
                          No users found
                        </p>
                        <p>Try adjusting your search or filters.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => {
                    const isAdmin = user.roles.includes("admin");
                    
                    return (
                      <TableRow
                        key={user.id}
                        className="group hover:bg-gray-50/50 transition-colors"
                      >
                        <TableCell className="font-semibold text-gray-900 whitespace-nowrap">
                          {user.name}
                        </TableCell>
                        <TableCell className="font-medium text-gray-900 whitespace-nowrap">
                          {user.email}
                        </TableCell>
                        <TableCell className="font-medium text-gray-900 whitespace-nowrap">
                          {user.phone || "-"}
                        </TableCell>
                        <TableCell className="font-medium text-gray-900">
                          {user.ordersCount}
                        </TableCell>
                        <TableCell className="font-medium text-gray-900">
                          {user.repairsCount}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1.5 flex-wrap">
                            {user.roles.map((role) => (
                              <span
                                key={role}
                                className={cn(
                                  "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize",
                                  role === "admin"
                                    ? "bg-purple-100 text-purple-700 border border-purple-200"
                                    : "bg-gray-100 text-gray-700 border border-gray-200"
                                )}
                              >
                                {role}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <button
                            onClick={() => setUserToUpdate(user)}
                            className={cn(
                              "p-2 rounded-lg transition-colors",
                              isAdmin
                                ? "text-red-600 hover:bg-red-50"
                                : "text-brand hover:bg-brand/10"
                            )}
                            title={isAdmin ? "Remove Admin Access" : "Make Admin"}
                          >
                            {isAdmin ? (
                              <ShieldAlert className="w-4 h-4" />
                            ) : (
                              <ShieldCheck className="w-4 h-4" />
                            )}
                          </button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {}
          {meta && meta.lastPage > 1 && (
            <div className="border-t border-gray-100 p-4 flex items-center justify-between bg-gray-50/50 mt-auto">
              <p className="text-sm text-gray-500">
                Showing <span className="font-medium text-gray-900">{meta.from || 0}</span> to{" "}
                <span className="font-medium text-gray-900">{meta.to || 0}</span> of{" "}
                <span className="font-medium text-gray-900">{meta.total}</span> users
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleFilterChange("page", (meta.currentPage - 1).toString())}
                  disabled={meta.currentPage === 1}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() => handleFilterChange("page", (meta.currentPage + 1).toString())}
                  disabled={meta.currentPage === meta.lastPage}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminUsersPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center p-6">
          <PageLoader message="Loading users..." />
        </div>
      }
    >
      <AdminUsersContent />
    </Suspense>
  );
}
