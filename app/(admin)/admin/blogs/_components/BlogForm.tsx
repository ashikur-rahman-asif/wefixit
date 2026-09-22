"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import slugify from "slugify";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { adminBlogsApi } from "@/features/blogs/api/admin-blogs.api";
import { blogSchema, type BlogFormData } from "@/validators/admin";
import { Blog } from "@/features/blogs/types/blog.types";
import { Input } from "@/components/form-elements/input";
import { ImageUpload } from "@/components/ui/image-upload";
import { RichTextEditor } from "@/components/form-elements/rich-text-editor";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAdminBlogCategories } from "@/features/blogs/hooks/use-admin-blog-categories";

interface BlogFormProps {
  initialData?: Blog;
  onSubmit: (data: BlogFormData) => void;
  isSubmitting: boolean;
}

export function BlogForm({ initialData, onSubmit, isSubmitting }: BlogFormProps) {
  const router = useRouter();
  const [isProcessingImages, setIsProcessingImages] = useState(false);

  const { data: categories = [] } = useAdminBlogCategories();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(blogSchema),
    values: initialData
      ? {
          title: initialData.title || "",
          slug: initialData.slug || "",
          blog_category_id: initialData.blog_category_id,
          content: initialData.content || "",
          is_published: initialData.is_published,
          is_top: initialData.is_top,
          meta_title: initialData.meta_title || "",
          meta_description: initialData.meta_description || "",
          image: initialData.image || null,
        }
      : undefined,
    defaultValues: {
      title: "",
      slug: "",
      blog_category_id: undefined,
      content: "",
      is_published: true,
      is_top: false,
      meta_title: "",
      meta_description: "",
      image: null,
    },
  });

  const handleFormSubmit = async (data: BlogFormData) => {
    try {
      setIsProcessingImages(true);

      const content = data.content || "";
      if (content.includes("data:image/")) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = content;

        const images = tempDiv.getElementsByTagName("img");
        const uploadPromises = [];

        for (let i = 0; i < images.length; i++) {
          const img = images[i];
          if (img.src.startsWith("data:image/")) {
            uploadPromises.push(
              (async () => {
                const fetchRes = await fetch(img.src);
                const blob = await fetchRes.blob();
                const extension = blob.type.split("/")[1] || "png";
                const file = new File([blob], `blog-image-${Date.now()}-${i}.${extension}`, {
                  type: blob.type,
                });

                const url = await adminBlogsApi.uploadImage(file);
                img.src = url;
              })(),
            );
          }
        }

        if (uploadPromises.length > 0) {
          const toastId = toast.loading("Uploading images from editor...");
          await Promise.all(uploadPromises);
          toast.success("Images uploaded successfully", { id: toastId });
          data.content = tempDiv.innerHTML;
        }
      }

      onSubmit(data);
    } catch (error) {
      console.error("Failed to process images before submit:", error);
      toast.error("Failed to process embedded images.");
    } finally {
      setIsProcessingImages(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-full relative pb-28 space-y-6 max-w-5xl"
    >
      <div className="flex flex-col gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-titleBlack">
                Featured Image <span className="text-red-500">*</span>
              </h2>
              <p className="text-[13px] font-medium text-gray-500 mt-1">
                Recommended size: 1200 x 630 px
              </p>
            </div>
            <div>
              <Controller
                name="image"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <ImageUpload value={value} onChange={onChange} />
                )}
              />
              {errors.image && (
                <p className="text-red-500 text-xs mt-1.5">{errors.image.message?.toString()}</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 space-y-6">
            <h2 className="text-xl font-bold text-titleBlack mb-6">General Information</h2>

            <div className="space-y-5">
              <Input
                label="Blog Title"
                required
                type="text"
                {...register("title", {
                  onChange: (e) => {
                    if (!initialData) {
                      const generatedSlug = slugify(e.target.value, {
                        lower: true,
                        strict: true,
                        trim: true,
                      });
                      setValue("slug", generatedSlug, { shouldValidate: true });
                    }
                  },
                })}
                placeholder="e.g., How to fix a broken screen"
                error={errors.title?.message?.toString()}
              />

              <Input
                label="Slug (URL)"
                type="text"
                {...register("slug")}
                placeholder="how-to-fix-a-broken-screen"
                error={errors.slug?.message?.toString()}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 space-y-6">
            <h2 className="text-xl font-bold text-titleBlack mb-6">Blog Content</h2>
            <div>
              <Controller
                name="content"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <RichTextEditor
                    value={value || ""}
                    onChange={onChange}
                    placeholder="Write your blog content here..."
                  />
                )}
              />
              {errors.content && (
                <p className="text-red-500 text-xs mt-1.5">{errors.content.message?.toString()}</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 space-y-6">
            <h2 className="text-xl font-bold text-titleBlack mb-6">SEO Data (Optional)</h2>

            <div className="space-y-5">
              <Input
                label="Meta Title"
                type="text"
                {...register("meta_title")}
                placeholder="Meta title for SEO"
                error={errors.meta_title?.message?.toString()}
              />
              <Input
                label="Meta Description"
                type="text"
                {...register("meta_description")}
                placeholder="Meta description for SEO"
                error={errors.meta_description?.message?.toString()}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 space-y-6">
            <h2 className="text-xl font-bold text-titleBlack">Status & Organization</h2>

            <div className="space-y-5">
              <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-gray-100">
                <div>
                  <label className="text-sm font-semibold text-titleBlack block mb-0.5">
                    Published Status
                  </label>
                  <p className="text-[13px] font-medium text-gray-500">
                    Is this blog visible to users?
                  </p>
                </div>
                <Controller
                  name="is_published"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Switch checked={value} onCheckedChange={onChange} />
                  )}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-gray-100">
                <div>
                  <label className="text-sm font-semibold text-titleBlack block mb-0.5">
                    Top Blog
                  </label>
                  <p className="text-[13px] font-medium text-gray-500">
                    Maximum 2 blogs can be top
                  </p>
                </div>
                <Controller
                  name="is_top"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Switch checked={value} onCheckedChange={onChange} />
                  )}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-titleBlack mb-1.5">
                  Category
                </label>
                <Controller
                  name="blog_category_id"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      onValueChange={(val: string | null) => val && onChange(Number(val))}
                      value={value?.toString()}
                    >
                      <SelectTrigger className="w-full h-11 bg-gray-50 border-gray-100">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.length === 0 ? (
                          <div className="p-2 text-sm text-gray-500 text-center">
                            No categories found
                          </div>
                        ) : (
                          categories.map((c) => (
                            <SelectItem key={c.id} value={c.id.toString()} label={c.name}>
                              {c.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.blog_category_id && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.blog_category_id.message?.toString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 lg:left-[280px] right-0 bg-white flex items-center justify-end gap-4 py-4 px-6 md:px-10 border-t border-gray-100 z-50 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
        <button
          type="button"
          onClick={() => router.push("/admin/blogs")}
          className="h-11 px-8 bg-gray-50 text-titleBlack rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting || isProcessingImages}
          className="h-11 px-8 bg-brand text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting || isProcessingImages
            ? "Saving..."
            : initialData
              ? "Save Changes"
              : "Add Blog"}
        </button>
      </div>
    </form>
  );
}
