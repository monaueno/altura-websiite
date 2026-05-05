import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getData } from '../utils/storage';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Portfolio() {
  const [brands, setBrands] = useState([]);
  const [heroData, setHeroData] = useState({});

  useEffect(() => {
    const siteData = getData();
    setBrands(siteData.brands || []);
    setHeroData(siteData.portfolioHero || {
      title: 'AD GALLERY',
      subtitle: "Explore the ads we've created for brands we've partnered with.",
    });
  }, []);

  return (
    <div className="min-h-screen bg-portfolio-cream">
      <Navbar />

      {/* Hero / Header */}
      <section className="bg-portfolio-cream pt-48 pb-16 text-center">
        <h1 className="font-display text-[50px] font-bold text-near-black leading-[1.05] uppercase">
          {heroData.title || 'AD GALLERY'}
        </h1>
        <p className="font-subheading font-light text-[18px] text-near-black mt-4 max-w-[570px] mx-auto leading-[1.25]">
          {heroData.subtitle || "Explore the ads we've created for brands we've partnered with."}
        </p>
      </section>

      {/* Brand Logo Strips */}
      <section className="flex flex-col">
        {brands.map((brand) => (
          <Link
            key={brand.id}
            to={`/portfolio/${brand.slug}`}
            className="w-full h-[140px] flex items-center justify-center transition-opacity hover:opacity-80 cursor-pointer"
            style={{ backgroundColor: brand.bgColor }}
          >
            <img
              src={brand.logo}
              alt={brand.name}
              className="w-auto object-contain"
              style={{ height: `${brand.logoHeight}px` }}
            />
          </Link>
        ))}
      </section>

      {/* Hire Us CTA */}
      <section className="bg-portfolio-cream py-20 text-center">
        <a
          href="/services#contact"
          className="inline-block bg-near-black text-white font-display font-bold text-[20px] tracking-[0.05em] uppercase px-6 py-3 hover:bg-near-black/80 transition-colors"
        >
          Hire Us!
        </a>
      </section>

      <Footer />
    </div>
  );
}

export default Portfolio;
