import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { adminBlogsApi } from "../api/admin-blogs.api";
import { CreateBlogDto, UpdateBlogDto } from "../types/blog.types";

export const blogKeys = {
  all: ["admin-blogs"] as const,
  lists: () => [...blogKeys.all, "list"] as const,
  list: (page: number) => [...blogKeys.lists(), { page }] as const,
  details: () => [...blogKeys.all, "detail"] as const,
  detail: (id: number) => [...blogKeys.details(), id] as const,
};

export const useAdminBlogs = (page = 1) => {
  return useQuery({
    queryKey: blogKeys.list(page),
    queryFn: () => adminBlogsApi.getBlogs(page),
  });
};

export const useAdminBlog = (id: number) => {
  return useQuery({
    queryKey: blogKeys.detail(id),
    queryFn: () => adminBlogsApi.getBlog(id),
    enabled: !!id,
  });
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBlogDto) => adminBlogsApi.createBlog(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
      toast.success("Blog created successfully");
    },
    onError: (error: AxiosError<{message?: string, errors?: Record<string, string[]>}>) => {
      if (error.response?.data?.errors) {
        const firstError = Object.values(error.response.data.errors)[0] as string[];
        toast.error(firstError[0] || "Failed to create blog");
      } else {
        toast.error(error.response?.data?.message || "Failed to create blog");
      }
    },
  });
};

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateBlogDto }) =>
      adminBlogsApi.updateBlog(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
      queryClient.invalidateQueries({ queryKey: blogKeys.detail(variables.id) });
      toast.success("Blog updated successfully");
    },
    onError: (error: AxiosError<{message?: string, errors?: Record<string, string[]>}>) => {
      if (error.response?.data?.errors) {
        const firstError = Object.values(error.response.data.errors)[0] as string[];
        toast.error(firstError[0] || "Failed to update blog");
      } else {
        toast.error(error.response?.data?.message || "Failed to update blog");
      }
    },
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => adminBlogsApi.deleteBlog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
      toast.success("Blog deleted successfully");
    },
    onError: (error: AxiosError<{message?: string, errors?: Record<string, string[]>}>) => {
      toast.error(error.response?.data?.message || "Failed to delete blog");
    },
  });
};
