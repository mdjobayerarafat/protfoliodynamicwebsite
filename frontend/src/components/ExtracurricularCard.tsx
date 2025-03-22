// src/components/ExtracurricularCard.tsx
                              import { Extracurricular } from '@/lib/types';

                              interface ExtracurricularCardProps {
                                extracurricular: Extracurricular;
                              }

                              const ExtracurricularCard = ({ extracurricular }: ExtracurricularCardProps) => {
                                if (!extracurricular) {
                                  return null;
                                }

                                return (
                                  <div className="bg-secondary rounded-lg overflow-hidden border border-[#1E2D3D] hover:shadow-lg transition-all duration-300 h-full animate-fade-in">
                                    <div className="p-6">
                                      <h3 className="text-white text-xl font-medium mb-3">
                                        {extracurricular.title}
                                      </h3>
                                      <p className="text-primary whitespace-pre-wrap">
                                        {extracurricular.description}
                                      </p>
                                    </div>
                                  </div>
                                );
                              };

                              export default ExtracurricularCard;