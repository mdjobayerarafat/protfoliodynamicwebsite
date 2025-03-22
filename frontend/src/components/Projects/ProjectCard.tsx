// src/components/Projects/ProjectCard.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Earning, GithubDark, Likes, Preview, Star, Timer } from '../../utils/icons'
import { Project } from '@/lib/types'
import React from 'react'

const IconText: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
  <li className="flex gap-2">
    <Image src={icon} alt={text} className="size-[18px] md:size-5" />
    <span className="text-sm">{text}</span>
  </li>
)

interface ProjectCardProps {
  data: Project
}

const ProjectCard: React.FC<ProjectCardProps> = ({ data }) => {
  const {
    id,
    title,
    shortDescription,
    visitors,
    earned,
    ratings,
    githubStars,
    numberOfSales,
    livePreview,
    githubLink,
    siteAge,
    type,
    cover,
  } = data

  const imageUrl = React.useMemo(() => {
    if (!cover) return '/images/default-project.jpg';
    if (cover.startsWith('http')) return cover;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://20.163.180.176';
    return `${baseUrl}/static/${cover.replace(/^\/uploads\/|^\/static\/|^\//g, '')}`;
  }, [cover]);

  const handleExternalLink = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(url, '_blank');
  };

  return (
    <Link href={`/projects/${id}`}>
      <div className="flex flex-col justify-between rounded-[14px] border border-[#1E2D3D] bg-secondary p-5 hover:border-mint transition-all duration-300">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="flex flex-col flex-wrap gap-3 sm:flex-row sm:items-center">
              <h3 className="text-lg font-medium text-indigo md:font-semibold">{title}</h3>
              {type && (
                <span className={`h-7 w-fit rounded-md bg-[#FFFFFF1A] p-1 text-sm ${
                  type === 'New 🔥' ? 'animate-blink text-[#FFA800]' : 'text-mint'
                } backdrop-blur-[80px]`}>
                  {type}
                </span>
              )}
            </div>
            <ul className="mt-3 flex flex-col flex-wrap gap-2 sm:flex-row sm:gap-4">
              {(visitors || numberOfSales) && (
                <IconText text={(visitors || numberOfSales)?.toString() || ''} icon={Likes} />
              )}
              {siteAge && <IconText text={siteAge} icon={Timer} />}
              {earned && <IconText text={earned} icon={Earning} />}
              {(ratings || githubStars) && (
                <IconText text={(ratings || githubStars)?.toString() || ''} icon={Star} />
              )}
            </ul>
          </div>
          <figure className="flex justify-end overflow-hidden">
            <Image
              src={imageUrl}
              width={150}
              height={80}
              alt={title}
              className="h-[80px] w-[150px] rounded-md object-cover shadow-[0px_1.66px_3.74px_-1.25px_#18274B1F]"
              unoptimized={imageUrl.startsWith('http')}
            />
          </figure>
        </div>

        <div>
          <div className="my-4 h-[100px] overflow-scroll rounded-2xl bg-primary px-4 py-2 text-primary">
            <p className="text-[14px] font-normal md:text-base">
              {shortDescription.length > 100
                ? `${shortDescription.slice(0, 100)}...`
                : shortDescription}
            </p>
          </div>
          <div className="flex gap-5">
            {livePreview && (
              <a
                href={livePreview}
                className="flex gap-2 text-sm text-mint underline underline-offset-[3px] transition-all duration-300 hover:scale-105 md:text-base"
                onClick={(e) => handleExternalLink(e, livePreview)}
              >
                <Image src={Preview} alt="view icon" className="h-auto w-[18px] md:w-5" />
                <span>Live Preview</span>
              </a>
            )}
            {githubLink && (
              <a
                href={githubLink}
                className="flex gap-2 text-sm text-mint underline underline-offset-[3px] transition-all duration-300 hover:scale-105 md:text-base"
                onClick={(e) => handleExternalLink(e, githubLink)}
              >
                <Image src={GithubDark} alt="github icon" className="w-[18px] md:w-5" />
                <span>Github Link</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProjectCard