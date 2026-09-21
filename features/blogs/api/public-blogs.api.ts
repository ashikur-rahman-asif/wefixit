import { Blog } from "../types/blog.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const publicBlogsApi = {
  getBlogs: async (page = 1, category?: string, search?: string) => {
    const params = new URLSearchParams({
      page: page.toString(),
      ...(category && { category }),
      ...(search && { search }),
    });

    const response = await fetch(`${API_URL}/blogs?${params.toString()}`, {
      next: { revalidate: 60 }, 
    });

    if (!response.ok) {
      throw new Error("Failed to fetch blogs");
    }

    return response.json() as Promise<{
      data: Blog[];
      current_page: number;
      last_page: number;
      total: number;
    }>;
  },

  getTopBlogs: async () => {
    const params = new URLSearchParams({
      is_top: "1",
    });

    const response = await fetch(`${API_URL}/blogs?${params.toString()}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch top blogs");
    }

    return response.json() as Promise<{
      data: Blog[];
    }>;
  },

  getBlogBySlug: async (slug: string) => {
    const response = await fetch(`${API_URL}/blogs/${slug}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error("Failed to fetch blog");
    }

    const json = await response.json();
    return json.data as Blog;
  },

  getBlogCategories: async () => {
    return [];
  },
};
