// src/components/Services/ServiceCard.tsx
import React from 'react';
import Image from 'next/image';

interface ServiceCardTypes {
  icon: string;
  title: string;
  shortDescription: string;
}

const ServiceCard: React.FC<ServiceCardTypes> = ({ title, shortDescription, icon }) => {
  const iconUrl = React.useMemo(() => {
    if (!icon || typeof icon !== 'string') return '/images/default-service-icon.png';

    if (icon.startsWith('http')) {
      return icon;
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://20.163.180.176';
    return `${baseUrl}/static/${icon.replace(/^\/uploads\/|^\/static\/|^\//g, '')}`;
  }, [icon]);

  return (
    <div className="bg-secondary flex flex-col items-center rounded-[14px] border border-[#1E2D3D] p-5">
      <div className="relative h-14 w-14">
        <Image
          src={iconUrl}
          alt={title}
          width={56}
          height={56}
          className="object-contain"
          unoptimized={typeof iconUrl === 'string' && iconUrl.startsWith('http')}
        />
      </div>
      <h5 className="text-mint mb-5 mt-2 text-center text-base font-semibold">{title}</h5>
      <div className="rounded-2xl bg-primary p-4">
        <p className="text-center text-sm font-normal text-primary">{shortDescription}</p>
      </div>
    </div>
  );
};

export default ServiceCard;