"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProductForm } from "../../_components/ProductForm";
import { useAdminProduct, useUpdateProduct } from "@/features/products/hooks/use-admin-products";
import { type ProductFormData } from "@/features/products/schemas/product.schema";
import { PageLoader } from "@/components/ui/loader";

export default function EditProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();

  const { data: product, isLoading } = useAdminProduct(slug);
  const updateMutation = useUpdateProduct();

  const handleSubmit = (data: ProductFormData) => {
    if (!product) return;

    const formData = new FormData();

    formData.append("title", data.title);
    if (data.slug) formData.append("slug", data.slug);
    formData.append("price", data.price.toString());
    formData.append("stock", data.stock.toString());
    formData.append("isActive", data.isActive ? "1" : "0");
    formData.append("isFeatured", data.isFeatured ? "1" : "0");

    if (
      data.discountPrice !== undefined &&
      data.discountPrice !== null &&
      data.discountPrice !== ""
    ) {
      formData.append("discountPrice", data.discountPrice.toString());
    } else {
      formData.append("discountPrice", "");
    }

    if (data.categoryId !== undefined && data.categoryId !== null && data.categoryId !== "") {
      formData.append("categoryId", data.categoryId.toString());
    } else {
      formData.append("categoryId", "");
    }

    if (data.brandId !== undefined && data.brandId !== null && data.brandId !== "") {
      formData.append("brandId", data.brandId.toString());
    } else {
      formData.append("brandId", "");
    }

    if (data.shortDescription) formData.append("shortDescription", data.shortDescription);
    if (data.description) formData.append("description", data.description);

    if (data.specifications && data.specifications.length > 0) {
      data.specifications.forEach((spec, index) => {
        formData.append(`specifications[${index}][key]`, spec.key);
        formData.append(`specifications[${index}][value]`, spec.value);
      });
    } else {
      formData.append("specifications", "");
    }

    if (data.images && data.images.length > 0) {
      data.images.forEach((img, idx) => {
        if (img instanceof File) {
          formData.append(`images[${idx}]`, img);
        } else {
          formData.append(`images[${idx}]`, img);
        }
      });
    } else {
      formData.append("images", "");
    }

    if (data.colors && data.colors.length > 0) {
      data.colors.forEach((color, index) => {
        if (color.id) formData.append(`colors[${index}][id]`, color.id.toString());
        formData.append(`colors[${index}][name]`, color.name);
        formData.append(`colors[${index}][hex]`, color.hex);
        formData.append(`colors[${index}][stock]`, color.stock.toString());
        formData.append(`colors[${index}][position]`, color.position.toString());

        if (color.images && color.images.length > 0) {
          color.images.forEach((img, idx) => {
            formData.append(`colors[${index}][images][${idx}]`, img);
          });
        }
      });
    } else {
      formData.append("colors", "");
    }

    updateMutation.mutate(
      { id: product.id, data: formData },
      {
        onSuccess: () => {
          router.push("/admin/products");
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="p-6 md:p-10 max-w-[1600px] mx-auto">
        <PageLoader message="Loading product details..." />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6 md:p-10 max-w-[1600px] mx-auto min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center justify-center text-textGray">
          <p className="font-medium text-xl text-titleBlack mb-2">Product Not Found</p>
          <Link href="/admin/products" className="text-brand hover:underline font-semibold">
            Return to Products List
          </Link>
        </div>
      </div>
    );
  }

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
          Edit Product
        </h1>
        <p className="text-textGray mt-1 text-[15px] font-medium">
          Update the product information for{" "}
          <span className="text-titleBlack font-bold">{product.title}</span>.
        </p>
      </div>

      <ProductForm
        initialData={product}
        onSubmit={handleSubmit}
        isSubmitting={updateMutation.isPending}
      />
    </div>
  );
}
