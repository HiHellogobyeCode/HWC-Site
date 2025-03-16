import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import DotMatrixAccent from '../ui/DotMatrixAccent';
import { Button } from '../ui/button';
import { Menu, X, ChevronUp } from 'lucide-react';

const debounce = <T extends unknown[]>(fn: (...args: T) => void, delay: number) => {
  let timeoutId: number;
  return (...args: T) => {
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => fn(...args), delay);
  };
};

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = debounce(() => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    }, 100);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = debounce(() => {
      setIsScrolled(window.scrollY > 10);
      setShowBackToTop(window.scrollY > 300);
    }, 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/#services' },
    { name: 'Info', href: '/#charts-section' },
    { name: 'Founder', href: '/founder' },
    { name: 'Contact', href: '/#contact' },
  ];

  const handleNavLinkClick = (e: React.MouseEvent, href: string) => {
    // If we're not on the home page and the link is an anchor link
    if (location.pathname !== '/' && href.startsWith('#')) {
      e.preventDefault();
      // Navigate to home page with the hash
      window.location.href = '/' + href;
      setIsMobileMenuOpen(false);
    } else if (href.startsWith('/#')) {
      // If we're on another page and href is for homepage with anchor
      e.preventDefault();
      window.location.href = href;
      setIsMobileMenuOpen(false);
    } else if (href === '/' && location.pathname === '/') {
      // If we're already on home and clicking home link
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    } else {
      // Normal navigation for non-anchor links
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-1 px-4 md:px-8",
        isScrolled ? "bg-gray-950/80 backdrop-blur-md shadow-md" : "bg-transparent"
      )}>
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <DotMatrixAccent 
                color="magenta" 
                size="sm" 
                density="medium" 
                className="absolute -top-2 -left-2 opacity-70 transition-opacity duration-300 group-hover:opacity-100" 
              />
              <div className="w-8 h-8 border border-gray-700 rounded relative overflow-hidden group-hover:border-gray-600 transition-colors duration-300">
                <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                  <img 
                    src="/Logo.svg" 
                    alt="Hello.World Logo" 
                    className="w-6 h-6 object-contain"
                  />
                </div>
              </div>
            </div>
            <span className="text-lg font-semibold tracking-tight">
              Hello.World<span className="text-dot-cyan animate-dot-flash">.</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.href.includes('#') && link.href !== '/' ? (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => handleNavLinkClick(e, link.href)}
                  className="text-gray-300 hover:text-white text-sm tracking-wide transition-colors duration-200 relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-dot-cyan group-hover:w-full transition-all duration-300 ease-out"></span>
                </a>
              ) : (
                <Link 
                  key={link.name} 
                  to={link.href}
                  onClick={(e) => {
                    if (link.href === '/') {
                      handleNavLinkClick(e, link.href);
                    }
                  }}
                  className="text-gray-300 hover:text-white text-sm tracking-wide transition-colors duration-200 relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-dot-cyan group-hover:w-full transition-all duration-300 ease-out"></span>
                </Link>
              )
            ))}
          </nav>
          
          {/* CTA Button (Desktop) */}
          <div className="hidden md:block">
            <Button 
              variant="outline" 
              className="bg-dot-cyan bg-opacity-10 border-dot-cyan text-white hover:bg-dot-cyan hover:bg-opacity-20"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Get Started
            </Button>
          </div>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-gray-300 hover:text-white p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div 
          className={cn(
            "fixed inset-0 bg-gray-950/95 backdrop-blur-sm z-40 pt-24 px-6 transition-all duration-300 ease-in-out md:hidden",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
          style={{ willChange: 'transform' }}
        >
          <nav className="flex flex-col space-y-6 items-center">
            {navLinks.map((link) => (
              link.href.includes('#') && link.href !== '/' ? (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => handleNavLinkClick(e, link.href)}
                  className="text-gray-200 hover:text-white text-xl font-medium tracking-wide transition-colors duration-200 py-3"
                >
                  {link.name}
                </a>
              ) : (
                <Link 
                  key={link.name} 
                  to={link.href}
                  onClick={(e) => {
                    if (link.href === '/') {
                      handleNavLinkClick(e, link.href);
                    } else {
                      setIsMobileMenuOpen(false);
                    }
                  }}
                  className="text-gray-200 hover:text-white text-xl font-medium tracking-wide transition-colors duration-200 py-3"
                >
                  {link.name}
                </Link>
              )
            ))}
            <Button 
              variant="outline" 
              className="w-full max-w-xs bg-dot-cyan bg-opacity-10 border-dot-cyan text-white hover:bg-dot-cyan hover:bg-opacity-20 mt-8 py-6 text-lg"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
                setIsMobileMenuOpen(false);
              }}
            >
              Get Started
            </Button>
          </nav>
        </div>
      </header>
      {showBackToTop && (
        <button
          onClick={handleScrollToTop}
          className="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-dot-cyan/90 backdrop-blur-md shadow-lg md:hidden active:scale-95 transition-transform"
          aria-label="Scroll to top"
        >
          <ChevronUp size={20} className="text-white" />
        </button>
      )}
    </>
  );
};

export default Navbar;
