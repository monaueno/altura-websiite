import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const brandStrips = [
  {
    name: 'BoostedSafe',
    logo: '/assets/Porfolio/brand-logos/boostedsafe.png',
    bgColor: '#ffd608',
    logoHeight: 'h-[116px]',
  },
  {
    name: 'Kaxi',
    logo: '/assets/Porfolio/brand-logos/kaxi.png',
    bgColor: '#f4efe4',
    logoHeight: 'h-[70px]',
  },
  {
    name: 'SALT',
    logo: '/assets/Porfolio/brand-logos/salt.png',
    bgColor: '#463d3a',
    logoHeight: 'h-[84px]',
  },
  {
    name: 'SoloPro Tax',
    logo: '/assets/Porfolio/brand-logos/solopro-tax.png',
    bgColor: '#1999a1',
    logoHeight: 'h-[58px]',
  },
  {
    name: 'Sunshine Buns',
    logo: '/assets/Porfolio/brand-logos/sunshine-buns.png',
    bgColor: '#ffde8d',
    logoHeight: 'h-[47px]',
  },
];

function Portfolio() {
  return (
    <div className="min-h-screen bg-portfolio-cream">
      <Navbar />

      {/* Hero / Header */}
      <section
        className="bg-portfolio-cream pt-48 pb-16 text-center"
      >
        <h1 className="font-display text-[50px] font-bold text-near-black leading-[1.05] uppercase">
          AD GALLERY
        </h1>
        <p className="font-subheading font-light text-[18px] text-near-black mt-4 max-w-[570px] mx-auto leading-[1.25]">
          Explore the ads we've created for brands we've partnered with.
        </p>
      </section>

      {/* Brand Logo Strips */}
      <section className="flex flex-col">
        {brandStrips.map((brand) => (
          <div
            key={brand.name}
            className="w-full h-[140px] flex items-center justify-center"
            style={{ backgroundColor: brand.bgColor }}
          >
            <img
              src={brand.logo}
              alt={brand.name}
              className={`${brand.logoHeight} w-auto object-contain`}
            />
          </div>
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
