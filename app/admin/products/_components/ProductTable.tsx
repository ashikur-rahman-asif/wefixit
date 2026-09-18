"use client";

import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { AdminProduct } from "@/types/admin";
import { Edit2, Package, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
      <div className="bg-white rounded-[20px] border border-gray-100 p-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-[20px] border border-gray-100 p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <Package className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-titleBlack mb-1">
          No products found
        </h3>
        <p className="text-textGray">Get started by creating a new product.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[20px] border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-[#F8F9FB] border-b border-gray-100">
            <TableRow className="border-none hover:bg-transparent">
              <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto">
                Product
              </TableHead>
              <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto">
                Price
              </TableHead>
              <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto">
                Stock
              </TableHead>
              <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto">
                Category
              </TableHead>
              <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto">
                Status
              </TableHead>
              <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => {
              const currentStatus =
                pendingStatuses[product.id] ?? product.is_active;

              return (
                <TableRow 
                  key={product.id}
                  className="hover:bg-gray-50/50 border-none transition-colors"
                >
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0 relative">
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <Package className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-titleBlack text-sm">
                          {product.title}
                        </div>
                        <div className="text-gray-600 font-medium text-xs mt-0.5">
                          {product.slug}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    {product.discount_price ? (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-titleBlack">
                          ${product.discount_price}
                        </span>
                        <span className="text-xs font-medium text-textGray line-through">
                          ${product.price}
                        </span>
                      </div>
                    ) : (
                      <span className="font-semibold text-titleBlack text-sm">${product.price}</span>
                    )}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <span
                      className={cn(
                        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold",
                        product.stock > 10
                          ? "bg-green-50 text-green-700"
                          : product.stock > 0
                            ? "bg-orange-50 text-orange-700"
                            : "bg-red-50 text-red-700",
                      )}>
                      {product.stock} in stock
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-gray-600 font-medium text-sm">
                    {product.category?.name || "Uncategorized"}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={currentStatus}
                        onCheckedChange={(checked) =>
                          onToggleStatus(product.id, checked)
                        }
                        className="data-[state=checked]:bg-brand cursor-pointer"
                      />
                      <span
                        className={cn(
                          "text-sm font-semibold w-20 inline-block",
                          currentStatus ? "text-titleBlack" : "text-gray-600",
                        )}>
                        {currentStatus ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${product.slug}/edit`}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 font-medium hover:text-brand hover:bg-brand/10 transition-colors cursor-pointer"
                        title="Edit">
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => onDelete(product.id)}
                        disabled={isDeleting}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 font-medium hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50 cursor-pointer"
                        title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
