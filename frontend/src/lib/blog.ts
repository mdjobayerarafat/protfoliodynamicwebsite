// src/lib/blog.ts
import { BlogPost } from '@/lib/types'; // Import the BlogPost type

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    // Fix the URL by making it absolute
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://20.163.180.176';
    const response = await fetch(`${baseUrl}/blog-posts/${slug}`);

    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch blog post:', error);
    return null;
  }
}