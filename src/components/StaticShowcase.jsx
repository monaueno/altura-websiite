import { useEffect, useState } from 'react';
import { getData } from '../utils/storage';

function StaticShowcase() {
  const [data, setData] = useState(null);
  const [portfolioImages, setPortfolioImages] = useState([]);

  useEffect(() => {
    const siteData = getData();
    setData(siteData.home);

    // In a real scenario, you'd dynamically load these from the portfolio folder
    // For now, we'll use placeholders
    setPortfolioImages([
      { id: 1, src: '/assets/portfolio/ad-1.jpg', alt: 'Static Ad 1' },
      { id: 2, src: '/assets/portfolio/ad-2.jpg', alt: 'Static Ad 2' },
      { id: 3, src: '/assets/portfolio/ad-3.jpg', alt: 'Static Ad 3' },
      { id: 4, src: '/assets/portfolio/ad-4.jpg', alt: 'Static Ad 4' },
    ]);
  }, []);

  if (!data) return null;

  return (
    <section className="bg-dark py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-geologica font-bold text-cream mb-6 leading-tight">
            {data.staticShowcaseHeadline}
          </h2>
          <p className="text-xl text-cream/80 font-afacad leading-relaxed">
            {data.staticShowcaseSubheading}
          </p>
        </div>

        {/* Grid of Images */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioImages.map((image) => (
            <div
              key={image.id}
              className="relative aspect-[3/4] rounded-lg overflow-hidden group cursor-pointer"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  // Fallback placeholder
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="600"%3E%3Crect fill="%23333" width="400" height="600"/%3E%3Ctext fill="%23666" font-family="sans-serif" font-size="24" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EStatic Ad%3C/text%3E%3C/svg%3E';
                }}
              />
              <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/20 transition-colors duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StaticShowcase;
