import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getData } from '../utils/storage';

function USP() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const siteData = getData();
    setData(siteData.home);
  }, []);

  if (!data) return null;

  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Image */}
          <div className="order-2 md:order-1">
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
              <img
                src={data.uspImage}
                alt="USP"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if computer.jpg doesn't exist yet
                  e.target.src = '/assets/Images/Branding Photoshoot/profile-pic.jpg';
                }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 md:order-2">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-geologica font-bold text-dark mb-8 leading-tight">
              {data.uspHeadline}
            </h2>
            <p className="text-xl text-dark/80 font-afacad mb-10 leading-relaxed">
              {data.uspBody}
            </p>
            <Link
              to="/portfolio"
              className="inline-block bg-dark text-cream px-8 py-4 rounded-full text-lg font-afacad font-semibold hover:bg-dark/90 transition-all hover:scale-105"
            >
              See My Portfolio
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default USP;
