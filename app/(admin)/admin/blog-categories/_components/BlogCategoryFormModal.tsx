"use client";

import slugify from "slugify";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
} from "@/components/ui/sheet";
import { BlogCategory } from "@/features/blogs/types/blog.types";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  blogCategorySchema,
  type BlogCategoryFormData,
} from "@/features/blogs/schemas/blog.schema";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/form-elements/input";

interface BlogCategoryFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingCategory: BlogCategory | null;
  onSubmit: (data: BlogCategoryFormData) => void;
  isSubmitting: boolean;
}

export function BlogCategoryFormModal({
  open,
  onOpenChange,
  editingCategory,
  onSubmit,
  isSubmitting,
}: BlogCategoryFormModalProps) {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BlogCategoryFormData>({
    resolver: zodResolver(blogCategorySchema),
    defaultValues: editingCategory
      ? {
          name: editingCategory.name,
          slug: editingCategory.slug,
          isActive: editingCategory.is_active !== undefined ? editingCategory.is_active : true,
        }
      : {
          name: "",
          slug: "",
          isActive: true,
        },
  });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md p-0 bg-white border-none shadow-xl flex flex-col h-full">
        <div className="p-6 border-b border-gray-100">
          <SheetHeader>
            <SheetTitle className="text-xl font-bold text-titleBlack">
              {editingCategory ? "Edit Blog Category" : "Add Blog Category"}
            </SheetTitle>
            <SheetDescription className="sr-only">
              {editingCategory
                ? "Form to edit a blog category."
                : "Form to add a new blog category."}
            </SheetDescription>
          </SheetHeader>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col flex-1 h-full overflow-hidden"
        >
          <div className="px-4 pb-4 space-y-5 pt-2 flex-1 overflow-y-auto">
            <div>
              <Input
                label="Category Name"
                required
                type="text"
                {...register("name", {
                  onChange: (e) => {
                    const generatedSlug = slugify(e.target.value, {
                      lower: true,
                      strict: true,
                      trim: true,
                    });
                    setValue("slug", generatedSlug, { shouldValidate: true });
                  },
                })}
                placeholder="e.g., Career Tips"
                error={errors.name?.message?.toString()}
                autoFocus
              />
            </div>

            <div>
              <Input
                label="Slug (Optional)"
                type="text"
                {...register("slug")}
                placeholder="e.g., career-tips (leave blank to auto-generate)"
                error={errors.slug?.message?.toString()}
              />
            </div>

            <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
              <Controller
                name="isActive"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Switch checked={value} onCheckedChange={onChange} />
                )}
              />
              <div>
                <label
                  htmlFor="isActive"
                  className="text-sm font-semibold text-titleBlack cursor-pointer"
                >
                  Active
                </label>
                <p className="text-[13px] font-medium text-gray-500">
                  Active categories are visible to customers
                </p>
              </div>
            </div>
          </div>
          <SheetFooter className="bg-white border-t border-gray-100 p-4 sm:p-6 flex flex-row justify-end gap-3 sm:space-x-0 mt-auto shrink-0">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-11 bg-gray-50 text-titleBlack rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 h-11 bg-brand text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? "Saving..." : editingCategory ? "Save Changes" : "Add Category"}
            </button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
