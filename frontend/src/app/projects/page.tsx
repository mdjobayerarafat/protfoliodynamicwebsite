// src/app/projects/page.tsx
      import ProjectCard from '@/components/Projects/ProjectCard';

      async function getAllProjects() {
        try {
          const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://20.163.180.176';
          const response = await fetch(`${baseUrl}/projects`, {
            next: { revalidate: 3600 } // Revalidate every hour
          });

          if (!response.ok) return [];
          return await response.json();
        } catch (error) {
          console.error('Failed to fetch projects:', error);
          return [];
        }
      }

      export const metadata = {
        title: 'Projects | Developer Portfolio',
        description: 'Explore my latest development projects and applications',
      };

      export default async function ProjectsPage() {
        const allProjects = await getAllProjects();

        return (
          <main className="min-h-screen bg-primary">
            <div className="container mx-auto px-4 py-16">
              <div className="mb-12">
                <h1 className="text-4xl font-medium text-white mb-4">
                  <span className="text-mint">#</span>projects
                </h1>
                <p className="text-primary max-w-2xl">
                  A collection of my development projects, applications and experiments
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
                {allProjects.map((project) => (
                  <ProjectCard key={project.id} data={project} />
                ))}
              </div>
            </div>
          </main>
        );
      }