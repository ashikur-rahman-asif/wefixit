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
import { Input } from "@/components/form-elements/input";

export function ProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data: categoriesData } = useProductCategories({ per_page: 100 });
  const { data: brandsData } = useProductBrands({ per_page: 100 });

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

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active": return "Active";
      case "inactive": return "Inactive";
      case "out_of_stock": return "Out of Stock";
      default: return "All Status";
    }
  };

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
    <div className="bg-white rounded-xl p-4 border border-gray-200 mb-6 space-y-4">
      {/* Filters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
        
        <Input
          label="ID"
          labelClassName="text-sm font-semibold text-titleBlack mb-1.5"
          className="w-full"
          value={filters.id}
          onChange={(e) => setFilters(prev => ({ ...prev, id: e.target.value }))}
        />

        <Input
          label="Name"
          labelClassName="text-sm font-semibold text-titleBlack mb-1.5"
          placeholder="e.g. iPhone"
          className="w-full"
          value={filters.search}
          onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
        />

        <Input
          label="SKU"
          labelClassName="text-sm font-semibold text-titleBlack mb-1.5"
          className="w-full"
          value={filters.sku}
          onChange={(e) => setFilters(prev => ({ ...prev, sku: e.target.value }))}
        />

        <div className="space-y-0 relative">
          <label className="block text-sm font-semibold text-titleBlack mb-1.5">Brand</label>
          <Select
            value={filters.brand}
            onValueChange={(val) => setFilters(prev => ({ ...prev, brand: val || "all" }))}
          >
            <SelectTrigger className="w-full h-10 lg:h-12 bg-white border-gray-200 rounded-lg text-sm text-titleBlack">
              <SelectValue placeholder="Select option">
                {filters.brand === "all" ? "All Brands" : brands.find((b: { slug: string, name: string }) => b.slug === filters.brand)?.name || "All Brands"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              <SelectItem value="all" label="All Brands">All Brands</SelectItem>
              {brands.map((b: { id: number; name: string; slug: string }) => (
                <SelectItem key={b.id} value={b.slug} label={b.name}>{b.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-0 relative">
          <label className="block text-sm font-semibold text-titleBlack mb-1.5">Category</label>
          <Select
            value={filters.category}
            onValueChange={(val) => setFilters(prev => ({ ...prev, category: val || "all" }))}
          >
            <SelectTrigger className="w-full h-10 lg:h-12 bg-white border-gray-200 rounded-lg text-sm text-titleBlack">
              <SelectValue placeholder="Select option">
                {filters.category === "all" ? "All Categories" : categories.find((c: { slug: string, name: string }) => c.slug === filters.category)?.name || "All Categories"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              <SelectItem value="all" label="All Categories">All Categories</SelectItem>
              {categories.map((c: { id: number; name: string; slug: string }) => (
                <SelectItem key={c.id} value={c.slug} label={c.name}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-0 relative">
          <label className="block text-sm font-semibold text-titleBlack mb-1.5">Status</label>
          <Select
            value={filters.status}
            onValueChange={(val) => setFilters(prev => ({ ...prev, status: val || "all" }))}
          >
            <SelectTrigger className="w-full h-10 lg:h-12 bg-white border-gray-200 rounded-lg text-sm text-titleBlack">
              <SelectValue placeholder="Select option">
                {getStatusLabel(filters.status)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              <SelectItem value="all" label="All Status">All Status</SelectItem>
              <SelectItem value="active" label="Active">Active</SelectItem>
              <SelectItem value="inactive" label="Inactive">Inactive</SelectItem>
              <SelectItem value="out_of_stock" label="Out of Stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
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
