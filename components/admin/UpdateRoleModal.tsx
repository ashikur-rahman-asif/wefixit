import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminUser } from "@/types/admin";

interface UpdateRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (roles: string[]) => void;
  user: AdminUser | null;
  isUpdating?: boolean;
}

export function UpdateRoleModal({
  isOpen,
  onClose,
  onConfirm,
  user,
  isUpdating = false,
}: UpdateRoleModalProps) {
  const isAdmin = user?.roles.includes("admin");

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      {}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm duration-100 animate-in fade-in-0" />
      )}
      <DialogContent className="z-50">
        <DialogHeader>
          <DialogTitle>Change User Role</DialogTitle>
          <DialogDescription>
            You are about to change the role for <strong>{user?.name}</strong>.
            {isAdmin ? (
              <span className="block mt-2 text-red-500 font-medium">
                They will lose their Admin privileges.
              </span>
            ) : (
              <span className="block mt-2 text-brand font-medium">
                They will be granted full Admin access.
              </span>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" disabled={isUpdating} onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant={isAdmin ? "destructive" : "default"}
            onClick={(e) => {
              e.preventDefault();
              onConfirm(isAdmin ? ["user"] : ["admin"]);
            }}
            disabled={isUpdating}
            className="flex items-center gap-2"
          >
            {isUpdating && <Loader2 className="h-4 w-4 animate-spin" />}
            {isAdmin ? "Remove Admin Role" : "Make Admin"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
