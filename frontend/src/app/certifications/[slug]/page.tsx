// src/app/certifications/page.tsx/page.tsx
import { getCertificationBySlug, getAllCertifications } from '@/services/certificationService';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CertificationCard from '@/components/CertificationCard';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const certification = await getCertificationBySlug(params.slug);

  if (!certification) {
    return {
      title: 'Certification Not Found',
      description: 'The certification you are looking for could not be found.',
    };
  }

  return {
    title: `${certification.title} | Developer Portfolio`,
    description: `${certification.title} issued by ${certification.issuer} - View details and verification`,
  };
}

export default async function CertificationDetailPage({ params }: { params: { slug: string } }) {
  const certification = await getCertificationBySlug(params.slug);

  if (!certification) {
    notFound();
  }

  const otherCertifications = (await getAllCertifications())
    .filter(cert => cert.id !== certification.id)
    .slice(0, 3);

  // Process image URL
  let imageUrl = '/images/default-cert.jpg'; // Default fallback
  if (certification.image) {
    if (certification.image.startsWith('http')) {
      imageUrl = certification.image;
    } else {
      // Use localhost:8000 format as requested
      imageUrl = `http://20.163.180.176/static/${certification.image.replace(/^\/uploads\/|^\/static\/|^\//g, '')}`;
    }
  }

  return (
    <main className="min-h-screen bg-primary">
      <div className="container mx-auto px-4 py-16">
        <Link href="/certifications" className="text-mint mb-8 inline-flex items-center hover:underline">
          <svg className="mr-2 w-4 h-4 rotate-180" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
          </svg>
          Back to certifications
        </Link>

        <div className="bg-secondary rounded-lg overflow-hidden border border-[#1E2D3D] mb-12 animate-fade-in">
          <div className="relative h-80 w-full">
            <Image
              src={imageUrl}
              alt={certification.title}
              fill
              style={{ objectFit: 'cover' }}
              priority
              unoptimized={imageUrl.startsWith('http')}
            />
          </div>

          <div className="p-8">
            <div className="flex flex-wrap justify-between items-start mb-6">
              <h1 className="text-3xl md:text-4xl font-medium text-white mb-3">
                {certification.title}
              </h1>
              <div className="bg-primary/20 text-primary text-sm px-3 py-1 rounded">
                {certification.issuer}
              </div>
            </div>

            <p className="text-mint mb-6">Issued on {certification.date}</p>

            <div className="prose prose-invert max-w-none text-primary mb-8">
              <p>{certification.description || 'No detailed description available for this certification.'}</p>
            </div>

            <a
              href={certification.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-mint text-primary px-6 py-3 rounded-lg hover:bg-mint/90 transition-colors"
            >
              Verify Certificate
              <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
              </svg>
            </a>
          </div>
        </div>

        {otherCertifications.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-medium text-white mb-8">
              <span className="text-mint">#</span>more certifications
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherCertifications.map((cert) => (
                <CertificationCard key={cert.id} certification={cert} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}