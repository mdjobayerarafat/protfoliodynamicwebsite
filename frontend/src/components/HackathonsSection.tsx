// Example for src/components/HackathonsSection.tsx
import { FC } from 'react';
import { Hackathon } from '@/lib/types';

interface HackathonsSectionProps {
  hackathons: Hackathon[];
}

const HackathonsSection: FC<HackathonsSectionProps> = ({ hackathons }) => {
  if (!hackathons || hackathons.length === 0) {
    return null; // Or a placeholder
  }

  return (
    <section id="hackathons" className="my-20">
      <h2 className="text-2xl font-bold text-white mb-6">_hackathons</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hackathons.map((hackathon, index) => (
          <div key={index} className="bg-secondary p-6 rounded-lg border border-[#1E2D3D]">
            <h3 className="text-xl font-medium text-white mb-2">{hackathon.title}</h3>
            <p className="text-primary">{hackathon.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HackathonsSection;