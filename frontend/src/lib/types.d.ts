export interface Project {
  title: string
  shortDescription: string
  priority: number
  cover: string
  livePreview?: string
  githubLink?: string
  visitors?: string
  earned?: string
  githubStars?: string
  ratings?: string
  numberOfSales?: string
  type: string
  siteAge?: string
}

export interface Heading {
  id: string
  title: string
  items: Heading[]
}


// src/lib/types.ts
export interface BlogPost {
  id: string | number;
  title: string;
  description: string;
  content?: string;
  coverImage: string;
  date: string;
  slug: string;
  tags: string[] | string; // Allow both string array or single string
}
// src/lib/types.d.ts (add these types)

export interface Hackathon {
  title: string;
  description: string;
}

// src/lib/types.d.ts (add or update)
export interface Certification {
  id: string;          // Adding id for unique identification
  title: string;
  date: string;
  issuer: string;
  image: string;
  link: string;
  description?: string; // Add description for more detail
  slug: string;        // Add slug for URL-friendly paths
}
// src/lib/types.ts
export interface Extracurricular {
  id: number;
  title: string;
  description: string;
}

// src/lib/types.ts
export interface ResearchInterest {
  id: number;
  interest: string;  // Changed from 'title' to 'interest' to match API model
}

export interface Skill {
  name: string;
  level: number;
}
export type Skill = string;


export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  icon: string;
}