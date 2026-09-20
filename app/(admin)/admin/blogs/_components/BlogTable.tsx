"use client";

import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Blog } from "@/features/blogs/types/blog.types";
import { Edit2, FileText, Star, Trash2 } from "lucide-react";
import { Loader } from "@/components/ui/loader";
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

interface BlogTableProps {
  blogs: Blog[];
  pendingStatuses: Record<number, boolean>;
  pendingTop: Record<number, boolean>;
  isLoading: boolean;
  isDeleting: boolean;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number, status: boolean) => void;
  onToggleTop: (id: number, top: boolean) => void;
}

export function BlogTable({
  blogs,
  pendingStatuses,
  pendingTop,
  isLoading,
  isDeleting,
  onDelete,
  onToggleStatus,
  onToggleTop,
}: BlogTableProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-[20px] border border-gray-100 p-8 flex justify-center items-center min-h-[200px]">
        <Loader size="md" />
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="bg-white rounded-[20px] border border-gray-100 p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <FileText className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-titleBlack mb-1">
          No blogs found
        </h3>
        <p className="text-textGray">Get started by writing a new blog.</p>
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
                Blog
              </TableHead>
              <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto">
                Category
              </TableHead>
              <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto">
                Status
              </TableHead>
              <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto">
                Top Blog
              </TableHead>
              <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs.map((blog) => {
              const currentStatus =
                pendingStatuses[blog.id] ?? blog.is_published;
              const currentTop =
                pendingTop[blog.id] ?? blog.is_top;

              return (
                <TableRow 
                  key={blog.id}
                  className="hover:bg-gray-50/50 border-none transition-colors"
                >
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-12 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0 relative">
                        {blog.image ? (
                          <Image
                            src={blog.image}
                            alt={blog.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <FileText className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-titleBlack text-sm line-clamp-1 max-w-[250px]">
                          {blog.title}
                        </div>
                        <div className="text-gray-600 font-medium text-xs mt-0.5">
                          {blog.slug}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-gray-600 font-medium text-sm">
                    {blog.category?.name || "Uncategorized"}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={currentStatus}
                        onCheckedChange={(checked: boolean) =>
                          onToggleStatus(blog.id, checked)
                        }
                        className="data-[state=checked]:bg-brand cursor-pointer"
                      />
                      <span
                        className={cn(
                          "text-sm font-semibold w-20 inline-block",
                          currentStatus ? "text-titleBlack" : "text-gray-600",
                        )}>
                        {currentStatus ? "Published" : "Draft"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <button
                      onClick={() =>
                        onToggleTop(blog.id, !currentTop)
                      }
                      title={currentTop ? "Remove from Top Blogs" : "Mark as Top Blog"}
                      className="flex items-center gap-1.5 cursor-pointer"
                    >
                      <Star
                        className={cn(
                          "w-5 h-5 transition-colors",
                          currentTop
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-300 hover:text-amber-400",
                        )}
                      />
                      <span
                        className={cn(
                          "text-sm font-semibold",
                          currentTop ? "text-amber-500" : "text-gray-400",
                        )}
                      >
                        {currentTop ? "Top Blog" : ""}
                      </span>
                    </button>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/blogs/${blog.id}`}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 font-medium hover:text-brand hover:bg-brand/10 transition-colors cursor-pointer"
                        title="Edit">
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => onDelete(blog.id)}
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
