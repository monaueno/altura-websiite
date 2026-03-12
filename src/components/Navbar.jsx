import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-12 py-5 transition-all duration-400 ${
        scrolled ? 'bg-near-black/92 backdrop-blur-[12px]' : 'bg-transparent'
      }`}
    >
      {/* Logo */}
      <Link
        to="/"
        className="font-display text-[1.4rem] font-bold text-white tracking-[0.04em]"
      >
        Annalise
      </Link>

      {/* Nav Links */}
      <ul className="flex items-center gap-9 list-none">
        <li>
          <Link
            to="/"
            className="text-white/85 text-[0.82rem] font-medium tracking-[0.1em] uppercase transition-colors hover:text-accent"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/portfolio"
            className="text-white/85 text-[0.82rem] font-medium tracking-[0.1em] uppercase transition-colors hover:text-accent"
          >
            Portfolio
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className="text-white/85 text-[0.82rem] font-medium tracking-[0.1em] uppercase transition-colors hover:text-accent"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="/services"
            className="text-white/85 text-[0.82rem] font-medium tracking-[0.1em] uppercase transition-colors hover:text-accent"
          >
            Services
          </Link>
        </li>
        <li>
          <Link
            to="/blog"
            className="text-white/85 text-[0.82rem] font-medium tracking-[0.1em] uppercase transition-colors hover:text-accent"
          >
            Blog
          </Link>
        </li>
        <li>
          <a
            href="#contact"
            className="bg-accent text-near-black px-[22px] py-[10px] rounded-[2px] font-semibold text-[0.82rem] tracking-[0.08em] uppercase transition-all hover:bg-accent-light"
          >
            Let's Chat
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
