// src/services/index.ts
import { Project, Certification, Hackathon, Extracurricular, ResearchInterest } from '@/lib/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://20.197.36.135/';

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

// Projects API
export const getProjects = async (): Promise<Project[]> => {
  return fetchAPI<Project[]>('/projects');
};

export const getProjectById = async (id: number): Promise<Project> => {
  return fetchAPI<Project>(`/projects/${id}`);
};

// Services API
export const getServices = async () => {
  return fetchAPI('/services');
};

// Skills API
export const getSkills = async () => {
  return fetchAPI('/skills');
};

// Certifications API
export const getCertifications = async (): Promise<Certification[]> => {
  return fetchAPI<Certification[]>('/certifications');
};

export const getCertificationBySlug = async (slug: string): Promise<Certification> => {
  return fetchAPI<Certification>(`/certifications/${slug}`);
};

// Blog Posts API
export const getBlogPosts = async () => {
  return fetchAPI('/blog-posts');
};

export const getBlogPostBySlug = async (slug: string) => {
  return fetchAPI(`/blog-posts/${slug}`);
};

// Hackathons API
export const getHackathons = async (): Promise<Hackathon[]> => {
  return fetchAPI<Hackathon[]>('/hackathons');
};


// src/services/index.ts
export const getExtracurriculars = async (): Promise<Extracurricular[]> => {
  return fetchAPI<Extracurricular[]>('/extracurriculars');
};
// Research Interests API
export const getResearchInterests = async (): Promise<ResearchInterest[]> => {
  return fetchAPI<ResearchInterest[]>('/research-interests');
};