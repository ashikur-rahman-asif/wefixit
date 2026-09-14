import { AdminRepairDetail } from "@/types/admin";
import { User, Mail, Phone, MapPin } from "lucide-react";

export function RepairCustomerCard({ repair }: { repair: AdminRepairDetail }) {
  const { customer } = repair;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
          <User className="w-5 h-5 text-blue-500" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-titleBlack">Customer Details</h2>
          <p className="text-textGray text-sm font-medium mt-0.5">
            Contact and location info
          </p>
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <div>
          <p className="text-textGray text-xs font-semibold mb-1 uppercase tracking-wider">
            Name
          </p>
          <p className="font-bold text-titleBlack">
            {customer.firstName} {customer.lastName}
          </p>
        </div>

        <div>
          <p className="text-textGray text-xs font-semibold mb-1 uppercase tracking-wider flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5" /> Email
          </p>
          <a
            href={`mailto:${customer.email}`}
            className="font-semibold text-brand hover:underline"
          >
            {customer.email}
          </a>
        </div>

        {customer.phone && (
          <div>
            <p className="text-textGray text-xs font-semibold mb-1 uppercase tracking-wider flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" /> Phone
            </p>
            <a
              href={`tel:${customer.phone}`}
              className="font-semibold text-titleBlack hover:text-brand transition-colors"
            >
              {customer.phone}
            </a>
          </div>
        )}

        {customer.location && (
          <div>
            <p className="text-textGray text-xs font-semibold mb-1 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Location
            </p>
            <p className="font-semibold text-titleBlack">
              {customer.location}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
