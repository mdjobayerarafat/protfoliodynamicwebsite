// src/app/certifications/page.tsx
import CertificationCard from '@/components/CertificationCard';

async function getAllCertifications() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://20.163.180.176';
    const response = await fetch(`${baseUrl}/certifications/`);

    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch certifications:', error);
    return [];
  }
}

export const metadata = {
  title: 'Certifications | Developer Portfolio',
  description: 'View my professional certifications and achievements in technology',
};

export default async function CertificationsPage() {
  const allCertifications = await getAllCertifications();

  return (
    <main className="min-h-screen bg-primary">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-medium text-white mb-4">
            <span className="text-mint">#</span>certifications
          </h1>
          <p className="text-primary max-w-2xl">
            Professional certifications and achievements in my technology career
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
          {allCertifications.map((certification) => (
            <CertificationCard key={certification.id} certification={certification} />
          ))}
        </div>
      </div>
    </main>
  );
}