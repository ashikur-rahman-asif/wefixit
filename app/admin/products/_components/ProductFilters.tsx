"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Search, X } from "lucide-react";
import { useProductCategories } from "@/features/products/hooks/use-admin-product-categories";
import { useProductBrands } from "@/features/products/hooks/use-admin-product-brands";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data: categoriesData } = useProductCategories({ perPage: 100 });
  const { data: brandsData } = useProductBrands({ perPage: 100 });

  const categories = categoriesData?.data || [];
  const brands = brandsData?.data || [];

  
  const [filters, setFilters] = useState({
    id: searchParams.get("id") || "",
    search: searchParams.get("search") || "",
    sku: searchParams.get("sku") || "",
    brand: searchParams.get("brand") || "all",
    category: searchParams.get("category") || "all",
    status: searchParams.get("status") || "all",
  });

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "all") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    
    params.delete("page"); 
    router.push(pathname + "?" + params.toString());
  };

  const handleClear = () => {
    setFilters({
      id: "",
      search: "",
      sku: "",
      brand: "all",
      category: "all",
      status: "all",
    });
    router.push(pathname);
  };

  const hasActiveFilters = Array.from(searchParams.keys()).some(
    (key) => !["page"].includes(key)
  );

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm mb-6 space-y-4">
      {}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {}
        <div className="space-y-1.5">
          <label className="text-[13px] font-semibold text-gray-700">ID</label>
          <input
            type="text"
            className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg text-sm focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
            value={filters.id}
            onChange={(e) => setFilters(prev => ({ ...prev, id: e.target.value }))}
          />
        </div>

        {}
        <div className="space-y-1.5">
          <label className="text-[13px] font-semibold text-gray-700">Name</label>
          <input
            type="text"
            placeholder="iphone"
            className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg text-sm focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
          />
        </div>

        {}
        <div className="space-y-1.5">
          <label className="text-[13px] font-semibold text-gray-700">SKU</label>
          <input
            type="text"
            className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg text-sm focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
            value={filters.sku}
            onChange={(e) => setFilters(prev => ({ ...prev, sku: e.target.value }))}
          />
        </div>

        {}
        <div className="space-y-1.5">
          <label className="text-[13px] font-semibold text-gray-700">Brand</label>
          <Select
            value={filters.brand}
            onValueChange={(val) => setFilters(prev => ({ ...prev, brand: val || "all" }))}
          >
            <SelectTrigger className="w-full h-10 bg-white border-gray-200 rounded-lg text-sm">
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Select option</SelectItem>
              {brands.map((b: { id: number; name: string; slug: string }) => (
                <SelectItem key={b.id} value={b.slug}>{b.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {}
        <div className="space-y-1.5">
          <label className="text-[13px] font-semibold text-gray-700">Category</label>
          <Select
            value={filters.category}
            onValueChange={(val) => setFilters(prev => ({ ...prev, category: val || "all" }))}
          >
            <SelectTrigger className="w-full h-10 bg-white border-gray-200 rounded-lg text-sm">
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Select option</SelectItem>
              {categories.map((c: { id: number; name: string; slug: string }) => (
                <SelectItem key={c.id} value={c.slug}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {}
        <div className="space-y-1.5">
          <label className="text-[13px] font-semibold text-gray-700">Status</label>
          <Select
            value={filters.status}
            onValueChange={(val) => setFilters(prev => ({ ...prev, status: val || "all" }))}
          >
            <SelectTrigger className="w-full h-10 bg-white border-gray-200 rounded-lg text-sm">
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Select option</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="out_of_stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {}
      <div className="flex gap-3">
        <button
          onClick={handleFilter}
          className="w-full h-10 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-lg flex items-center justify-center transition-colors"
        >
          <Search className="w-4 h-4 mr-2" />
          Filter
        </button>
        
        {hasActiveFilters && (
          <button
            onClick={handleClear}
            className="px-4 h-10 bg-red-50 text-red-600 hover:bg-red-100 border border-red-100 text-sm font-semibold rounded-lg flex items-center justify-center transition-colors shrink-0"
            title="Clear Filters"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
