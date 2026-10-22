import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, Code2, Send } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const NAV_LINKS = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/about' },
  { name: 'Skills', to: '/skills' },
  { name: 'Projects', to: '/projects' },
  { name: 'Experience', to: '/experience' },
  { name: 'Contact', to: '/contact' },
];

export const Navbar = ({ profileName = 'Nehal Mittal' }) => {
  const { isDark, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active link: exact match for '/', startsWith for others
  const isActive = (to) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname.startsWith(to);
  };

  // Scroll shadow effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Handle escape key and body scroll lock for mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? isDark
            ? 'bg-[#111411]/92 backdrop-blur-md border-b border-[#242c24] shadow-lg shadow-black/30 py-2.5 sm:py-3'
            : 'bg-[#f8f9f6]/95 backdrop-blur-md border-b border-[#e2e6df] shadow-sm py-2.5 sm:py-3'
          : isDark
          ? 'bg-[#111411]/80 backdrop-blur-sm border-b border-[#242c24]/50 shadow-sm py-3.5 sm:py-4'
          : 'bg-[#f8f9f6]/85 backdrop-blur-sm border-b border-[#e2e6df]/70 shadow-xs py-3.5 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left Side: Logo / Brand Name */}
          <Link
            to="/"
            className="flex items-center gap-3 group text-decoration-none focus-ring rounded-xl p-1 -ml-1 transition-opacity hover:opacity-90"
            aria-label={`${profileName} - Return to home`}
          >
            <div
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${
                isDark
                  ? 'bg-[#181f18] text-[#a5c9af] border border-[#a5c9af]/30 shadow-sm shadow-[#a5c9af]/10 group-hover:border-[#a5c9af]/60'
                  : 'bg-[#edf2ea] text-[#3e6149] border border-[#3e6149]/25 shadow-sm group-hover:border-[#3e6149]/50'
              }`}
            >
              <Code2 className="w-5 h-5 transition-transform duration-300 group-hover:rotate-6" />
            </div>
            <div className="flex flex-col text-left">
              <span
                className={`font-bold text-base sm:text-lg tracking-tight transition-colors ${
                  isDark ? 'text-[#f4f5f2] group-hover:text-[#a5c9af]' : 'text-[#182018] group-hover:text-[#3e6149]'
                }`}
              >
                {profileName}
              </span>
              <span className={`text-[10px] font-mono uppercase tracking-wider ${isDark ? 'text-[#8e958d]' : 'text-[#5a625a]'}`}>
                Software Developer &bull; ML
              </span>
            </div>
          </Link>

          {/* Right Side: Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            <nav className="flex items-center gap-1" aria-label="Main Navigation">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.to);
                return (
                  <Link
                    key={link.name}
                    to={link.to}
                    aria-current={active ? 'page' : undefined}
                    className={`relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 focus-ring cursor-pointer select-none ${
                      active
                        ? isDark
                          ? 'text-[#a5c9af] bg-[#a5c9af]/12 font-semibold border border-[#a5c9af]/30 shadow-xs'
                          : 'text-[#3e6149] bg-[#3e6149]/10 font-semibold border border-[#3e6149]/20 shadow-xs'
                        : isDark
                        ? 'text-[#9ea69d] hover:text-[#f4f5f2] hover:bg-[#1b221b]/80 border border-transparent'
                        : 'text-[#4e584e] hover:text-[#182018] hover:bg-black/5 border border-transparent'
                    }`}
                  >
                    {link.name}
                    {active && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className={`absolute bottom-0 left-3 right-3 h-0.5 rounded-full ${
                          isDark ? 'bg-[#a5c9af]' : 'bg-[#3e6149]'
                        }`}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Divider */}
            <div className={`h-5 w-px mx-1 ${isDark ? 'bg-[#242c24]' : 'bg-[#e2e6df]'}`} />

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              className={`p-2.5 rounded-xl transition-all duration-200 cursor-pointer focus-ring btn-tactile ${
                isDark
                  ? 'bg-[#181d18] text-[#a5c9af] hover:bg-[#202720] border border-[#283228] shadow-xs'
                  : 'bg-[#f0f3ee] text-[#3e6149] hover:bg-[#e4eae0] border border-[#d6ddd3] shadow-xs'
              }`}
              title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Quick Contact CTA */}
            <Link
              to="/contact"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer focus-ring btn-tactile ml-1 ${
                isDark
                  ? 'bg-[#a5c9af] text-[#111411] hover:bg-[#b8d6bf] shadow-sm shadow-[#a5c9af]/15'
                  : 'bg-[#3e6149] text-white hover:bg-[#34523e] shadow-sm'
              }`}
            >
              <span>Get in Touch</span>
              <Send className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Right Controls: Theme Toggle & Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              className={`p-2 rounded-xl transition-colors focus-ring cursor-pointer ${
                isDark
                  ? 'bg-[#181d18] text-[#a5c9af] border border-[#283228]'
                  : 'bg-[#f0f3ee] text-[#3e6149] border border-[#d6ddd3]'
              }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              className={`p-2 rounded-xl transition-colors focus-ring cursor-pointer ${
                isDark
                  ? 'text-[#f4f5f2] bg-[#181d18] border border-[#283228] hover:bg-[#202720]'
                  : 'text-[#182018] bg-[#f0f3ee] border border-[#d6ddd3] hover:bg-[#e4eae0]'
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer with Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-[60px] sm:top-[68px] bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Menu Drawer */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`relative z-50 md:hidden border-b px-4 py-5 shadow-2xl ${
                isDark
                  ? 'bg-[#141814]/98 backdrop-blur-md border-[#242c24] text-[#f4f5f2]'
                  : 'bg-white/98 backdrop-blur-md border-[#e2e6df] text-[#182018]'
              }`}
            >
              <div className="flex flex-col gap-1.5 max-w-md mx-auto">
                {NAV_LINKS.map((link) => {
                  const active = isActive(link.to);
                  return (
                    <Link
                      key={link.name}
                      to={link.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-left px-4 py-3 rounded-xl text-base font-medium transition-colors focus-ring cursor-pointer flex items-center justify-between ${
                        active
                          ? isDark
                            ? 'bg-[#a5c9af]/12 text-[#a5c9af] font-semibold border border-[#a5c9af]/30'
                            : 'bg-[#3e6149]/10 text-[#3e6149] font-semibold border border-[#3e6149]/20'
                          : isDark
                          ? 'text-[#9ea69d] hover:bg-[#1c221c] hover:text-[#f4f5f2]'
                          : 'text-[#4e584e] hover:bg-[#f4f7f2] hover:text-[#182018]'
                      }`}
                    >
                      <span>{link.name}</span>
                      {active && (
                        <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-[#a5c9af]' : 'bg-[#3e6149]'}`} />
                      )}
                    </Link>
                  );
                })}

                <div className={`pt-3 mt-2 border-t ${isDark ? 'border-[#242c24]' : 'border-[#e2e6df]'}`}>
                  <Link
                    to="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold btn-tactile cursor-pointer focus-ring ${
                      isDark
                        ? 'bg-[#a5c9af] text-[#111411] hover:bg-[#b8d6bf]'
                        : 'bg-[#3e6149] text-white hover:bg-[#34523e]'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                    <span>Contact Me Directly</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
