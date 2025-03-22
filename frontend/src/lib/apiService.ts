// src/lib/apiService.ts
import { Project, Certification, Hackathon, Extracurricular, ResearchInterest } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://20.197.36.135/';

/**
 * Generic API fetching function with error handling
 */
async function fetchAPI<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    throw error;
  }
}

// Projects
export async function getProjects(): Promise<Project[]> {
  return fetchAPI<Project[]>('/projects');
}

export async function getProjectById(id: number): Promise<Project> {
  return fetchAPI<Project>(`/projects/${id}`);
}

// Services
export async function getServices() {
  return fetchAPI('/services');
}

// Skills
export async function getSkills() {
  return fetchAPI('/skills');
}

// Certifications
export async function getCertifications(): Promise<Certification[]> {
  return fetchAPI<Certification[]>('/certifications');
}

export async function getCertificationBySlug(slug: string): Promise<Certification> {
  return fetchAPI<Certification>(`/certifications/${slug}`);
}

// Blog Posts
// Update in src/lib/apiService.ts
import { BlogPost } from './types';

// Blog Posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  return fetchAPI<BlogPost[]>('/blog-posts');
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost> {
  return fetchAPI<BlogPost>(`/blog-posts/${slug}`);
}

// Hackathons
export async function getHackathons(): Promise<Hackathon[]> {
  return fetchAPI<Hackathon[]>('/hackathons');
}

// Extracurriculars
export async function getExtracurriculars(): Promise<Extracurricular[]> {
  return fetchAPI<Extracurricular[]>('/extracurriculars');
}

// Research Interests
export async function getResearchInterests(): Promise<ResearchInterest[]> {
  return fetchAPI<ResearchInterest[]>('/research-interests');
}