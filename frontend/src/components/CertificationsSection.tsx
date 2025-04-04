// src/components/CertificationsSection.tsx
import React from 'react';
import Link from 'next/link';
import CertificationCard from './CertificationCard';
import { Certification } from '@/lib/types';

interface CertificationsSectionProps {
  certifications: Certification[];
}

const CertificationsSection: React.FC<CertificationsSectionProps> = ({ certifications }) => {
  // Show only 3 certifications on homepage
  const displayCertifications = certifications?.slice(0, 3) || [];

  return (
    <section className="py-20 bg-secondary relative overflow-hidden" id="certifications">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-medium text-white">
            <span className="text-mint">#</span>certifications
          </h2>
          <Link
            href="/certifications"
            className="text-mint hover:underline inline-flex items-center"
          >
            View all
            <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayCertifications.map((cert) => (
            <CertificationCard key={cert.id} certification={cert} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;