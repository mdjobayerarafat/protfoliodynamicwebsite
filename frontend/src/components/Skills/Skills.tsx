// src/components/Skills/Skills.tsx
import React from 'react';
import Image from 'next/image';

interface Skill {
  name: string;
  icon: string; // This will now be the icon URL from the API
}

interface SkillsProps {
  skills: Skill[];
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const getIconUrl = (iconPath: string) => {
    if (!iconPath) return '/images/default-icon.png';

    if (iconPath.startsWith('http')) {
      return iconPath;
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://20.163.180.176';
    return `${baseUrl}/static/${iconPath.replace(/^\/uploads\/|^\/static\/|^\//g, '')}`;
  };

  return (
    <section className="bg-secondary py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-white mb-8">_skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 bg-primary rounded-lg border border-[#1E2D3D]"
            >
              <div className="relative w-12 h-12">
                <Image
                  src={getIconUrl(skill.icon)}
                  alt={skill.name}
                  fill
                  className="object-contain text-mint"
                  unoptimized={skill.icon?.startsWith('http')}
                />
              </div>
              <span className="mt-2 text-white">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;