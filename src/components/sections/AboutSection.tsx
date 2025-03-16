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
    <section id="about" className="relative py-24 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 mb-3">
            <DotMatrixAccent color="cyan" size="sm" density="high" className="h-4 w-4" />
            <span className="text-xs font-mono uppercase tracking-wider text-gray-400">
              About Us
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Our Story
          </h2>
          <p className="text-gray-300 text-lg">
            Hello.World Consulting was founded with a vision to transform businesses through innovative Internet and AI solutions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
