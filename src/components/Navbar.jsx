import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/95 backdrop-blur-sm border-b border-cream/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-geologica font-bold text-cream hover:text-accent transition-colors">
          Annalise
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-8">
          <Link to="/services" className="text-cream hover:text-accent transition-colors font-afacad">
            Services
          </Link>
          <Link to="/portfolio" className="text-cream hover:text-accent transition-colors font-afacad">
            Portfolio
          </Link>
          <Link to="/about" className="text-cream hover:text-accent transition-colors font-afacad">
            About Me
          </Link>
          <Link to="/blog" className="text-cream hover:text-accent transition-colors font-afacad">
            Blog
          </Link>
          <a
            href="#contact"
            className="bg-accent text-dark px-6 py-2 rounded-full hover:bg-accent/90 transition-all font-afacad font-semibold"
          >
            Let's Chat
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
