import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Cell } from 'recharts';
import { FaHospital, FaCogs, FaBriefcase, FaShoppingCart, FaTruck, FaSeedling } from 'react-icons/fa';
import { FaChartLine, FaBolt, FaSmile, FaRecycle, FaPlug } from 'react-icons/fa';

const HelloWorldConsultingDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [animatedData, setAnimatedData] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Theme colors (OLED backgrounds with neon accents)
  const colors = {
    backgrounds: {
      primary: '#000000',  // OLED Black
      secondary: '#0a0f29', // Midnight Blue
      tertiary: '#260b41',  // Deep Purple
      card: '#161831'       // Slightly lighter than Midnight Blue
    },
    neon: {
      pink: '#ff4dc4',      // Neon Pink
      blue: '#3399ff',      // Neon Blue
      gold: '#ffd24d',      // Neon Gold
      purple: '#9933ff',    // Neon Purple
      cyan: '#4dfff0'       // Neon Cyan
    },
    harmony: {
      gold: '#f4c025',      // Rich Gold
      purple: '#8013ec',    // Electric Purple
      pink: '#ed1d85',      // Vibrant Pink
      teal: '#11a4d4',      // Teal Blue
      orange: '#f49d25',    // Amber Orange
      lime: '#0df20d'       // Neon Lime
    }
  };

  // Chart 1: Industry-specific ROI from AI Integration & Optimization
  const industryROIData = [
    { industry: 'Healthcare', icon: <FaHospital />, roi: 380, color: colors.harmony.pink, highlight: '380K lives saved annually' },
    { industry: 'Manufacturing', icon: <FaCogs />, roi: 350, color: colors.neon.blue, highlight: '15-20% reduced costs' },
    { industry: 'Financial Services', icon: <FaBriefcase />, roi: 310, color: colors.harmony.purple, highlight: '20% productivity gain' },
    { industry: 'Retail', icon: <FaShoppingCart />, roi: 290, color: colors.neon.gold, highlight: '10-12% revenue growth' },
    { industry: 'Transportation', icon: <FaTruck />, roi: 260, color: colors.harmony.teal, highlight: '>15% less fuel' },
    { industry: 'Agriculture', icon: <FaSeedling />, roi: 240, color: colors.harmony.orange, highlight: '15% yield accuracy' }
  ];
  
  // Chart 2: Process Efficiency & Automation Benefits
  const automationBenefitsData = [
    { category: 'Output Increase', icon: <FaChartLine />, value: 40, company: 'ZF Group', metric: '40% increase in manufacturing output', color: colors.neon.pink },
    { category: 'Workflow Efficiency', icon: <FaBolt />, value: 90, company: 'Construction', metric: '90% increase in overall workflow efficiency', color: colors.neon.blue },
    { category: 'Customer Satisfaction', icon: <FaSmile />, value: 90, company: 'Banking', metric: '90% increase in customer satisfaction', color: colors.neon.purple },
    { category: 'Workload Reduction', icon: <FaChartLine />, value: 80, company: 'Banking', metric: '80% reduction in workload', color: colors.neon.gold },
    { category: 'Material Waste', icon: <FaRecycle />, value: 65, company: 'ZF Group', metric: '65% reduction in material waste', color: colors.harmony.pink },
    { category: 'Energy Consumption', icon: <FaPlug />, value: 28, company: 'ZF Group', metric: '28% reduction in energy consumption', color: colors.neon.cyan }
  ];
  
  // Chart 3: AI Red Teaming & Risk Management Impact
  const redTeamingImpactData = [
    { area: 'AI System Security', value: 85, description: 'Improved security of AI systems', color: colors.neon.pink },
    { area: 'Bias Mitigation', value: 78, description: 'Reduction in AI bias and ethical issues', color: colors.neon.blue },
    { area: 'Threat Detection', value: 92, description: 'Enhanced detection of potential vulnerabilities', color: colors.neon.purple },
    { area: 'Attack Response Time', value: 65, description: 'Faster response to security incidents', color: colors.neon.cyan },
    { area: 'Compliance Assurance', value: 88, description: 'Improved regulatory compliance', color: colors.neon.gold },
    { area: 'Reputation Protection', value: 80, description: 'Safeguarding organizational integrity', color: colors.harmony.pink }
  ];
  
  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Animation for ROI chart data
  useEffect(() => {
    if (activeTab === 0 && !isLoading) {
      const data = industryROIData.map((item, index) => ({...item, roi: index === 0 ? 1 : 0})); // Start index 0 at 1 to ensure visibility
      setAnimatedData(data);
      
      const timer = setTimeout(() => {
        const intervalId = setInterval(() => {
          setAnimatedData(prev => {
            const allComplete = prev.every((item, i) => item.roi >= industryROIData[i].roi);
            if (allComplete) {
              clearInterval(intervalId);
              return industryROIData;
            }
            
            return prev.map((item, i) => ({
              ...item,
              roi: Math.min(item.roi + (industryROIData[i].roi / (i === 0 ? 10 : 20)), industryROIData[i].roi) // Faster animation for index 0
            }));
          });
        }, 30);
        
        return () => clearInterval(intervalId);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [activeTab, isLoading]);

  useEffect(() => {
    console.log('Animated Data:', animatedData);
    console.log('Chart Dimensions:', {
      width: document.querySelector('.chart-container')?.clientWidth,
      height: document.querySelector('.chart-container')?.clientHeight
    });
  }, [animatedData]);

  useEffect(() => {
    console.log('Initial Data:', industryROIData);
  }, []);

  // Function to create circular progress component
  const CircularProgress = ({ value, color, size = 120, thickness = 10, showText = true, animate = true }) => {
    const [progress, setProgress] = useState(0);
    
    useEffect(() => {
      if (animate) {
        const timer = setTimeout(() => {
          let startValue = 0;
          const intervalId = setInterval(() => {
            startValue += value / 30;
            if (startValue >= value) {
              clearInterval(intervalId);
              setProgress(value);
            } else {
              setProgress(startValue);
            }
          }, 30);
          
          return () => clearInterval(intervalId);
        }, 300);
        
        return () => clearTimeout(timer);
      } else {
        setProgress(value);
      }
    }, [value, animate]);
    
    const radius = (size / 2) - (thickness / 2);
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;
    
    return (
      <div className="relative flex items-center justify-center">
        {/* Subtle glow behind circle */}
        <div 
          className="absolute rounded-full blur-xl opacity-30"
          style={{ 
            width: size * 1.2, 
            height: size * 1.2, 
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)` 
          }}
        />
      
        <svg width={size} height={size} className="-rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={thickness}
          />
          
          {/* Gradient definitions */}
          <defs>
            <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={color} stopOpacity="0.8" />
              <stop offset="100%" stopColor={color} stopOpacity="1" />
            </linearGradient>
          </defs>
          
          {/* Progress circle with glow */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`url(#gradient-${color.replace('#', '')})`}
            strokeWidth={thickness}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ 
              transition: "stroke-dashoffset 1s cubic-bezier(0.22, 1, 0.36, 1)",
              filter: `drop-shadow(0 0 3px ${color})`
            }}
          />
          
          {/* Subtle highlight on the progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.5)"
            strokeWidth={1}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ 
              transition: "stroke-dashoffset 1s cubic-bezier(0.22, 1, 0.36, 1)",
              mixBlendMode: "overlay",
              opacity: 0.3
            }}
          />
        </svg>
        
        {showText && (
          <div 
            className="absolute flex items-center justify-center text-2xl font-bold"
            style={{ 
              color: color, 
              textShadow: `0 0 10px ${color}60`
            }}
          >
            {Math.round(progress)}%
          </div>
        )}
      </div>
    );
  };

  interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
    type: string;
  }

  const LoadingScreen = () => (
    <div className="absolute inset-0 flex items-center justify-center z-50" style={{ backgroundColor: colors.backgrounds.primary }}>
      <div className="relative">
        <CircularProgress value={100} color={colors.neon.pink} animate={false} showText={false} />
        <div 
          className="absolute inset-0 flex items-center justify-center font-bold text-2xl"
          style={{ 
            color: colors.neon.pink,
            textShadow: `0 0 10px ${colors.neon.pink}`
          }}
        >
          <div className="animate-pulse">Loading...</div>
        </div>
      </div>
    </div>
  );

  const CustomTooltip = ({ active, payload, label, type }: CustomTooltipProps) => {
    if (!active || !payload || !payload.length) return null;
    
    let content;
    let color;
    
    if (type === 'roi') {
      const data = industryROIData.find(item => item.industry === label);
      color = data?.color;
      content = (
        <>
          <div className="flex items-center mb-1">
            <span className="text-2xl mr-2">{data?.icon}</span>
            <span className="font-bold text-lg">{label}</span>
          </div>
          <div className="text-xl font-bold" style={{ color: data?.color }}>{payload[0].value}% ROI</div>
          <div className="mt-1">{data?.highlight}</div>
        </>
      );
    } else if (type === 'automation') {
      const data = automationBenefitsData.find(item => item.category === label);
      color = data?.color;
      content = (
        <>
          <div className="flex items-center mb-1">
            <span className="text-2xl mr-2">{data?.icon}</span>
            <span className="font-bold text-lg">{label}</span>
          </div>
          <div className="text-xl font-bold" style={{ color: data?.color }}>{payload[0].value}%</div>
          <div className="mt-1">{data?.metric}</div>
          <div className="text-sm opacity-80">Company: {data?.company}</div>
        </>
      );
    } else if (type === 'radar') {
      const data = payload[0].payload;
      color = data.color;
      content = (
        <>
          <div className="font-bold text-lg mb-1">{data.area}</div>
          <div className="text-xl font-bold" style={{ color: data.color }}>{data.value}% Effective</div>
          <div className="mt-1">{data.description}</div>
        </>
      );
    }
    
    return (
      <div 
        className="p-3 rounded-lg border border-gray-800 shadow-xl backdrop-blur-md"
        style={{ 
          background: `linear-gradient(135deg, ${colors.backgrounds.secondary}90, ${colors.backgrounds.tertiary}90)`,
          boxShadow: `0 4px 20px ${color}40`,
          borderColor: `${color}40`,
          maxWidth: '250px',
          color: 'white'
        }}
      >
        {content}
      </div>
    );
  };
  
  const renderActiveChart = () => {
    switch (activeTab) {
      case 0:
        return (
          <div id="charts-section" className="relative overflow-hidden rounded-xl p-6" style={{ background: colors.backgrounds.card }}>
            {/* Decorative background elements */}
            <div 
              className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-20 blur-3xl"
              style={{ background: `radial-gradient(circle, ${colors.neon.pink} 0%, transparent 70%)` }}
            />
            <div 
              className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-10 blur-3xl"
              style={{ background: `radial-gradient(circle, ${colors.neon.blue} 0%, transparent 70%)` }}
            />
            
            <h3 
              className="text-2xl font-bold mb-2"
              style={{ 
                color: colors.neon.gold,
                textShadow: `0 0 10px ${colors.neon.gold}60`
              }}
            >
              AI Integration & Optimization ROI
            </h3>
            <p className="text-gray-400 mb-8">Our specialized AI integration yields substantial returns across industries, measured in ROI percentages.</p>
            
            <div className="h-[400px] mb-8" style={{ minHeight: '400px', visibility: 'visible' }}>
              <div className="relative" style={{ zIndex: 10, height: '100%' }}>
                <ResponsiveContainer width="100%" height="100%" style={{ position: 'relative', zIndex: 11 }}>
                  <BarChart 
                    data={activeTab === 0 ? animatedData : industryROIData} 
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    style={{ background: 'none', backgroundColor: 'transparent' }}
                  >
                    <defs>
                      <filter id="barGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke="rgba(255,255,255,0.05)"
                      vertical={false}
                      style={{ zIndex: 11 }}
                    />
                    <XAxis 
                      dataKey="industry" 
                      stroke="#fff" 
                      tick={{ fill: colors.neon.blue, fontSize: 12 }} 
                      tickFormatter={(value) => {
                        const formatted = value.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
                        return formatted;
                      }}
                      interval={0}
                      style={{ zIndex: 11 }}
                    />
                    <YAxis 
                      stroke="#fff" 
                      tick={{ fill: colors.neon.blue, fontSize: 12 }} 
                      label={{ value: 'ROI (%)', angle: -90, position: 'insideLeft', fill: colors.neon.blue }}
                      style={{ zIndex: 11 }}
                    />
                    <Tooltip 
                      content={<CustomTooltip type="roi" />} 
                      cursor={{ fill: 'transparent' }}
                      wrapperStyle={{ zIndex: 13 }}
                      contentStyle={{ backgroundColor: colors.backgrounds.card, borderColor: colors.neon.blue }}
                      labelStyle={{ color: colors.neon.blue }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Bar 
                      dataKey="roi" 
                      fill="#3399ff"
                      onMouseEnter={(_, index) => setHighlightedIndex(index)}
                      onMouseLeave={() => setHighlightedIndex(null)}
                      background={{ fill: 'transparent', pointerEvents: 'none' }}
                      className="bg-transparent glow-bar"
                      filter="url(#barGlow)"
                      cursor="pointer"
                      style={{ pointerEvents: 'visiblePainted', zIndex: 12 }}
                    >
                      {animatedData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color} 
                          strokeWidth={0}
                          style={{ 
                            transition: 'all 0.2s ease',
                            background: 'none',
                            backgroundColor: 'transparent',
                            boxShadow: highlightedIndex === index ? `0 0 12px ${entry.color}, 0 0 24px ${entry.color}30` : 'none',
                            outline: highlightedIndex === index ? `2px solid ${entry.color}` : 'none',
                            pointerEvents: 'visiblePainted'
                          }}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
              {industryROIData.map((item, index) => (
                <div 
                  key={index} 
                  className={`relative p-3 rounded-lg overflow-hidden transition-all duration-300 transform ${
                    highlightedIndex === index ? 'scale-105' : ''
                  }`}
                  style={{ 
                    background: `linear-gradient(135deg, ${colors.backgrounds.secondary}90, ${colors.backgrounds.tertiary}80)`,
                    borderLeft: `3px solid ${item.color}`,
                    opacity: highlightedIndex === index ? 1 : 0.7,
                    transition: 'all 0.3s ease',
                    boxShadow: highlightedIndex === index ? `0 0 15px ${item.color}, 0 0 30px ${item.color}50` : 'none'
                  }}
                >
                  <div className="flex items-center mb-1">
                    <div className="mr-2 text-2xl">{item.icon}</div>
                    <div>
                      <div className="font-bold text-white">{item.industry}</div>
                      <div 
                        className="text-xl font-bold"
                        style={{ 
                          color: item.color,
                        }}
                      >
                        {item.roi}%
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400 mt-1">{item.highlight}</div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 1:
        return (
          <div className="relative overflow-hidden rounded-xl p-6" style={{ background: colors.backgrounds.card }}>
            {/* Decorative background elements */}
            <div 
              className="absolute top-0 left-0 w-full h-1"
              style={{ 
                background: `linear-gradient(to right, ${colors.neon.cyan}, ${colors.neon.blue}, ${colors.neon.pink})` 
              }}
            />
            <div 
              className="absolute -top-40 -left-40 w-80 h-80 rounded-full opacity-10 blur-3xl"
              style={{ background: `radial-gradient(circle, ${colors.neon.blue} 0%, transparent 70%)` }}
            />
            
            <h3 
              className="text-2xl font-bold mb-2"
              style={{ 
                color: colors.neon.blue,
                textShadow: `0 0 10px ${colors.neon.blue}60`
              }}
            >
              Process Efficiency & Automation Impact
            </h3>
            <p className="text-gray-400 mb-8">Our intelligent automation delivers measurable improvements in productivity, accuracy, and efficiency.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {automationBenefitsData.slice(0, 3).map((item, index) => (
                <div 
                  key={index}
                  className="relative flex flex-col items-center p-4 rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105"
                  style={{ 
                    background: `linear-gradient(135deg, ${colors.backgrounds.secondary}90, ${colors.backgrounds.tertiary}80)`,
                    boxShadow: `0 0 20px ${item.color}50`,
                    border: `1px solid ${colors.backgrounds.tertiary}`
                  }}
                >
                  {/* Progress circle */}
                  <CircularProgress value={item.value} color={item.color} />
                  
                  {/* Category name */}
                  <div className="flex items-center mt-3 mb-1">
                    <span className="mr-2 text-xl">{item.icon}</span>
                    <span 
                      className="font-bold text-lg"
                      style={{ 
                        color: 'white',
                        textShadow: `0 0 8px ${item.color}60`
                      }}
                    >
                      {item.category}
                    </span>
                  </div>
                  
                  {/* Metric description */}
                  <p className="text-sm text-center text-gray-400 mt-1">{item.metric}</p>
                  
                  {/* Company name */}
                  <div 
                    className="absolute bottom-2 right-2 text-xs px-2 py-1 rounded-full"
                    style={{ 
                      color: item.color,
                      backgroundColor: `${item.color}20`,
                      boxShadow: `0 0 8px ${item.color}30`
                    }}
                  >
                    {item.company}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {automationBenefitsData.slice(3).map((item, index) => (
                <div 
                  key={index + 3}
                  className="relative flex flex-col items-center p-4 rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105"
                  style={{ 
                    background: `linear-gradient(135deg, ${colors.backgrounds.secondary}90, ${colors.backgrounds.tertiary}80)`,
                    boxShadow: `0 0 20px ${item.color}50`,
                    border: `1px solid ${colors.backgrounds.tertiary}`
                  }}
                >
                  {/* Progress circle */}
                  <CircularProgress value={item.value} color={item.color} />
                  
                  {/* Category name */}
                  <div className="flex items-center mt-3 mb-1">
                    <span className="mr-2 text-xl">{item.icon}</span>
                    <span 
                      className="font-bold text-lg"
                      style={{ 
                        color: 'white',
                        textShadow: `0 0 8px ${item.color}60`
                      }}
                    >
                      {item.category}
                    </span>
                  </div>
                  
                  {/* Metric description */}
                  <p className="text-sm text-center text-gray-400 mt-1">{item.metric}</p>
                  
                  {/* Company name */}
                  <div 
                    className="absolute bottom-2 right-2 text-xs px-2 py-1 rounded-full"
                    style={{ 
                      color: item.color,
                      backgroundColor: `${item.color}20`,
                      boxShadow: `0 0 8px ${item.color}30`
                    }}
                  >
                    {item.company}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="relative overflow-hidden rounded-xl p-6" style={{ background: colors.backgrounds.card }}>
            {/* Decorative background elements */}
            <div 
              className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-10 blur-3xl"
              style={{ background: `radial-gradient(circle, ${colors.neon.purple} 0%, transparent 70%)` }}
            />
            
            <h3 
              className="text-2xl font-bold mb-2"
              style={{ 
                color: colors.neon.purple,
                textShadow: `0 0 10px ${colors.neon.purple}60`
              }}
            >
              AI Red Teaming & Risk Management
            </h3>
            <p className="text-gray-400 mb-8">Our comprehensive security assessments identify and mitigate vulnerabilities in your AI systems.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={redTeamingImpactData}>
                    <defs>
                      <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={colors.neon.pink} stopOpacity="0.9" />
                        <stop offset="100%" stopColor={colors.neon.purple} stopOpacity="0.7" />
                      </linearGradient>
                      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis dataKey="area" stroke="#fff" tick={{ fill: '#fff', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="rgba(255,255,255,0.3)" tick={{ fill: '#fff', fontSize: 12 }} tickFormatter={(value) => `${value}%`} />
                    <Radar 
                      name="Security Effectiveness" 
                      dataKey="value" 
                      stroke="url(#radarGradient)" 
                      fill="url(#radarGradient)" 
                      fillOpacity={0.6} 
                      filter="url(#glow)"
                      className="glow-effect"
                    />
                    <Tooltip content={<CustomTooltip type="radar" />} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {redTeamingImpactData.map((item, index) => (
                  <div 
                    key={index}
                    className="relative p-3 rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105"
                    style={{ 
                      background: `linear-gradient(135deg, ${colors.backgrounds.secondary}90, ${colors.backgrounds.tertiary}80)`,
                      boxShadow: `0 0 20px ${item.color}50`,
                      border: `1px solid ${item.color}30`
                    }}
                  >
                    <div 
                      className="text-xl font-bold mb-1"
                      style={{ 
                        color: item.color,
                        textShadow: `0 0 8px ${item.color}60`
                      }}
                    >
                      {item.value}%
                    </div>
                    <div className="font-bold text-white mb-1">{item.area}</div>
                    <div className="text-xs text-gray-400">{item.description}</div>
                    
                    {/* Progress bar */}
                    <div className="h-1 mt-2 rounded-full overflow-hidden bg-gray-800">
                      <div 
                        className="h-full rounded-full"
                        style={{ 
                          width: `${item.value}%`,
                          background: `linear-gradient(to right, ${item.color}90, ${item.color})`,
                          boxShadow: `0 0 10px ${item.color}`,
                          transition: 'width 1s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s ease'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  const TabButton = ({ index, icon, label }) => (
    <button
      className={`relative px-4 py-3 mr-2 rounded-lg overflow-hidden transition-all duration-300`}
      style={{ 
        background: activeTab === index ? `${colors.backgrounds.tertiary}` : 'transparent',
        border: `1px solid ${activeTab === index ? colors.neon[Object.keys(colors.neon)[index]] : 'rgba(255,255,255,0.1)'}`,
        boxShadow: activeTab === index ? `0 0 15px ${colors.neon[Object.keys(colors.neon)[index]]}40` : 'none'
      }}
      onClick={() => setActiveTab(index)}
    >
      {/* Active tab highlight */}
      {activeTab === index && (
        <div 
          className="absolute inset-0 opacity-20"
          style={{ background: colors.neon[Object.keys(colors.neon)[index]] }}
        />
      )}
      
      <div className="flex items-center">
        <span 
          className="mr-2"
          style={{ 
            color: activeTab === index 
              ? colors.neon[Object.keys(colors.neon)[index]] 
              : 'rgba(255,255,255,0.6)'
          }}
        >
          {icon}
        </span>
        <span 
          className={`font-medium ${activeTab === index ? 'text-white' : 'text-gray-400'}`}
          style={{ 
            textShadow: activeTab === index 
              ? `0 0 10px ${colors.neon[Object.keys(colors.neon)[index]]}60` 
              : 'none'
          }}
        >
          {label}
        </span>
      </div>
      
      {/* Bottom highlight line for active tab */}
      {activeTab === index && (
        <div 
          className="absolute bottom-0 left-0 right-0 h-0.5"
          style={{ background: colors.neon[Object.keys(colors.neon)[index]] }}
        />
      )}
    </button>
  );
  
  return (
    <div className="relative max-w-4xl mx-auto font-sans">
      {isLoading && <LoadingScreen />}
      
      <div 
        className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        style={{ background: colors.backgrounds.primary }}
      >
        <div className="p-6 rounded-xl">
          <div className="flex items-center mb-6">
            <div 
              className="w-10 h-10 rounded-lg mr-3 flex items-center justify-center"
              style={{ 
                background: `linear-gradient(135deg, ${colors.neon.purple}, ${colors.neon.pink})`,
                boxShadow: `0 0 15px ${colors.neon.purple}40`
              }}
            >
              <span className="text-xl">🌐</span>
            </div>
            <div>
              <h2 
                className="text-2xl font-bold mb-1"
                style={{ 
                  color: colors.neon.gold,
                  textShadow: `0 0 10px ${colors.neon.gold}40`
                }}
              >
                Hello.World Consulting
              </h2>
              <p className="text-gray-400 text-sm">AI Consulting Services Dashboard - Performance Metrics</p>
            </div>
          </div>
          
          <div className="mb-6 overflow-x-auto flex">
            <TabButton index={0} icon={<FaChartLine />} label="AI Integration ROI" />
            <TabButton index={1} icon={<FaBolt />} label="Process Automation" />
            <TabButton index={2} icon={<FaSmile />} label="AI Red Teaming" />
          </div>
          
          {renderActiveChart()}
          
          <div 
            className="mt-6 p-3 rounded-lg text-xs text-center"
            style={{ 
              background: `linear-gradient(135deg, ${colors.backgrounds.secondary}80, ${colors.backgrounds.tertiary}80)`,
              border: `1px solid ${colors.backgrounds.tertiary}`
            }}
          >
            <p className="text-gray-400">
              <span className="text-xs px-2 py-0.5 rounded-full mr-2" style={{ background: colors.backgrounds.tertiary }}>
                SOURCE
              </span>
              Data compiled from Hello.World Consulting client results and industry benchmarks (2025).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelloWorldConsultingDashboard;
