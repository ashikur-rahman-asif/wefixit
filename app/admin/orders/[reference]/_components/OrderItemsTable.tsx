import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AdminOrderDetail } from "@/types/admin";
import Image from "next/image";

export function OrderItemsTable({ order }: { order: AdminOrderDetail }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-bold text-titleBlack">Order Items</h2>
      </div>
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
                QTY
              </TableHead>
              <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto text-right">
                Total
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-50">
            {order.items?.map((item) => (
              <TableRow key={item.id} className="hover:bg-transparent border-none">
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden flex-shrink-0">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-gray-600 font-medium text-xs font-semibold">N/A</span>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-titleBlack text-sm line-clamp-2">
                        {item.name}
                      </p>
                      {item.color && (
                        <p className="text-xs text-textGray font-medium mt-0.5">
                          Color: {item.color}
                        </p>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 font-semibold text-titleBlack text-sm">
                  {order.currency.toUpperCase()}{" "}
                  {item.price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell className="px-6 py-4 font-semibold text-titleBlack text-sm">
                  x{item.quantity}
                </TableCell>
                <TableCell className="px-6 py-4 font-bold text-titleBlack text-sm text-right">
                  {order.currency.toUpperCase()}{" "}
                  {item.total.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="p-6 bg-[#F8F9FB] border-t border-gray-100 flex justify-end">
        <div className="w-full max-w-sm space-y-3">
          <div className="flex justify-between text-sm font-semibold text-textGray">
            <span>Subtotal</span>
            <span>
              {order.currency.toUpperCase()}{" "}
              {order.summary.subtotal.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="flex justify-between text-sm font-semibold text-textGray">
            <span>Shipping</span>
            <span>
              {order.currency.toUpperCase()}{" "}
              {order.summary.shipping.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="pt-3 border-t border-gray-200 flex justify-between text-base font-bold text-titleBlack">
            <span>Total</span>
            <span>
              {order.currency.toUpperCase()}{" "}
              {order.summary.total.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
