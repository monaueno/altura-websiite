import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Testimonials from '../components/Testimonials';
import StaticShowcase from '../components/StaticShowcase';
import ServicesPreview from '../components/ServicesPreview';
import Footer from '../components/Footer';

function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Testimonials />
      <StaticShowcase />
      <ServicesPreview />
      <Footer />
    </div>
  );
}

export default Home;
