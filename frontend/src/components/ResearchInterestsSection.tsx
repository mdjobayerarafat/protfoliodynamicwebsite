// src/components/ResearchInterestsSection.tsx
'use client';

import { useEffect, useState } from 'react';
import { ResearchInterest } from '@/lib/types';
import { getResearchInterests } from '@/services';
import ResearchInterestTag from './ResearchInterestTag';
import SectionHeading from './SectionHeading/SectionHeading';

const ResearchInterestsSection = () => {
  const [interests, setInterests] = useState<ResearchInterest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const data = await getResearchInterests();
        setInterests(data);
      } catch (error) {
        console.error('Failed to fetch research interests:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInterests();
  }, []);

  return (
    <section className="py-20 bg-secondary relative overflow-hidden" id="research">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="_research_interests"
          subtitle="Areas of technology that I'm particularly interested in exploring"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {!isLoading && interests.map((item) => (
            <ResearchInterestTag
              key={item.id}
              interest={item.interest}  // Changed from title to interest
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchInterestsSection;