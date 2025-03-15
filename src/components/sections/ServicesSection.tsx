import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import DotMatrixAccent from '../ui/DotMatrixAccent';
import { Button } from '@/components/ui/button';

// Service data
const services = [
  {
    id: 1,
    title: "AI Integration & Optimization",
    description: "Harness the power of artificial intelligence with precision. We assess, develop, and integrate cutting-edge AI solutions specifically tailored to your organization's needs.",
    color: "cyan",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Strategic Digital Transformation",
    description: "Position your business at the forefront of the digital revolution with deep audits of your existing processes and creation of bespoke strategies.",
    color: "magenta",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Process Efficiency & Automation",
    description: "Eliminate redundancies and optimize workflow with intelligent automation. We use a neuroscience-informed analytical approach to enhance productivity.",
    color: "yellow",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Prompt Engineering",
    description: "Unlock the full potential of generative AI models with expert prompt engineering. Our nuanced understanding of language, cognition, and AI elevates the quality of AI-generated outcomes.",
    color: "cyan",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
  },
  {
    id: 5,
    title: "AI Red Teaming & Risk Management",
    description: "Proactively secure your AI deployments through advanced red-teaming methodologies designed to identify and mitigate vulnerabilities, biases, and ethical risks.",
    color: "magenta",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
];

const ServicesSection: React.FC = () => {
  const [activeService, setActiveService] = useState<number | null>(null);
  
  return (
    <section id="services" className="relative py-24 bg-gray-950">
      {/* Background elements */}
      <div className="absolute inset-0 dot-pattern opacity-5 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 mb-3">
            <DotMatrixAccent color="magenta" size="sm" density="high" className="h-4 w-4" />
            <span className="text-xs font-mono uppercase tracking-wider text-gray-400">
              Our Services
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Specialized Internet & AI Consulting
          </h2>
          <p className="text-gray-300 text-lg">
            From AI integration to prompt engineering, we offer comprehensive consulting services designed to transform your digital potential into reality.
          </p>
        </div>
        
        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service) => (
            <div
              key={service.id}
              className={cn(
                "glass-card p-6 relative transition-all duration-300 cursor-pointer group",
                activeService === service.id ? "ring-1" : "hover:translate-y-[-4px]",
                service.color === "cyan" ? "hover:ring-dot-cyan/30" : 
                service.color === "magenta" ? "hover:ring-dot-magenta/30" : 
                "hover:ring-dot-yellow/30"
              )}
              onMouseEnter={() => setActiveService(service.id)}
              onMouseLeave={() => setActiveService(null)}
            >
              {/* Accent dot */}
              <div className="absolute -top-2 -right-2">
                <DotMatrixAccent 
                  color={service.color as 'cyan' | 'magenta' | 'yellow'} 
                  size="sm" 
                  density="medium"
                  className="opacity-70 group-hover:opacity-100 transition-opacity duration-300" 
                />
              </div>
              
              {/* Icon */}
              <div className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors duration-300",
                service.color === "cyan" ? "text-dot-cyan" : 
                service.color === "magenta" ? "text-dot-magenta" : 
                "text-dot-yellow"
              )}>
                {service.icon}
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                {service.description}
              </p>
              
              {/* Bottom border accent */}
              <div className={cn(
                "absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 ease-out",
                service.color === "cyan" ? "bg-dot-cyan" : 
                service.color === "magenta" ? "bg-dot-magenta" : 
                "bg-dot-yellow"
              )}></div>
            </div>
          ))}
        </div>
        
        {/* CTA */}
        <div className="text-center">
          <a href="#contact" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
            Schedule a Consultation
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
