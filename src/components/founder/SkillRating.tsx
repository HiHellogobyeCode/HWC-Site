import React from 'react';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

interface SkillRatingProps {
  level: number;
  maxLevel?: number;
  color?: 'cyan' | 'magenta' | 'yellow';
}

const SkillRating: React.FC<SkillRatingProps> = ({ 
  level, 
  maxLevel = 5,
  color = 'cyan'
}) => {
  const colorClass = {
    cyan: 'text-dot-cyan',
    magenta: 'text-dot-magenta',
    yellow: 'text-dot-yellow'
  }[color];

  return (
    <div className="flex items-center gap-1">
      <Star size={16} className={cn("shrink-0", colorClass)} />
    </div>
  );
};

export default SkillRating;
