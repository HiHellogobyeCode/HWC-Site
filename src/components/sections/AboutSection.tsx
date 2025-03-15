import React from 'react';
import DotMatrixAccent from '../ui/DotMatrixAccent';
import { cn } from '@/lib/utils';
import { useData } from '@/context/DataContext';
import SkillRating from '../founder/SkillRating';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Cell from '../founder/Cell';
import IndustryMetrics from '../founder/IndustryMetrics';

const AboutSection: React.FC = () => {
  const { founderData } = useData();

  // Data for the efficiency chart
  const chartData = [
    { name: 'Manufacturing', value: 17.5, color: '#05B4FF' }, // cyan
    { name: 'Healthcare', value: 90, color: '#FF1CF7' },     // magenta
    { name: 'Finance', value: 20, color: '#FFE814' },        // yellow
    { name: 'Transport', value: 15, color: '#05B4FF' },      // cyan
    { name: 'Retail', value: 11, color: '#FF1CF7' },         // magenta
    { name: 'Agriculture', value: 15, color: '#FFE814' }     // yellow
  ];

  return (
    <section id="about" className="relative py-24 bg-black overflow-hidden">
      {/* Noise background */}
      <div className="absolute inset-0 noise-bg opacity-15"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column: About text */}
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 mb-2">
              <DotMatrixAccent color="yellow" size="sm" density="high" className="h-4 w-4" />
              <span className="text-xs font-mono uppercase tracking-wider text-gray-400">
                Meet {founderData.name}
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Consultant & Neuroscience Expert
            </h2>
            
            <p className="text-gray-300 text-lg leading-relaxed">
              {founderData.about}
            </p>
            
            <p className="text-gray-400 leading-relaxed">
              As CEO of Hello.World Consulting, Jonathan leverages a unique intersection of analytical prowess, technical expertise, and creative strategy, enabling clients to thrive in rapidly evolving digital landscapes.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="space-y-1">
                <div className="text-3xl font-bold text-dot-cyan">2022</div>
                <div className="text-sm text-gray-400">Year Founded</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-dot-magenta">50+</div>
                <div className="text-sm text-gray-400">Projects Completed</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-dot-yellow">20+</div>
                <div className="text-sm text-gray-400">Industry Partners</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-white">100%</div>
                <div className="text-sm text-gray-400">Client Satisfaction</div>
              </div>
            </div>
          </div>
          
          {/* Right column: Skills */}
          <div className="glass-card p-8 relative border border-gray-800 bg-black/40 backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-8 text-center">Expertise & Capabilities</h3>
            
            {/* Skills with star ratings */}
            <div className="space-y-6">
              {founderData.skills.slice(0, 6).map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">{skill.name}</span>
                    <SkillRating level={skill.level} color={skill.color} />
                  </div>
                  {skill.description && (
                    <p className="text-gray-500 text-xs">{skill.description}</p>
                  )}
                </div>
              ))}
            </div>
            
            {/* Accent matrix dots */}
            <div className="absolute -bottom-4 -right-4">
              <DotMatrixAccent color="magenta" size="md" />
            </div>
            <div className="absolute -top-4 -left-4">
              <DotMatrixAccent color="cyan" size="md" />
            </div>
          </div>
          <IndustryMetrics data={chartData} />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
