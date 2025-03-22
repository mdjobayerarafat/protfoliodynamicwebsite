// src/app/projects/[id]/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { getProjectById } from '@/lib/project';
import { Earning, Likes, Star, Timer } from '@/utils/icons';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id);

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found'
    };
  }

  return {
    title: `${project.title} | Projects`,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: project.cover ? [{ url: project.cover }] : []
    }
  };
}

const IconText = ({ icon, text }: { icon: string; text: string }) => (
  <li className="flex gap-2">
    <Image src={icon} alt={text} className="size-[18px] md:size-5" />
    <span className="text-sm">{text}</span>
  </li>
);

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id);

  if (!project) {
    return <div>Project not found</div>;
  }

  const imageUrl = project.cover ?
    project.cover.startsWith('http') ?
      project.cover :
      `${process.env.NEXT_PUBLIC_API_URL || 'http://20.163.180.176'}/static/${project.cover.replace(/^\/uploads\/|^\/static\/|^\//g, '')}` :
    '/images/default-project.jpg';

  return (
    <main className="min-h-screen bg-primary">
      <div className="container mx-auto px-4 py-16">
        <Link href="/projects" className="text-mint mb-8 inline-flex items-center hover:underline">
          <svg className="mr-2 w-4 h-4 rotate-180" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
          </svg>
          Back to projects
        </Link>

        <div className="bg-secondary rounded-lg overflow-hidden border border-[#1E2D3D] animate-fade-in">
          <div className="relative h-96 w-full">
            <Image
              src={imageUrl}
              alt={project.title}
              fill
              style={{ objectFit: 'cover' }}
              priority
              unoptimized={imageUrl.startsWith('http')}
            />
          </div>

          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              {project.type && (
                <span className={`rounded-md bg-[#FFFFFF1A] px-3 py-1 text-sm ${
                  project.type === 'New 🔥' ? 'animate-blink text-[#FFA800]' : 'text-mint'
                }`}>
                  {project.type}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-medium text-white mb-6">
              {project.title}
            </h1>

            <ul className="flex flex-wrap gap-4 mb-8">
              {project.visitors && <IconText icon={Likes} text={project.visitors} />}
              {project.siteAge && <IconText icon={Timer} text={project.siteAge} />}
              {project.earned && <IconText icon={Earning} text={project.earned} />}
              {project.githubStars && <IconText icon={Star} text={project.githubStars} />}
            </ul>

            <div className="prose prose-invert max-w-none text-primary mb-8">
              {project.shortDescription}
            </div>

            <div className="flex flex-wrap gap-6">
              {project.livePreview && (
                <a
                  href={project.livePreview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mint hover:underline flex items-center gap-2"
                >
                  <span>Live Preview</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mint hover:underline flex items-center gap-2"
                >
                  <span>View Source</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}