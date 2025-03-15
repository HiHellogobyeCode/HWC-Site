import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import DotMatrixAccent from '../ui/DotMatrixAccent';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const finalText = 'Empowering Businesses with Intelligent Solutions.';
  const heroVisualRef = useRef<HTMLDivElement>(null);

  // Simulate typing effect
  useEffect(() => {
    setIsLoaded(true);
    
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= finalText.length) {
        setTypedText(finalText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 40);
    
    // Cursor blinking effect
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    
    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  // Add mouse movement effect for the hero visual
  useEffect(() => {
    if (!heroVisualRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroVisualRef.current) return;
      
      const elem = heroVisualRef.current;
      const { left, top, width, height } = elem.getBoundingClientRect();
      
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const moveX = (e.clientX - centerX) / 20;
      const moveY = (e.clientY - centerY) / 20;
      
      elem.style.transform = `translate(${moveX}px, ${moveY}px)`;
      
      // Update dot positions for a more dynamic effect
      const dots = elem.querySelectorAll('.dot-element');
      dots.forEach((dot, index) => {
        const factor = (index % 3) + 1;
        const dotElem = dot as HTMLElement;
        dotElem.style.transform = `translate(${moveX * factor * 0.5}px, ${moveY * factor * 0.5}px)`;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-16">
      {/* Subtle background grid */}
      <div className="absolute inset-0 dot-pattern opacity-5 z-0"></div>
      
      {/* Floating dot matrix accents */}
      <div className="absolute top-1/4 right-[5%] opacity-60 z-10 hidden md:block dot-element">
        <DotMatrixAccent color="cyan" size="lg" density="low" />
      </div>
      <div className="absolute bottom-1/4 left-[5%] opacity-60 z-10 hidden md:block dot-element">
        <DotMatrixAccent color="yellow" size="md" density="medium" />
      </div>
      <div className="absolute top-1/3 left-1/5 opacity-40 z-10 hidden lg:block dot-element">
        <DotMatrixAccent color="magenta" size="sm" density="high" />
      </div>
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Hero Text Content */}
          <div className="space-y-8">
            <div 
              className={cn(
                "transition-opacity duration-1000 ease-in-out",
                isLoaded ? "opacity-100" : "opacity-0"
              )}
            >
              <div className="inline-flex items-center space-x-3 mb-4 px-3 py-1 bg-gray-900/60 backdrop-blur-sm rounded-full">
                <DotMatrixAccent color="cyan" size="sm" density="high" className="h-4 w-4" />
                <span className="text-xs font-mono tracking-wide text-gray-400">Hello.World Consulting</span>
              </div>
            </div>
            
            <h1 
              className={cn(
                "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight",
                isLoaded ? "animate-fade-in" : "opacity-0"
              )}
            >
              <span>{typedText}</span>
              <span className={cursorVisible ? "opacity-100" : "opacity-0"}>|</span>
            </h1>
            
            <p 
              className={cn(
                "text-gray-300 text-lg max-w-lg transition-all duration-1000 ease-in-out",
                isLoaded ? "animate-fade-in animate-reveal-delay-1" : "opacity-0"
              )}
            >
              Specialized Internet & AI consulting designed to transform your digital potential into reality.
            </p>
            
            <div 
              className={cn(
                "flex flex-wrap gap-4 transition-all duration-1000 ease-in-out pt-4",
                isLoaded ? "animate-fade-in animate-reveal-delay-2" : "opacity-0"
              )}
            >
              <Button 
                variant="default" 
                className="bg-dot-cyan hover:bg-dot-cyan/80 text-gray-900 font-medium group"
                onClick={() => {
                  const servicesSection = document.getElementById('services');
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <span className="flex items-center gap-2">
                  Discover Our Services
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
              <Button 
                variant="outline"
                className="border-gray-700 hover:bg-gray-800 hover:border-gray-600"
                onClick={() => {
                  if (window.location.pathname !== '/') {
                    window.location.href = '/#charts-section';
                  } else {
                    const chartsSection = document.getElementById('charts-section');
                    if (chartsSection) {
                      chartsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
              >
                Learn More
              </Button>
            </div>
          </div>
          
          {/* Hero Visual - Now showing company logo */}
          <div 
            ref={heroVisualRef}
            className={cn(
              "relative transition-all duration-1000 ease-in-out will-change-transform",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <div className="aspect-square max-w-lg mx-auto glass-card p-8 relative overflow-hidden retro-glow flex items-center justify-center">
              {/* Logo background */}
              <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)]">
                {Array.from({ length: 400 }).map((_, i) => (
                  <div
                    key={i}
                    className="relative dot-element"
                    style={{
                      opacity: Math.random() > 0.8 ? 0.3 : 0,
                      backgroundColor: 
                        i % 27 === 0 ? 'rgba(34, 211, 238, 0.2)' : 
                        i % 41 === 0 ? 'rgba(232, 121, 249, 0.15)' : 
                        i % 53 === 0 ? 'rgba(250, 204, 21, 0.15)' : 
                        'transparent'
                    }}
                  />
                ))}
              </div>
              
              {/* Accent elements */}
              <div className="absolute top-10 right-10 dot-element">
                <DotMatrixAccent color="magenta" size="lg" density="low" />
              </div>
              <div className="absolute bottom-10 left-10 dot-element">
                <DotMatrixAccent color="yellow" size="md" density="high" />
              </div>
              
              {/* Company Logo */}
              <img 
                src="/Logo.svg" 
                alt="Hello.World Consulting Logo" 
                className="w-[80%] h-auto relative z-10 dot-element"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
