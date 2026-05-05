import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getData } from '../utils/storage';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function PortfolioDetail() {
  const { slug } = useParams();
  const [brand, setBrand] = useState(null);
  const [currentAd, setCurrentAd] = useState(0);

  useEffect(() => {
    const siteData = getData();
    const found = siteData.brands?.find(b => b.slug === slug);
    setBrand(found);
    setCurrentAd(0);
  }, [slug]);

  if (!brand) {
    return (
      <div className="min-h-screen bg-portfolio-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-[2rem] font-bold text-near-black mb-4">
            Brand Not Found
          </h1>
          <Link
            to="/portfolio"
            className="inline-block px-6 py-3 bg-near-black text-white font-body font-semibold text-[0.82rem] tracking-[0.1em] uppercase transition-all hover:bg-near-black/80"
          >
            Back to Ad Gallery
          </Link>
        </div>
      </div>
    );
  }

  const ads = brand.ads || [];

  return (
    <div className="min-h-screen bg-portfolio-cream">
      <Navbar />

      {/* Brand Header */}
      <section
        className="w-full h-[200px] flex items-center justify-center mt-0"
        style={{ backgroundColor: brand.bgColor }}
      >
        <img
          src={brand.logo}
          alt={brand.name}
          className="w-auto object-contain"
          style={{ height: `${brand.logoHeight}px` }}
        />
      </section>

      {/* Ads Viewer */}
      <section className="py-16 px-8">
        <div className="max-w-[900px] mx-auto">
          {ads.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-near-black/50 font-subheading text-[1.1rem]">
                Ads coming soon for {brand.name}.
              </p>
            </div>
          ) : (
            <>
              {/* Current Ad Image */}
              <div className="flex items-center justify-center mb-8">
                <img
                  src={ads[currentAd]}
                  alt={`${brand.name} ad ${currentAd + 1}`}
                  className="max-w-full max-h-[600px] object-contain rounded-lg"
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
      </section>

      {/* Back + CTA */}
      <section className="pb-20 text-center space-y-4">
        <Link
          to="/portfolio"
          className="inline-block px-8 py-3 bg-transparent text-near-black font-display font-bold text-[16px] tracking-[0.05em] uppercase border-2 border-near-black hover:bg-near-black hover:text-white transition-colors"
        >
          Back to Ad Gallery
        </Link>
      </section>

      <Footer />
    </div>
  );
}

export default PortfolioDetail;
