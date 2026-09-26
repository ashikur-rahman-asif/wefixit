export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Blog {
  id: number;
  blog_category_id: number;
  title: string;
  slug: string;
  content: string;
  image: string | null;
  is_published: boolean;
  is_top: boolean;
  meta_title: string | null;
  meta_description: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  category?: BlogCategory;
}

export interface CreateBlogCategoryDto {
  name: string;
  slug?: string;
  isActive?: boolean;
}
export type UpdateBlogCategoryDto = Partial<CreateBlogCategoryDto>;

export interface CreateBlogDto {
  title: string;
  blog_category_id: number;
  content: string;
  image?: File | string | null;
  is_published?: boolean;
  is_top?: boolean;
  meta_title?: string;
  meta_description?: string;
}
export type UpdateBlogDto = Partial<CreateBlogDto>;
