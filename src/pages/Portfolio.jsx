import { useEffect, useState } from 'react';
import { getData } from '../utils/storage';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Portfolio() {
  const [brands, setBrands] = useState([]);
  const [heroData, setHeroData] = useState({});
  const [expandedId, setExpandedId] = useState(null);
  const [currentAd, setCurrentAd] = useState(0);

  useEffect(() => {
    const siteData = getData();
    setBrands(siteData.brands || []);
    setHeroData(siteData.portfolioHero || {
      title: 'AD GALLERY',
      subtitle: "Explore the ads we've created for brands we've partnered with.",
    });
  }, []);

  const toggleBrand = (id) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
      setCurrentAd(0);
    }
  };

  return (
    <div className="min-h-screen bg-portfolio-cream">
      <Navbar />

      {/* Hero / Header */}
      <section className="bg-portfolio-cream flex flex-col items-center justify-center text-center pt-[125px]" style={{ height: 'calc(100vw / 2.8)' }}>
        <h1 className="font-display text-[50px] font-bold text-near-black leading-[1.05] uppercase">
          {heroData.title || 'AD GALLERY'}
        </h1>
        <p className="font-subheading font-light text-[18px] text-near-black mt-4 max-w-[570px] mx-auto leading-[1.25]">
          {heroData.subtitle || "Explore the ads we've created for brands we've partnered with."}
        </p>
      </section>

      {/* Brand Logo Strips */}
      <section className="flex flex-col">
        {brands.map((brand) => {
          const isExpanded = expandedId === brand.id;
          const ads = brand.ads || [];

          return (
            <div key={brand.id}>
              {/* Brand Strip */}
              <button
                onClick={() => toggleBrand(brand.id)}
                className="w-full flex items-center justify-center transition-opacity hover:opacity-80 cursor-pointer border-none"
                style={{ height: 'calc(100vw / 10)', backgroundColor: brand.bgColor }}
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-auto object-contain"
                  style={{ height: `${brand.logoScale || 50}%` }}
                />
              </button>

              {/* Expanded Ads Section */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="bg-portfolio-cream py-12 px-8">
                  <div className="max-w-[900px] mx-auto">
                    {ads.length === 0 ? (
                      <p className="text-center text-near-black/50 font-subheading text-[1rem] py-8">
                        Ads coming soon for {brand.name}.
                      </p>
                    ) : (
                      <>
                        <div className="flex items-center justify-center mb-6">
                          <img
                            src={ads[currentAd]}
                            alt={`${brand.name} ad ${currentAd + 1}`}
                            className="max-w-full max-h-[550px] object-contain rounded-lg"
                          />
                        </div>

                        {/* Dot Navigation */}
                        {ads.length > 1 && (
                          <div className="flex items-center justify-center gap-3">
                            {ads.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={() => setCurrentAd(idx)}
                                aria-label={`View ad ${idx + 1}`}
                                className={`rounded-full transition-all cursor-pointer border-none ${
                                  idx === currentAd
                                    ? 'w-3 h-3 bg-near-black'
                                    : 'w-2.5 h-2.5 bg-near-black/25 hover:bg-near-black/50'
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
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
