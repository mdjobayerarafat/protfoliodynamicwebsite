// src/components/HackathonCard.tsx
import { Hackathon } from '@/lib/types';

interface HackathonCardProps {
  hackathon: Hackathon;
}

const HackathonCard = ({ hackathon }: HackathonCardProps) => {
  return (
    <div className="bg-secondary rounded-lg overflow-hidden border border-[#1E2D3D] p-6 hover:shadow-lg transition-shadow duration-300 h-full animate-fade-in">
      <h3 className="text-white text-xl font-medium mb-3">{hackathon.title}</h3>
      <p className="text-primary">{hackathon.description}</p>
    </div>
  );
};

export default HackathonCard;