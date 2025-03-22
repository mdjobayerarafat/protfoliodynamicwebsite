import Link from 'next/link'
import { Project } from '@/lib/types'
import SectionHeading from '../SectionHeading/SectionHeading'
import ProjectCard from './ProjectCard'

interface ProjectSectionProps {
  projects: Project[]
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ projects }) => {
  const topProjects = projects
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 4)

  return (
    <section id="projects">
      <div className="flex justify-between items-center">
        <SectionHeading title="// Projects" />
        <Link
          href="/projects"
          className="text-mint hover:underline inline-flex items-center"
        >
          View all
          <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>

      <div className="my-8 grid grid-cols-1 gap-8 md:my-12 md:grid-cols-2">
        {topProjects.map((project) => (
          <ProjectCard key={project.priority} data={project} />
        ))}
      </div>
    </section>
  )
}

export default ProjectSection