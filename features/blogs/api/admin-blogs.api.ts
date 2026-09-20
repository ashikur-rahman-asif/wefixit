import axiosInstance from "@/lib/axios";
import { Blog, CreateBlogDto, UpdateBlogDto } from "../types/blog.types";

export const adminBlogsApi = {
  getBlogs: async (page = 1) => {
    const response = await axiosInstance.get<{ data: Blog[]; current_page: number; last_page: number; total: number }>(`/admin/blogs?page=${page}`);
    return response.data;
  },

  getBlog: async (id: number) => {
    const response = await axiosInstance.get<{ data: Blog }>(`/admin/blogs/${id}`);
    return response.data.data;
  },

  createBlog: async (data: CreateBlogDto) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("blog_category_id", data.blog_category_id.toString());
    formData.append("content", data.content);
    if (data.is_published !== undefined) formData.append("is_published", data.is_published ? "1" : "0");
    if (data.is_top !== undefined) formData.append("is_top", data.is_top ? "1" : "0");
    if (data.meta_title) formData.append("meta_title", data.meta_title);
    if (data.meta_description) formData.append("meta_description", data.meta_description);
    if (data.image) formData.append("image", data.image);

    const response = await axiosInstance.post<{ data: Blog }>("/admin/blogs", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
  },

  updateBlog: async (id: number, data: UpdateBlogDto) => {
    const formData = new FormData();
    formData.append("_method", "PUT"); 
    if (data.title) formData.append("title", data.title);
    if (data.blog_category_id) formData.append("blog_category_id", data.blog_category_id.toString());
    if (data.content) formData.append("content", data.content);
    if (data.is_published !== undefined) formData.append("is_published", data.is_published ? "1" : "0");
    if (data.is_top !== undefined) formData.append("is_top", data.is_top ? "1" : "0");
    if (data.meta_title !== undefined) formData.append("meta_title", data.meta_title || "");
    if (data.meta_description !== undefined) formData.append("meta_description", data.meta_description || "");
    if (data.image instanceof File) formData.append("image", data.image);

    const response = await axiosInstance.post<{ data: Blog }>(`/admin/blogs/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
  },

  deleteBlog: async (id: number) => {
    await axiosInstance.delete(`/admin/blogs/${id}`);
  },

  uploadImage: async (image: File) => {
    const formData = new FormData();
    formData.append("image", image);
    const response = await axiosInstance.post<{ url: string }>("/admin/upload-image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.url;
  },
};
