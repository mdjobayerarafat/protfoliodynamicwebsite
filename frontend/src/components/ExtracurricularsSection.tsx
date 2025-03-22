// src/components/ExtracurricularsSection.tsx
    'use client';

    import { useEffect, useState } from 'react';
    import { Extracurricular } from '@/lib/types';
    import { getExtracurriculars } from '@/services';
    import ExtracurricularCard from './ExtracurricularCard';
    import SectionHeading from './SectionHeading/SectionHeading';

    const ExtracurricularsSection = () => {
      const [extracurriculars, setExtracurriculars] = useState<Extracurricular[]>([]);
      const [isLoading, setIsLoading] = useState(true);

      useEffect(() => {
        const fetchExtracurriculars = async () => {
          try {
            const data = await getExtracurriculars();
            setExtracurriculars(data);
          } catch (error) {
            console.error('Failed to fetch extracurriculars:', error);
          } finally {
            setIsLoading(false);
          }
        };

        fetchExtracurriculars();
      }, []);

      return (
        <section className="py-20 bg-primary relative overflow-hidden" id="extracurriculars">
          <div className="container mx-auto px-4">
            <SectionHeading
              title="_extracurriculars"
              subtitle="My extracurricular activities and interests"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {!isLoading && extracurriculars.map((item) => (
                <ExtracurricularCard
                  key={item.id}
                  extracurricular={item}
                />
              ))}
            </div>
          </div>
        </section>
      );
    };

    export default ExtracurricularsSection;