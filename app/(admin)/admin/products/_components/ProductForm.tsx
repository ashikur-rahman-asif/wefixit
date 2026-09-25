"use client";

import { useForm, useWatch, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  productSchema,
  type ProductFormData,
  type ProductFormInput,
} from "@/features/products/schemas/product.schema";
import { AdminProduct } from "@/types/admin";
import { useProductCategories } from "@/features/products/hooks/use-admin-product-categories";
import { useProductBrands } from "@/features/products/hooks/use-admin-product-brands";
import { useColors } from "@/features/colors/hooks/use-admin-colors";

import { GeneralInfoSection } from "./GeneralInfoSection";
import { SpecificationsSection } from "./SpecificationsSection";
import { StatusOrganizationSection } from "./StatusOrganizationSection";
import { PricingInventorySection } from "./PricingInventorySection";
import { ProductGallerySection } from "./ProductGallerySection";
import { ColorVariantsSection } from "./ColorVariantsSection";

interface ProductFormProps {
  initialData?: AdminProduct;
  onSubmit: (data: ProductFormData) => void;
  isSubmitting: boolean;
}

export function ProductForm({ initialData, onSubmit, isSubmitting }: ProductFormProps) {
  const router = useRouter();

  const { data: categoriesResponse } = useProductCategories({ per_page: 100 });
  const { data: brandsResponse } = useProductBrands({ per_page: 100 });
  const { data: colorsResponse } = useColors();

  const categories = categoriesResponse?.data || [];
  const brands = brandsResponse?.data || [];
  const globalColors = colorsResponse?.data || [];

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormInput, unknown, ProductFormData>({
    resolver: zodResolver(productSchema),
    values: initialData
      ? {
          title: initialData.title || "",
          slug: initialData.slug || "",
          price: initialData.price != null ? Number(initialData.price) : 0,
          discountPrice:
            initialData.discount_price != null ? Number(initialData.discount_price) : undefined,
          stock: initialData.stock != null ? Number(initialData.stock) : 0,
          isActive: initialData.isActive ?? true,
          isFeatured: initialData.is_featured || false,
          categoryId:
            initialData.product_category_id != null ? Number(initialData.product_category_id) : "",
          brandId: initialData.product_brand_id != null ? Number(initialData.product_brand_id) : "",

          shortDescription: initialData.short_description || "",
          description: initialData.description || "",
          specification: initialData.specification || "",
          specifications: initialData.specifications || [],
          image: initialData.image || null,
          images: initialData.images || [],
          colors:
            initialData.colors?.map((c) => ({
              ...c,
              images: c.image ? [c.image] : [],
            })) || [],
        }
      : undefined,
    defaultValues: {
      title: "",
      slug: "",
      price: 0,
      discountPrice: undefined,
      stock: 0,
      isActive: true,
      isFeatured: false,
      categoryId: "",
      brandId: "",

      shortDescription: "",
      description: "",
      specification: "",
      specifications: [],
      image: null,
      images: [],
      colors: [],
    },
  });

  const watchedColors = useWatch({
    control,
    name: "colors",
  });

  const totalCalculatedStock =
    watchedColors?.reduce((sum, color) => sum + (Number(color.stock) || 0), 0) || 0;

  const onSubmitHandler = (data: ProductFormData) => {
    if (data.colors && data.colors.length > 0) {
      data.stock = data.colors.reduce((sum, color) => sum + (Number(color.stock) || 0), 0);
      const allColorImages = data.colors.flatMap((c) => c.images || []);
      if (allColorImages.length > 0) {
        data.images = allColorImages;
      }
    }
    onSubmit(data);
  };

  const onErrorHandler = (errors: FieldErrors<ProductFormInput>) => {
    console.error("Form validation errors:", errors);

    type RecursiveFieldError =
      { message?: string } | { [key: string]: RecursiveFieldError } | RecursiveFieldError[];

    const errorMessages: string[] = [];
    const formatFieldName = (path: string) => {
      return path
        .replace(/\.root$/, "")
        .split(".")
        .map((part) => {
          if (!isNaN(Number(part))) return `(Item ${Number(part) + 1})`;
          return part.charAt(0).toUpperCase() + part.slice(1).replace(/([A-Z])/g, " $1");
        })
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();
    };

    const traverseErrors = (obj: RecursiveFieldError | null, path: string = "") => {
      if (!obj || typeof obj !== "object") return;

      if ("message" in obj && typeof obj.message === "string") {
        const formattedPath = formatFieldName(path);
        errorMessages.push(`${formattedPath}: ${obj.message}`);
      } else {
        Object.keys(obj).forEach((key) => {
          if (key !== "ref") {
            const nextObj = (obj as Record<string, RecursiveFieldError>)[key];
            traverseErrors(nextObj, path ? `${path}.${key}` : key);
          }
        });
      }
    };

    traverseErrors(errors as RecursiveFieldError);

    toast.error(
      <div className="space-y-1">
        <p className="font-bold">Please fix validation errors:</p>
        <ul className="list-disc pl-4 text-xs">
          {errorMessages.slice(0, 5).map((msg, i) => (
            <li key={i}>{msg}</li>
          ))}
          {errorMessages.length > 5 && <li>...and {errorMessages.length - 5} more</li>}
        </ul>
      </div>,
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler, onErrorHandler)}
      className="w-full relative pb-28 space-y-6 max-w-5xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <GeneralInfoSection
            register={register}
            control={control}
            errors={errors}
            setValue={setValue}
            initialData={initialData}
          />
          <SpecificationsSection register={register} control={control} errors={errors} />
        </div>

        <div className="space-y-6">
          <StatusOrganizationSection control={control} categories={categories} brands={brands} />
          <PricingInventorySection
            register={register}
            errors={errors}
            hasColorFields={!!watchedColors && watchedColors.length > 0}
            totalCalculatedStock={totalCalculatedStock}
          />
          {(!watchedColors || watchedColors.length === 0) && (
            <ProductGallerySection control={control} errors={errors} />
          )}
        </div>
      </div>

      <ColorVariantsSection
        register={register}
        control={control}
        setValue={setValue}
        watch={watch}
        errors={errors}
        globalColors={globalColors}
      />

      <div className="fixed bottom-0 left-0 lg:left-[280px] right-0 bg-white flex items-center justify-end gap-4 py-4 px-6 md:px-10 border-t border-gray-100 z-50 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="h-11 px-8 bg-gray-50 text-titleBlack rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 px-8 bg-brand text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? "Saving..." : initialData ? "Save Changes" : "Add Product"}
        </button>
      </div>
    </form>
  );
}
