// src/lib/project.ts
import { Project } from '@/lib/types';

export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://20.163.180.176';
    const response = await fetch(`${baseUrl}/projects/${id}`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });

    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch project:', error);
    return null;
  }
}