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
    <section className="relative h-screen min-h-[640px] flex items-end px-12 pb-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-near-black overflow-hidden">
        {data.heroImage ? (
          <img
            src={data.heroImage}
            alt="Hero background"
            className="w-full h-full object-cover opacity-[0.55]"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] via-[#2d2d2d] to-[#1a1208] flex items-center justify-center">
            <span className="text-white/10 text-[0.8rem] tracking-[0.2em] uppercase">
              Hero background image
            </span>
          </div>
        )}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 max-w-[600px]">
        <p className="text-[0.75rem] tracking-[0.25em] uppercase text-accent font-medium mb-4">
          Creative Strategy · Brand Marketing
        </p>
        <h1 className="font-display text-[clamp(2.8rem,5vw,4.5rem)] font-black text-white leading-[1.05] tracking-[-0.01em] mb-5">
          {data.heroHeadline}
        </h1>
        <p className="text-base text-white/75 leading-[1.7] max-w-[420px] mb-9 font-light">
          {data.heroSubheadline}
        </p>
        <a
          href="#contact"
          className="inline-block px-8 py-[14px] bg-accent text-near-black font-body font-semibold text-[0.82rem] tracking-[0.1em] uppercase rounded-[2px] transition-all hover:bg-accent-light hover:-translate-y-[1px]"
        >
          {data.heroCTAText}
        </a>
      </div>
    </section>
  );
}

export default Hero;
