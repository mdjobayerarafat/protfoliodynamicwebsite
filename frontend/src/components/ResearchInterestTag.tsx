// src/components/ResearchInterestTag.tsx
interface ResearchInterestTagProps {
  interest: string;  // Keep as string since we're passing only the interest text
}

const ResearchInterestTag = ({ interest }: ResearchInterestTagProps) => {
  return (
    <div className="bg-secondary rounded-lg border border-[#1E2D3D] px-4 py-3 hover:shadow-md transition-shadow duration-300 animate-fade-in">
      <p className="text-white">{interest}</p>
    </div>
  );
};

export default ResearchInterestTag;