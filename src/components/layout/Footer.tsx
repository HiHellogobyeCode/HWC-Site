import React from 'react';
import DotMatrixAccent from '../ui/DotMatrixAccent';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gray-950 border-t border-gray-900 py-12 overflow-hidden">
      {/* Background dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-5 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <DotMatrixAccent 
                  color="magenta" 
                  size="sm" 
                  density="medium" 
                  className="absolute -top-2 -left-2 opacity-70" 
                />
                <div className="w-8 h-8 border border-gray-700 rounded relative overflow-hidden flex items-center justify-center">
                  <img 
                    src="/Logo.svg" 
                    alt="Hello.World Logo" 
                    className="w-6 h-6 object-contain"
                  />
                </div>
              </div>
              <span className="text-lg font-semibold tracking-tight">
                Hello.World<span className="text-dot-cyan animate-dot-flash">.</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Specialized Internet & AI consulting designed to transform your digital potential into reality.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-medium text-sm tracking-widest uppercase">Navigation</h4>
            <div className="grid grid-cols-2 gap-2">
              {["Services", "About", "Founder", "Contact"].map((link) => (
                <a 
                  key={link} 
                  href={link === "Founder" ? "/founder" : `#${link.toLowerCase()}`} 
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
          
          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-white font-medium text-sm tracking-widest uppercase">Contact</h4>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">jonathanrayreed@gmail.com</p>
              <p className="text-gray-400 text-sm">Dallas, TX<br />United States</p>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            {currentYear} Hello.World Consulting. All rights reserved.
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a 
              key="LinkedIn" 
              href="https://www.linkedin.com/in/jonathanrreed0" 
              className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
