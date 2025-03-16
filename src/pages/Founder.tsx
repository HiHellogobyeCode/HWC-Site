import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DotMatrixAccent from '@/components/ui/DotMatrixAccent';
import { Button } from '@/components/ui/button';
import { 
  Download, Mail, Linkedin, Calendar, MapPin, 
  GraduationCap, Award, Briefcase
} from 'lucide-react';
import { cn } from '@/lib/utils';
import InteractiveBackground from '@/components/ui/InteractiveBackground';
import { useData } from '@/context/DataContext';
import SkillRating from '@/components/founder/SkillRating';

const Founder = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { founderData } = useData();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'founder_cv.pdf';
    link.click();
  };

  const handleContact = () => {
    navigator.clipboard.writeText(founderData?.email || '');
    alert('Email copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-black relative">
      <Navbar />
      
      <InteractiveBackground />
      
      <main className="pt-20 pb-16 relative z-10">
        <div className="container mx-auto px-4">
          <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="inline-flex items-center space-x-2 mb-4">
              <DotMatrixAccent color="magenta" size="sm" density="high" className="h-4 w-4" />
              <span className="text-xs font-mono uppercase tracking-wider text-gray-400">
                Founder Resume
              </span>
            </div>
          </header>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
            <div>
              <h1 className={cn("text-4xl md:text-5xl font-bold tracking-tight",
                isLoaded ? "animate-fade-in" : "opacity-0")}>
                {founderData?.name}
              </h1>
              
              <h2 className={cn("text-xl text-gray-400 mt-2",
                isLoaded ? "animate-fade-in animate-reveal-delay-1" : "opacity-0")}>
                {founderData?.position}
              </h2>
            </div>
            
            <div className={cn("flex gap-3",
              isLoaded ? "animate-fade-in animate-reveal-delay-2" : "opacity-0")}>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2 bg-transparent border-gray-800 hover:bg-gray-900 text-white"
                onClick={handleDownloadCV}
              >
                <Download size={16} />
                Download CV
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2 bg-transparent border-gray-800 hover:bg-gray-900 text-white"
                onClick={handleContact}
              >
                <Mail size={16} />
                Contact
              </Button>
            </div>
          </div>
          
          <div className={cn("flex flex-wrap gap-4 mt-4 text-sm text-gray-400 mb-8",
            isLoaded ? "animate-fade-in animate-reveal-delay-1" : "opacity-0")}>
            <div className="flex items-center gap-1">
              <Mail size={14} className="text-dot-cyan" />
              <span>{founderData?.email}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={14} className="text-dot-magenta" />
              <span>{founderData?.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Linkedin size={14} className="text-dot-cyan" />
              <a 
                href="https://www.linkedin.com/in/jonathanrreed0" 
                className="hover:text-white transition-colors duration-200"
              >
                {founderData?.linkedin}
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-10">
              <section className={cn("glass-card p-6 transition-all duration-700 bg-black/60 border border-gray-900",
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="text-dot-cyan mr-2">About</span>
                  <div className="h-px bg-gray-900 flex-grow ml-2"></div>
                </h3>
                
                <p className="text-gray-300 leading-relaxed">
                  {founderData?.about}
                </p>
              </section>
              
              <section className={cn("glass-card p-6 transition-all duration-700 delay-100 bg-black/60 border border-gray-900",
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <span className="text-dot-magenta mr-2">Experience</span>
                  <div className="h-px bg-gray-900 flex-grow ml-2"></div>
                </h3>
                
                <div className="space-y-8">
                  {founderData?.experience?.map((job, index) => (
                    <div key={index} className="relative pl-6 border-l border-gray-800">
                      <div className="absolute w-3 h-3 bg-dot-magenta rounded-full -left-1.5 top-1.5"></div>
                      <div className="mb-1 flex justify-between">
                        <h4 className="font-semibold text-white">{job.title}</h4>
                        <div className="text-sm text-gray-400 flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{job.period}</span>
                        </div>
                      </div>
                      <div className="text-gray-400 text-sm mb-2">
                        {job.company} • {job.location}
                      </div>
                      <p className="text-gray-300 text-sm mb-2">
                        {job.description}
                      </p>
                      {job.bulletPoints && job.bulletPoints.length > 0 && (
                        <ul className="text-gray-300 text-sm space-y-1 list-disc pl-4">
                          {job.bulletPoints.map((bullet, i) => (
                            <li key={i}>{bullet}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
              
              <section className={cn("glass-card p-6 transition-all duration-700 delay-200 bg-black/60 border border-gray-900",
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <span className="text-dot-yellow mr-2">Education</span>
                  <div className="h-px bg-gray-900 flex-grow ml-2"></div>
                </h3>
                
                <div className="space-y-6">
                  {founderData?.education?.map((edu, index) => (
                    <div key={index} className="relative pl-6 border-l border-gray-800">
                      <div className="absolute w-3 h-3 bg-dot-yellow rounded-full -left-1.5 top-1.5"></div>
                      <div className="mb-1 flex justify-between">
                        <h4 className="font-semibold text-white">{edu.degree}</h4>
                        <div className="text-sm text-gray-400 flex items-center gap-1">
                          <GraduationCap size={14} />
                          <span>{edu.year}</span>
                        </div>
                      </div>
                      <div className="text-gray-400 text-sm mb-2">
                        {edu.institution}
                      </div>
                      <p className="text-gray-300 text-sm mb-2">
                        {edu.description}
                      </p>
                      {edu.bulletPoints && edu.bulletPoints.length > 0 && (
                        <ul className="text-gray-300 text-sm space-y-1 list-disc pl-4">
                          {edu.bulletPoints.map((bullet, i) => (
                            <li key={i}>{bullet}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </div>
            
            <div className="space-y-8">
              <section className={cn("glass-card p-6 transition-all duration-700 delay-200 bg-black/60 border border-gray-900",
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="text-dot-cyan mr-2">Skills & Core Competencies</span>
                  <div className="h-px bg-gray-900 flex-grow ml-2"></div>
                </h3>
                
                <div className="space-y-4">
                  {founderData?.skills?.map((skill, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">{skill.name}</span>
                        <SkillRating 
                          level={skill.level} 
                          color={skill.color} 
                        />
                      </div>
                      {skill.description && (
                        <p className="text-gray-500 text-xs">{skill.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
              
              <section className={cn("glass-card p-6 transition-all duration-700 delay-300 bg-black/60 border border-gray-900",
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="text-dot-magenta mr-2">Achievements</span>
                  <div className="h-px bg-gray-900 flex-grow ml-2"></div>
                </h3>
                
                <div className="space-y-4">
                  {[
                    'Grayswan arena winner (Red teaming challenge)',
                    'Early academic, helped red team & test the original GPT-3 pre-release',
                    'Pioneered neuroscience-based approaches to AI prompt engineering',
                    'Specialist in AI red teaming and risk assessment methodologies'
                  ].map((achievement, index) => (
                    <div key={index} className="flex gap-2 items-start">
                      <Award size={16} className="text-dot-yellow flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{achievement}</span>
                    </div>
                  ))}
                </div>
              </section>
              
              <section className={cn("glass-card p-6 transition-all duration-700 delay-300 bg-black/60 border border-gray-900",
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="text-dot-yellow mr-2">Languages</span>
                  <div className="h-px bg-gray-900 flex-grow ml-2"></div>
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: 'English', level: 'Native' },
                    { name: 'Spanish', level: 'Proficient' },
                    { name: 'Python', level: 'Expert' },
                    { name: 'CSS', level: 'Advanced' },
                  ].map((language, index) => (
                    <div key={index} className="flex flex-col text-sm">
                      <span className="text-white font-medium">{language.name}</span>
                      <span className="text-gray-400 text-xs">{language.level}</span>
                    </div>
                  ))}
                </div>
              </section>
              
              {founderData?.interests && founderData.interests.length > 0 && (
                <section className={cn("glass-card p-6 transition-all duration-700 delay-300 bg-black/60 border border-gray-900",
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <span className="text-dot-magenta mr-2">Interests</span>
                    <div className="h-px bg-gray-900 flex-grow ml-2"></div>
                  </h3>
                  
                  <div className="space-y-4">
                    {founderData.interests.map((interest, index) => (
                      <div key={index} className="space-y-1">
                        <div className="text-white font-medium">{interest.name}</div>
                        <p className="text-gray-400 text-sm">{interest.description}</p>
                      </div>
                    ))}
                    <div className="space-y-1">
                      <div className="text-white font-medium">Emergency Medicine</div>
                      <p className="text-gray-400 text-sm">Advocate for Pre-hospital medicine</p>
                      <p className="text-gray-400 text-sm">Certified EMT-B</p>
                      <p className="text-gray-400 text-sm">Specialty in psychiatric patient care</p>
                    </div>
                  </div>
                </section>
              )}
              
              <section className={cn("glass-card p-6 transition-all duration-700 delay-400 bg-black/60 border border-gray-900",
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="text-dot-cyan mr-2">Enterprise Solutions</span>
                  <div className="h-px bg-gray-900 flex-grow ml-2"></div>
                </h3>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    'OpenAI',
                    'Anthropic',
                    'Google',
                    'Perplexity',
                    'DeepSeek',
                    'Groq',
                  ].map((client, index) => (
                    <div key={index} className="flex gap-2 items-start">
                      <Briefcase size={14} className="text-dot-magenta flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{client}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Founder;
