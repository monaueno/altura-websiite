import { useEffect, useState } from 'react';
import { getData } from '../utils/storage';

function Hero() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const siteData = getData();
    setData(siteData.home);
  }, []);

  if (!data) return null;

  return (
    <section className="relative min-h-screen bg-dark flex items-center pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={data.heroImage}
          alt="Hero"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-3xl">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-geologica font-bold text-cream mb-8 leading-tight">
            {data.heroHeadline}
          </h1>
          <p className="text-xl md:text-2xl text-cream/90 font-afacad mb-10 leading-relaxed">
            {data.heroSubheadline}
          </p>
          <a
            href="#contact"
            className="inline-block bg-accent text-dark px-8 py-4 rounded-full text-lg font-afacad font-semibold hover:bg-accent/90 transition-all hover:scale-105"
          >
            {data.heroCTAText}
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-cream/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-cream/50 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
