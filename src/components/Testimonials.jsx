import { useEffect, useState } from 'react';
import { getData } from '../utils/storage';

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const siteData = getData();
    setTestimonials(siteData.testimonials);

    // Auto-scroll every 5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % siteData.testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (testimonials.length === 0) return null;

  return (
    <section className="bg-dark py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-geologica font-bold text-cream mb-16 text-center">
          What Clients Say
        </h2>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="min-w-full flex flex-col items-center text-center px-4"
                >
                  {/* Avatar */}
                  {testimonial.avatar ? (
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-20 h-20 rounded-full object-cover mb-8"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-8">
                      <span className="text-2xl font-geologica text-accent">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                  )}

                  {/* Quote */}
                  <blockquote className="text-2xl md:text-3xl font-afacad text-cream/90 mb-8 leading-relaxed italic max-w-3xl">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Name & Title */}
                  <p className="text-cream font-afacad font-semibold text-lg">
                    {testimonial.name}
                  </p>
                  <p className="text-cream/60 font-afacad">
                    {testimonial.titleCompany}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-accent w-8'
                    : 'bg-cream/30 hover:bg-cream/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
