import axiosInstance from "@/lib/axios";
import { BlogCategory, CreateBlogCategoryDto, UpdateBlogCategoryDto } from "../types/blog.types";

export const adminBlogCategoriesApi = {
  getBlogCategories: async () => {
    const response = await axiosInstance.get<{ data: BlogCategory[] }>("/admin/blog-categories");
    return response.data.data;
  },

  getBlogCategory: async (id: number) => {
    const response = await axiosInstance.get<{ data: BlogCategory }>(
      `/admin/blog-categories/${id}`,
    );
    return response.data.data;
  },

  createBlogCategory: async (data: CreateBlogCategoryDto) => {
    const response = await axiosInstance.post<{ data: BlogCategory }>("/admin/blog-categories", {
      ...data,
      is_active: data.isActive,
    });
    return response.data.data;
  },

  updateBlogCategory: async (id: number, data: UpdateBlogCategoryDto) => {
    const response = await axiosInstance.put<{ data: BlogCategory }>(
      `/admin/blog-categories/${id}`,
      { ...data, is_active: data.isActive },
    );
    return response.data.data;
  },

  deleteBlogCategory: async (id: number) => {
    await axiosInstance.delete(`/admin/blog-categories/${id}`);
  },
};
