
import React, { useEffect, useRef } from 'react';

const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create dot matrix grid
    interface Dot {
      x: number;
      y: number;
      size: number;
      baseSize: number;
      color: string;
      alpha: number;
      targetAlpha: number;
      blinkTimeout: number;
    }
    
    // Create dots grid
    const spacing = 30;
    const dots: Dot[] = [];
    
    // Calculate grid
    const cols = Math.ceil(canvas.width / spacing) + 1;
    const rows = Math.ceil(canvas.height / spacing) + 1;
    
    // Generate colors
    const colors = ['#22d3ee', '#e879f9', '#facc15'];
    
    // Create dots
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * spacing;
        const y = j * spacing;
        
        // Most dots should be very faint or invisible
        const isVisible = Math.random() > 0.7;
        const alpha = isVisible ? 0.05 + Math.random() * 0.1 : 0;
        const targetAlpha = alpha;
        
        // Randomly assign colors to visible dots
        const colorIndex = Math.floor(Math.random() * colors.length);
        
        dots.push({
          x,
          y,
          baseSize: 1.5,
          size: 1.5,
          color: colors[colorIndex],
          alpha,
          targetAlpha,
          blinkTimeout: Math.random() * 3000
        });
      }
    }
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let mouseRadius = 150;
    
    canvas.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw dots
      for (const dot of dots) {
        // Calculate distance from mouse to determine interaction
        const dx = mouseX - dot.x;
        const dy = mouseY - dot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Update dot properties based on mouse proximity
        if (distance < mouseRadius) {
          // Increase size and brightness near mouse
          const intensity = 1 - distance / mouseRadius;
          dot.size = dot.baseSize + intensity * 2.5;
          dot.targetAlpha = Math.min(0.8, dot.alpha + intensity * 0.6);
        } else {
          // Reset size when mouse moves away
          dot.size = dot.baseSize;
          dot.targetAlpha = Math.max(0, dot.alpha * 0.95);
          
          // Random blinking for background dots
          dot.blinkTimeout -= 16; // Assuming 60fps
          if (dot.blinkTimeout <= 0) {
            dot.targetAlpha = Math.random() > 0.7 ? 0.15 : 0.02;
            dot.blinkTimeout = Math.random() * 5000 + 1000;
          }
        }
        
        // Smooth transition for alpha
        dot.alpha += (dot.targetAlpha - dot.alpha) * 0.1;
        
        // Draw dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.globalAlpha = dot.alpha;
        ctx.fill();
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.4 }}
    />
  );
};

export default InteractiveBackground;
