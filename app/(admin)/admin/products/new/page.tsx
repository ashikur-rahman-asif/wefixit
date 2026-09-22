"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProductForm } from "../_components/ProductForm";
import { useCreateProduct } from "@/features/products/hooks/use-admin-products";
import { type ProductFormData } from "@/validators/admin";

export default function AddProductPage() {
  const router = useRouter();
  const createMutation = useCreateProduct();

  const handleSubmit = (data: ProductFormData) => {
    const formData = new FormData();

    formData.append("title", data.title);
    if (data.slug) formData.append("slug", data.slug);
    formData.append("price", data.price.toString());
    formData.append("stock", data.stock.toString());
    formData.append("isActive", data.isActive ? "1" : "0");
    formData.append("isFeatured", data.isFeatured ? "1" : "0");

    if (data.discountPrice) formData.append("discountPrice", data.discountPrice.toString());
    if (data.categoryId) formData.append("categoryId", data.categoryId.toString());
    if (data.brandId) formData.append("brandId", data.brandId.toString());
    if (data.deviceId) formData.append("deviceId", data.deviceId.toString());

    if (data.shortDescription) formData.append("shortDescription", data.shortDescription);
    if (data.description) formData.append("description", data.description);

    if (data.specifications && data.specifications.length > 0) {
      data.specifications.forEach((spec, index) => {
        formData.append(`specifications[${index}][key]`, spec.key);
        formData.append(`specifications[${index}][value]`, spec.value);
      });
    }

    if (data.images && data.images.length > 0) {
      data.images.forEach((img, idx) => {
        if (img instanceof File) {
          formData.append(`images[${idx}]`, img);
        }
      });
    }

    if (data.colors && data.colors.length > 0) {
      data.colors.forEach((color, index) => {
        formData.append(`colors[${index}][name]`, color.name);
        formData.append(`colors[${index}][hex]`, color.hex);
        formData.append(`colors[${index}][stock]`, color.stock.toString());
        formData.append(`colors[${index}][position]`, color.position.toString());

        if (color.image && color.image instanceof File) {
          formData.append(`colors[${index}][image]`, color.image);
        }
      });
    }

    createMutation.mutate(formData, {
      onSuccess: () => {
        router.push("/admin/products");
      },
    });
  };

  return (
    <div className="p-6 md:p-10 max-w-[1600px] mx-auto min-h-screen">
      <div className="flex flex-col mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Link
            href="/admin/products"
            className="text-textGray hover:text-titleBlack transition-colors text-sm font-semibold flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Products
          </Link>
        </div>
        <h1 className="text-[28px] md:text-[32px] font-bold text-titleBlack leading-tight tracking-tight">
          Add New Product
        </h1>
        <p className="text-textGray mt-1 text-[15px] font-medium">
          Create a new product by filling out the information below.
        </p>
      </div>

      <ProductForm onSubmit={handleSubmit} isSubmitting={createMutation.isPending} />
    </div>
  );
}
