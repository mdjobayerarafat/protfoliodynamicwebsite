// src/app/page.tsx
import {
  getProjects,
  getServices,
  getSkills,
  getHackathons,
  getExtracurriculars,
  getResearchInterests,
  getCertifications,
  getBlogPosts
} from '@/services';

// Import all component sections
import Hero from '@/components/Hero/Hero';
import HackathonsSection from '@/components/HackathonsSection';
import ProjectSection from '@/components/Projects/ProjectSection';
import ExtracurricularsSection from '@/components/ExtracurricularsSection';
import ResearchInterestsSection from '@/components/ResearchInterestsSection';
import ServiceSection from '@/components/Services/ServiceSection';
import CertificationsSection from '@/components/CertificationsSection';
import BlogSection from '@/components/BlogSection';
import Skills from '@/components/Skills/Skills';
import ContactSection from '@/components/ContactSection';

export default async function Home() {
  try {
    const [
      projects,
      services,
      skills,
      hackathons,
      extracurriculars,
      researchInterests,
      certifications,
      blogPosts
    ] = await Promise.all([
      getProjects(),
      getServices(),
      getSkills(),
      getHackathons(),
      getExtracurriculars(),
      getResearchInterests(),
      getCertifications(),
      getBlogPosts()
    ]);

    return (
      <>
        <main className="w-dvw">
          <Hero />
          <div className="mx-auto my-8 max-w-[1200px] px-4 md:my-[3.75rem]">
            <HackathonsSection hackathons={hackathons} />
            <ProjectSection projects={projects} />
            <ExtracurricularsSection extracurriculars={extracurriculars} />
            <ResearchInterestsSection interests={researchInterests} />
            <ServiceSection services={services} />
            <CertificationsSection certifications={certifications} />
            <BlogSection posts={blogPosts} />
          </div>
          <div className="mb-[3.75rem]">
            <Skills skills={skills} />
          </div>
          <div className="mx-auto my-8 max-w-[1200px] px-4 md:my-[3.75rem]">
            <ContactSection />
          </div>
        </main>
      </>
    );
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-bold text-mint">Sorry, something went wrong</h1>
          <p className="text-primary">We're having trouble loading the data. Please try again later.</p>
        </div>
      </div>
    );
  }
}