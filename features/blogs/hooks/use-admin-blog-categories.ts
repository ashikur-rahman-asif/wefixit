import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { adminBlogCategoriesApi } from "../api/admin-blog-categories.api";
import { CreateBlogCategoryDto, UpdateBlogCategoryDto } from "../types/blog.types";

export const blogCategoryKeys = {
  all: ["admin-blog-categories"] as const,
  lists: () => [...blogCategoryKeys.all, "list"] as const,
  list: (filters: string) => [...blogCategoryKeys.lists(), { filters }] as const,
  details: () => [...blogCategoryKeys.all, "detail"] as const,
  detail: (id: number) => [...blogCategoryKeys.details(), id] as const,
};

export const useAdminBlogCategories = () => {
  return useQuery({
    queryKey: blogCategoryKeys.lists(),
    queryFn: adminBlogCategoriesApi.getBlogCategories,
  });
};

export const useAdminBlogCategory = (id: number) => {
  return useQuery({
    queryKey: blogCategoryKeys.detail(id),
    queryFn: () => adminBlogCategoriesApi.getBlogCategory(id),
    enabled: !!id,
  });
};

export const useCreateBlogCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBlogCategoryDto) => adminBlogCategoriesApi.createBlogCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogCategoryKeys.lists() });
      toast.success("Blog category created successfully");
    },
    onError: (error: AxiosError<{message?: string}>) => {
      toast.error(error.response?.data?.message || "Failed to create blog category");
    },
  });
};

export const useUpdateBlogCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateBlogCategoryDto }) =>
      adminBlogCategoriesApi.updateBlogCategory(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: blogCategoryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: blogCategoryKeys.detail(variables.id) });
      toast.success("Blog category updated successfully");
    },
    onError: (error: AxiosError<{message?: string}>) => {
      toast.error(error.response?.data?.message || "Failed to update blog category");
    },
  });
};

export const useDeleteBlogCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => adminBlogCategoriesApi.deleteBlogCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogCategoryKeys.lists() });
      toast.success("Blog category deleted successfully");
    },
    onError: (error: AxiosError<{message?: string}>) => {
      toast.error(error.response?.data?.message || "Failed to delete blog category");
    },
  });
};
