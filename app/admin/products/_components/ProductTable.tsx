"use client";

import { AdminProduct } from "@/types/admin";
import { Edit2, Trash2, Package } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ProductTableProps {
  products: AdminProduct[];
  pendingStatuses: Record<number, boolean>;
  isLoading: boolean;
  isDeleting: boolean;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number, status: boolean) => void;
}

export function ProductTable({
  products,
  pendingStatuses,
  isLoading,
  isDeleting,
  onDelete,
  onToggleStatus,
}: ProductTableProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 p-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <Package className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-titleBlack mb-1">No products found</h3>
        <p className="text-textGray">Get started by creating a new product.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[20px] border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="px-6 py-4 text-left text-sm font-semibold text-textGray">Product</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-textGray">Price</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-textGray">Stock</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-textGray">Category</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-textGray">Status</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-textGray">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => {
              const currentStatus =
                pendingStatuses[product.id] ?? product.is_active;

              return (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0 relative">
                        {product.image ? (
                          <Image src={product.image} alt={product.title} fill className="object-cover" />
                        ) : (
                          <Package className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-titleBlack line-clamp-1">{product.title}</div>
                        <div className="text-xs text-textGray">{product.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-titleBlack">
                    {product.discount_price ? (
                      <div>
                        <span className="text-brand">${product.discount_price}</span>
                        <span className="text-textGray line-through text-xs ml-2">${product.price}</span>
                      </div>
                    ) : (
                      <span>${product.price}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                      product.stock > 10 ? "bg-green-100 text-green-800" :
                      product.stock > 0 ? "bg-orange-100 text-orange-800" :
                      "bg-red-100 text-red-800"
                    )}>
                      {product.stock} in stock
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-textGray">
                    {product.category?.name || "Uncategorized"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={currentStatus}
                        onCheckedChange={(checked) =>
                          onToggleStatus(product.id, checked)
                        }
                      />
                      <span className={cn(
                        "text-xs font-medium",
                        currentStatus ? "text-green-600" : "text-gray-500"
                      )}>
                        {currentStatus ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${product.slug}/edit`}
                        className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 text-textGray hover:text-brand hover:bg-brand/5 flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => onDelete(product.id)}
                        disabled={isDeleting}
                        className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 text-textGray hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
