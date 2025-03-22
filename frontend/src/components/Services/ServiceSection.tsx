// src/components/Services/ServiceSection.tsx
    import { Service } from '@/lib/types';
    import SectionHeading from '../SectionHeading/SectionHeading';
    import ServiceCard from './ServiceCard';

    interface ServiceSectionProps {
      services: Service[];
    }

    const ServiceSection: React.FC<ServiceSectionProps> = ({ services }) => {
      return (
        <section id="services" className="my-14">
          <SectionHeading
            title="// Services / Offers:"
            subtitle="I offer a wide range of services to ensure you have the best written code and stay ahead in the competition."
          />

          <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-8 md:mt-[3.75rem] md:grid-cols-3">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                icon={service.icon}
                title={service.title}
                shortDescription={service.shortDescription}
              />
            ))}
          </div>
        </section>
      );
    };

    export default ServiceSection;