// src/components/CertificationCard.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Certification } from '@/lib/types';

interface CertificationCardProps {
  certification: Certification;
}

const CertificationCard: React.FC<CertificationCardProps> = ({ certification }) => {
  // Fix image URL formatting
  const imageUrl = React.useMemo(() => {
    if (!certification.image) return '/images/default-certification.jpg';

    if (certification.image.startsWith('http')) {
      return certification.image;
    }

    // Use the same URL format as other components
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://20.163.180.176';
    return `${baseUrl}/static/${certification.image.replace(/^\/uploads\/|^\/static\/|^\//g, '')}`;
  }, [certification.image]);


  return (
    <div className="bg-secondary rounded-lg overflow-hidden border border-[#1E2D3D] transition-transform hover:-translate-y-1">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={certification.title}
          fill
          style={{ objectFit: 'cover' }}
          unoptimized={imageUrl.startsWith('http')}
        />
      </div>
      <div className="p-6">
        <div className="bg-primary/20 text-primary text-sm px-3 py-1 rounded mb-3 inline-block">
          {certification.issuer}
        </div>
        <h3 className="text-xl font-medium text-white mb-2">{certification.title}</h3>
        <p className="text-primary mb-4">
          {certification.description?.slice(0, 100)}
          {certification.description?.length > 100 ? '...' : ''}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-primary">{certification.date}</span>
          <Link
            href={certification.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-mint hover:underline"
            >
            View certificate →
        </Link>
        </div>
      </div>
    </div>
  );
};

export default CertificationCard;