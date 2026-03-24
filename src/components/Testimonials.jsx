import { useEffect, useState } from 'react';
import { getData } from '../utils/storage';

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const siteData = getData();
    setTestimonials(siteData.testimonials);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  if (testimonials.length === 0) return null;

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="bg-near-black px-12 py-24 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
      {/* Left Side - Text */}
      <div>
        <p className="text-[0.72rem] tracking-[0.25em] uppercase text-accent mb-6 font-medium">
          What Clients Say
        </p>
        <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] text-white font-bold leading-[1.2] mb-5">
          It's About Understanding <em className="text-accent italic">People</em>…Not Just Platforms.
        </h2>
        <p className="text-white/60 text-[0.95rem] leading-[1.75] font-light max-w-[380px]">
          We focus on uncovering what your audience actually cares about, then shaping creative and messaging that feels natural, emotional, and aligned with how they think and buy. When strategy leads, performance follows.
        </p>
      </div>

      {/* Right Side - Testimonial Card */}
      <div className="relative">
        <div className="bg-white p-9 rounded">
          {/* Company Logo/Name */}
          <div className="text-[0.75rem] tracking-[0.2em] uppercase font-bold text-mid-gray mb-5">
            {currentTestimonial.company}
          </div>

          {/* Quote */}
          <p className="text-[0.95rem] leading-[1.75] text-mid-gray mb-7 italic">
            "{currentTestimonial.quote}"
          </p>

          {/* Author */}
          <div className="flex flex-col gap-[2px]">
            <span className="font-display text-[1.1rem] font-bold text-near-black">
              {currentTestimonial.name}
            </span>
            <span className="text-[0.75rem] tracking-[0.1em] uppercase text-black/45 font-medium">
              {currentTestimonial.titleCompany}
            </span>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 mt-6 justify-end">
          <button
            onClick={handlePrev}
            className="w-10 h-10 border-[1.5px] border-white/30 bg-transparent text-white rounded-full cursor-pointer text-base flex items-center justify-center transition-all hover:border-accent hover:bg-accent hover:text-near-black"
            aria-label="Previous testimonial"
          >
            ←
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 border-[1.5px] border-white/30 bg-transparent text-white rounded-full cursor-pointer text-base flex items-center justify-center transition-all hover:border-accent hover:bg-accent hover:text-near-black"
            aria-label="Next testimonial"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
