import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-near-black px-12 py-14">
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-12 items-center">
        {/* Logo */}
        <div>
          <div className="font-display text-[1.3rem] font-bold text-white tracking-[0.04em]">
            Annalise
          </div>
          <span className="block font-body text-[0.65rem] tracking-[0.2em] uppercase text-accent font-medium mt-[3px]">
            Marketing Strategist
          </span>
        </div>

        {/* Middle Links */}
        <div className="flex gap-12 justify-center">
          {/* Connect */}
          <div>
            <h4 className="text-[0.65rem] tracking-[0.2em] uppercase text-accent font-semibold mb-3">
              Connect
            </h4>
            <a
              href="mailto:hello@annalisemarketing.co"
              className="block text-[0.85rem] text-white/60 transition-colors hover:text-white leading-[1.9]"
            >
              hello@annaliseemarketing.co
            </a>
          </div>

          {/* Socials */}
          <div>
            <h4 className="text-[0.65rem] tracking-[0.2em] uppercase text-accent font-semibold mb-3">
              Socials
            </h4>
            <a
              href="#"
              className="block text-[0.85rem] text-white/60 transition-colors hover:text-white leading-[1.9]"
            >
              Instagram
            </a>
            <a
              href="#"
              className="block text-[0.85rem] text-white/60 transition-colors hover:text-white leading-[1.9]"
            >
              TikTok
            </a>
            <a
              href="#"
              className="block text-[0.85rem] text-white/60 transition-colors hover:text-white leading-[1.9]"
            >
              LinkedIn
            </a>
          </div>

          {/* Pages */}
          <div>
            <h4 className="text-[0.65rem] tracking-[0.2em] uppercase text-accent font-semibold mb-3">
              Pages
            </h4>
            <Link
              to="/"
              className="block text-[0.85rem] text-white/60 transition-colors hover:text-white leading-[1.9]"
            >
              Home
            </Link>
            <Link
              to="/portfolio"
              className="block text-[0.85rem] text-white/60 transition-colors hover:text-white leading-[1.9]"
            >
              Portfolio
            </Link>
            <Link
              to="/services"
              className="block text-[0.85rem] text-white/60 transition-colors hover:text-white leading-[1.9]"
            >
              Services
            </Link>
            <Link
              to="/blog"
              className="block text-[0.85rem] text-white/60 transition-colors hover:text-white leading-[1.9]"
            >
              Blog
            </Link>
            <Link
              to="/about"
              className="block text-[0.85rem] text-white/60 transition-colors hover:text-white leading-[1.9]"
            >
              About Me
            </Link>
          </div>
        </div>

        {/* Right CTA */}
        <div className="text-right">
          <a
            href="#contact"
            className="inline-block px-8 py-[14px] bg-accent text-near-black font-body font-semibold text-[0.82rem] tracking-[0.1em] uppercase rounded-[2px] transition-all hover:bg-accent-light hover:-translate-y-[1px]"
          >
            Hire Us
          </a>
        </div>

        {/* Copyright */}
        <p className="col-span-full mt-10 pt-6 border-t border-white/[0.08] text-[0.75rem] text-white/30 text-center tracking-[0.05em]">
          © 2025 Annalise Marketing. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
