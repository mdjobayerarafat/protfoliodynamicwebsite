// src/services/certificationService.ts
import { certifications } from '../../content/certifications';
import { Certification } from '@/lib/types';

export function getAllCertifications(): Certification[] {
  return certifications;
}

export function getCertificationBySlug(slug: string): Certification | undefined {
  return certifications.find(cert => cert.slug === slug);
}