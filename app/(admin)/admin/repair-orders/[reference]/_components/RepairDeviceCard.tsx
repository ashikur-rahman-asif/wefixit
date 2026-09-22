import { AdminRepairDetail } from "@/types/admin";
import { FileText, Smartphone, Store, Truck, Wrench } from "lucide-react";

export function RepairDeviceCard({ repair }: { repair: AdminRepairDetail }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
          <Smartphone className="w-5 h-5 text-brand" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-titleBlack">Device & Issue</h2>
          <p className="text-textGray text-sm font-medium mt-0.5">
            Details of the reported problem
          </p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-textGray text-xs font-semibold mb-1 uppercase tracking-wider">
              Brand
            </p>
            <p className="font-bold text-titleBlack">{repair.brand}</p>
          </div>
          <div>
            <p className="text-textGray text-xs font-semibold mb-1 uppercase tracking-wider">
              Model
            </p>
            <p className="font-bold text-titleBlack">{repair.modelName}</p>
          </div>
        </div>

        <div>
          <p className="text-textGray text-xs font-semibold mb-2 uppercase tracking-wider flex items-center gap-1.5">
            <Wrench className="w-3.5 h-3.5" /> Issue
          </p>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <p className="font-bold text-titleBlack mb-1">{repair.issue}</p>
            {repair.issueDescription && (
              <p className="text-sm font-medium text-gray-600 font-medium">
                {repair.issueDescription}
              </p>
            )}
          </div>
        </div>

        {repair.additionalComments && (
          <div>
            <p className="text-textGray text-xs font-semibold mb-2 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" /> Additional Comments
            </p>
            <div className="bg-orange-50/50 rounded-xl p-4 border border-orange-100/50">
              <p className="text-sm font-medium text-gray-700 italic">
                &quot;{repair.additionalComments}&quot;
              </p>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-gray-100">
          <p className="text-textGray text-xs font-semibold mb-2 uppercase tracking-wider">
            Handover Method
          </p>
          <div className="flex items-center gap-2">
            {repair.handoverMethod === "store" ? (
              <Store className="w-5 h-5 text-gray-600 font-medium" />
            ) : (
              <Truck className="w-5 h-5 text-gray-600 font-medium" />
            )}
            <span className="font-semibold text-titleBlack">{repair.handoverMethodLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
