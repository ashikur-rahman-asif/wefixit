import { z } from "zod";

export const blogCategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  slug: z.string().optional(),
});
export type BlogCategoryFormData = z.infer<typeof blogCategorySchema>;

export const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().optional(),
  blog_category_id: z.coerce.number().min(1, "Category is required"),
  content: z.string().min(1, "Content is required"),
  is_published: z.boolean().default(true),
  is_top: z.boolean().default(false),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  image: z
    .any()
    .refine((val) => val !== null && val !== undefined && val !== "", "Featured image is required"),
});

export type BlogFormData = z.infer<typeof blogSchema>;
