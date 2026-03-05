import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getData } from '../utils/storage';

function ServicesPreview() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const siteData = getData();
    setServices(siteData.services);
  }, []);

  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-4xl mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-geologica font-bold text-dark mb-6 leading-tight">
            Services
          </h2>
          <p className="text-xl text-dark/80 font-afacad leading-relaxed">
            Altura Marketing offers strategic marketing support for brands that want clarity, stronger creative, and measurable growth.
          </p>
        </div>

        {/* Services Grid */}
        <div className="space-y-16">
          {services.map((service) => (
            <div
              key={service.id}
              className="group cursor-pointer"
            >
              <div className="flex gap-8">
                {/* Number */}
                <div className="flex-shrink-0">
                  <span className="text-5xl md:text-6xl font-geologica font-bold text-accent/30 group-hover:text-accent transition-colors">
                    {service.number}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-geologica font-bold text-dark mb-4 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-lg text-dark/70 font-afacad leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <Link
                    to="/services"
                    className="inline-flex items-center text-dark font-afacad font-semibold hover:text-accent transition-colors group"
                  >
                    Learn More
                    <svg
                      className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Divider */}
              {service.id !== services[services.length - 1].id && (
                <div className="mt-16 h-px bg-dark/10"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesPreview;
