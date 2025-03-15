import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ContactSection from '@/components/sections/ContactSection';
import InteractiveBackground from '@/components/ui/InteractiveBackground';
import HelloWorldDashboard from '@/components/Dashboard/HelloWorldDashboard';

const Index = () => {
  // Handle smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const href = target.closest('a')?.getAttribute('href');
      
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        const targetId = href.substring(1);
        const element = document.getElementById(targetId);
        
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 80, // Adjust for navbar height
            behavior: 'smooth'
          });
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-950 relative">
      {/* Add interactive background */}
      <InteractiveBackground />
      
      <Navbar />
      
      <main className="relative z-10">
        <HeroSection />
        <ServicesSection />
        <div style={{ backgroundColor: '#000000', padding: '2rem 0' }}>
          <HelloWorldDashboard />
        </div>
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
