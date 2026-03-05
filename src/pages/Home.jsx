import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import USP from '../components/USP';
import StaticShowcase from '../components/StaticShowcase';
import VideoShowcase from '../components/VideoShowcase';
import Testimonials from '../components/Testimonials';
import ServicesPreview from '../components/ServicesPreview';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <USP />
      <StaticShowcase />
      <VideoShowcase />
      <Testimonials />
      <ServicesPreview />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default Home;
