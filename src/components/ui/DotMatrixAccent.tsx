
import React, { useEffect, useState, useRef } from 'react';

type DotMatrixAccentProps = {
  color?: 'cyan' | 'magenta' | 'yellow';
  size?: 'sm' | 'md' | 'lg';
  density?: 'low' | 'medium' | 'high';
  className?: string;
  interactive?: boolean;
};

const DotMatrixAccent: React.FC<DotMatrixAccentProps> = ({
  color = 'cyan',
  size = 'md',
  density = 'medium',
  className = '',
  interactive = false,
}) => {
  // Colors based on props
  const colorClass = {
    cyan: 'bg-dot-cyan',
    magenta: 'bg-dot-magenta',
    yellow: 'bg-dot-yellow',
  }[color];
  
  // Grid size based on density
  const gridSize = {
    low: 4,
    medium: 5,
    high: 6,
  }[density];
  
  // Spacing based on density
  const gridGap = {
    low: 'gap-2',
    medium: 'gap-1.5',
    high: 'gap-1',
  }[density];
  
  // Dot size based on size prop
  const dotSize = {
    sm: 'w-1 h-1',
    md: 'w-1.5 h-1.5',
    lg: 'w-2 h-2',
  }[size];

  // Create matrix state with random opacity values
  const [matrix, setMatrix] = useState<number[][]>([]);
  const dotMatrixRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Initialize matrix with random values
    const newMatrix = Array(gridSize).fill(0).map(() => 
      Array(gridSize).fill(0).map(() => Math.random() < 0.7 ? 1 : 0)
    );
    setMatrix(newMatrix);
    
    // Update random dots periodically
    const interval = setInterval(() => {
      setMatrix(prev => {
        const updated = [...prev];
        // Randomly update some dots
        for (let i = 0; i < 2; i++) {
          const x = Math.floor(Math.random() * gridSize);
          const y = Math.floor(Math.random() * gridSize);
          updated[x][y] = updated[x][y] ? 0 : 1;
        }
        return updated;
      });
    }, 800);
    
    // Add mouse interaction if interactive
    if (interactive && dotMatrixRef.current) {
      const element = dotMatrixRef.current;
      
      const handleMouseMove = (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Update dots near mouse
        setMatrix(prev => {
          const updated = [...prev.map(row => [...row])];
          
          for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
              // Calculate dot position
              const dotX = (i * rect.width) / gridSize + rect.width / (gridSize * 2);
              const dotY = (j * rect.height) / gridSize + rect.height / (gridSize * 2);
              
              // Calculate distance from mouse
              const dx = dotX - x;
              const dy = dotY - y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              // If mouse is near, activate dot
              if (distance < 20) {
                updated[i][j] = 1;
              }
            }
          }
          
          return updated;
        });
      };
      
      element.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        clearInterval(interval);
        element.removeEventListener('mousemove', handleMouseMove);
      };
    }
    
    return () => clearInterval(interval);
  }, [gridSize, interactive]);
  
  return (
    <div 
      ref={dotMatrixRef}
      className={`grid grid-cols-${gridSize} ${gridGap} ${className}`}
    >
      {matrix.flat().map((active, i) => (
        <div
          key={i}
          className={`rounded-full ${colorClass} ${dotSize} transition-opacity duration-300`}
          style={{ opacity: active ? 0.8 : 0.1 }}
        />
      ))}
    </div>
  );
};

export default DotMatrixAccent;
