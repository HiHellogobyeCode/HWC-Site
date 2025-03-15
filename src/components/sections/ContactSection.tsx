
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import DotMatrixAccent from '../ui/DotMatrixAccent';
import { Button } from '@/components/ui/button';
import { Send, MapPin, Mail } from 'lucide-react';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="relative py-24 bg-gray-900 overflow-hidden">
      {/* Noise background */}
      <div className="absolute inset-0 noise-bg"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column: Contact Form */}
          <div>
            <div className="inline-flex items-center space-x-2 mb-2">
              <DotMatrixAccent color="cyan" size="sm" density="high" className="h-4 w-4" />
              <span className="text-xs font-mono uppercase tracking-wider text-gray-400">
                Get in Touch
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Contact Us
            </h2>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Ready to explore how Hello.World Consulting can elevate your business? Connect with Jonathan Reed and discover the difference tailored Internet & AI solutions can make.
            </p>
            
            <ContactForm />
          </div>
          
          {/* Right column: Contact Information */}
          <div className="space-y-6">
            <div className="glass-card p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-2 rounded-full bg-gray-800">
                  <MapPin size={20} className="text-dot-magenta" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Location</h4>
                  <p className="text-gray-400">Dallas, Texas<br/>United States</p>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-2 rounded-full bg-gray-800">
                  <Mail size={20} className="text-dot-cyan" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Email Us</h4>
                  <p className="text-gray-400">Respond within 24 hours</p>
                </div>
              </div>
              <a href="mailto:jonathanrayreed@gmail.com" className="text-dot-cyan hover:underline block">jonathanrayreed@gmail.com</a>
            </div>
            
            <div className="glass-card p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-2 rounded-full bg-gray-800">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-dot-yellow">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold">LinkedIn</h4>
                  <p className="text-gray-400">Connect with Jonathan</p>
                </div>
              </div>
              <a href="#" className="text-dot-yellow hover:underline block">Jonathan Reed</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactForm: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Reset form and set submission state
    setFormState({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
    setFormSubmitted(true);
    
    // Reset form submitted state after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 glass-card p-6 relative">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300">Your Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formState.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-gray-200 shadow-sm focus:border-dot-cyan focus:ring-dot-cyan sm:text-sm"
          placeholder="John Doe"
          required
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Your Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-gray-200 shadow-sm focus:border-dot-cyan focus:ring-dot-cyan sm:text-sm"
          placeholder="john.doe@example.com"
          required
        />
      </div>
      
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-300">Subject</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formState.subject}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-gray-200 shadow-sm focus:border-dot-cyan focus:ring-dot-cyan sm:text-sm"
          placeholder="Tell us about your project"
          required
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formState.message}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-gray-200 shadow-sm focus:border-dot-cyan focus:ring-dot-cyan sm:text-sm"
          placeholder="Your message here..."
          required
        />
      </div>
      
      <div className="flex justify-end">
        <Button 
          className="relative overflow-hidden group bg-dot-cyan hover:bg-dot-cyan/80 text-white"
          disabled={isSubmitting}
        >
          <span className="relative z-10 flex items-center gap-2">
            {isSubmitting ? 'Sending...' : 'Send Message'} 
            <Send size={16} className="transition-transform group-hover:translate-x-1" />
          </span>
        </Button>
      </div>
      
      {formSubmitted && (
        <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center rounded-md">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-green-500 mb-2">Message Sent!</h3>
            <p className="text-gray-400">Thank you for contacting us. We'll get back to you soon.</p>
          </div>
        </div>
      )}
    </form>
  );
};

export default ContactSection;
