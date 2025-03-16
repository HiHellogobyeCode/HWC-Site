import React, { createContext, useContext, useState, useEffect } from 'react';

// Define types for our data
type Skill = {
  name: string;
  level: number;
  color: 'cyan' | 'magenta' | 'yellow';
  description?: string;
};

type Job = {
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  bulletPoints?: string[];
};

type Education = {
  degree: string;
  institution: string;
  year: string;
  description: string;
  bulletPoints?: string[];
};

type Language = {
  name: string;
  level: string;
};

type Interest = {
  name: string;
  description: string;
};

type Client = string;

type Achievement = string;

type IndustryMetric = {
  industry: string;
  metrics: string[];
  numbers: string[];
};

type FounderData = {
  name: string;
  position: string;
  email: string;
  location: string;
  linkedin: string;
  github?: string;
  about: string;
  experience: Job[];
  education: Education[];
  skills: Skill[];
  achievements: Achievement[];
  languages: Language[];
  clients: Client[];
  interests?: Interest[];
  industryMetrics: IndustryMetric[];
};

type DataContextType = {
  founderData: FounderData;
  updateFounderData: (newData: Partial<FounderData>) => void;
  updateSkill: (index: number, skill: Skill) => void;
  updateJob: (index: number, job: Job) => void;
  updateEducation: (index: number, education: Education) => void;
  updateLanguage: (index: number, language: Language) => void;
  addSkill: (skill: Skill) => void;
  addJob: (job: Job) => void;
  addEducation: (education: Education) => void;
  addLanguage: (language: Language) => void;
  addAchievement: (achievement: string) => void;
  addClient: (client: string) => void;
  removeSkill: (index: number) => void;
  removeJob: (index: number) => void;
  removeEducation: (index: number) => void;
  removeLanguage: (index: number) => void;
  removeAchievement: (index: number) => void;
  removeClient: (index: number) => void;
  isEditMode: boolean;
  toggleEditMode: () => void;
};

// Default founder data for Jonathan Reed
const defaultFounderData: FounderData = {
  name: "Jonathan Reed",
  position: "Founder & CEO at Hello.World Consulting",
  email: "jonathanrayreed@gmail.com",
  location: "Dallas, TX",
  linkedin: "www.linkedin.com/in/jonathanrreed0",
  about: "Jonathan Reed uniquely bridges the gap between advanced medical neuroscience and cutting-edge AI consulting. With ongoing academic training at The University of Texas at Dallas in advanced pre-medical neuroscience and professional certification as an EMT-B, he provides a distinctive, interdisciplinary approach. As the founder of Hello.World Consulting, Jonathan excels in strategic AI implementation, sophisticated prompt engineering, and robust AI security through meticulous red-teaming.",
  experience: [
    {
      title: "Founder & CEO",
      company: "Hello.World Consulting",
      period: "July 2022 - Present",
      location: "Remote",
      description: "Leads strategic implementation of AI solutions tailored to client-specific needs.",
      bulletPoints: [
        "Leads strategic implementation of AI solutions tailored to client-specific needs, enhancing efficiency and growth.",
        "Designs advanced prompt engineering techniques and performs comprehensive AI red-teaming to secure and enhance business operations.",
        "Works collaboratively with clients to deliver innovative, custom-built technological solutions."
      ]
    }
  ],
  education: [
    {
      degree: "Bachelor's Degree, Advanced Pre-Medical Neuroscience",
      institution: "The University of Texas at Dallas",
      year: "Expected 2027",
      description: "Integrated studies emphasizing neuroscience and AI applications.",
      bulletPoints: [
        "Member of the Climbing Club.",
        "Integrated studies emphasizing neuroscience and AI applications."
      ]
    },
    {
      degree: "EMT-B Certification",
      institution: "The University of Texas at Dallas (UMER Program)",
      year: "2024",
      description: "Achieved certification with distinction (Grade: A).",
      bulletPoints: []
    },
    {
      degree: "Undergraduate Studies",
      institution: "Wharton County Junior College",
      year: "2021 - 2023",
      description: "Completed foundational coursework for advanced specialization.",
      bulletPoints: []
    }
  ],
  skills: [
    { name: "AI Integration & Automation", level: 5, color: "cyan", description: "Expert in practical AI application for business efficiency." },
    { name: "Prompt Engineering & AI Red Teaming", level: 5, color: "magenta", description: "Specialized in optimizing and safeguarding AI deployments through strategic prompt development and rigorous testing." },
    { name: "Neuroscience-Informed Analytics", level: 5, color: "yellow", description: "Deeply skilled in leveraging neuroscience insights for enhanced analytical outcomes." },
    { name: "Medical Terminology & Healthcare Systems", level: 4, color: "cyan", description: "Comprehensive knowledge applied in both clinical and technological contexts." },
    { name: "Business Strategy & Development", level: 5, color: "magenta", description: "Proven ability in strategic planning and effective client collaboration." },
    { name: "Computer Information Systems & Microsoft 365", level: 4, color: "yellow", description: "Strong technical skills supporting efficient operational frameworks." },
    { name: "Leadership & Time Management", level: 5, color: "cyan", description: "Exceptional organizational and leadership capabilities promoting team effectiveness." }
  ],
  achievements: [
    "Developed AI integration frameworks for enterprise clients",
    "Led digital transformation projects for multiple Fortune 500 companies",
    "Created process automation solutions resulting in 40% efficiency improvements",
    "Pioneered neuroscience-based approaches to AI prompt engineering",
    "Specialist in AI red teaming and risk assessment methodologies"
  ],
  languages: [
    { name: "English", level: "Native" },
    { name: "Python", level: "Expert" },
    { name: "TensorFlow", level: "Advanced" },
    { name: "PyTorch", level: "Advanced" }
  ],
  clients: [
    "Technology Enterprises",
    "Healthcare Innovations",
    "Financial Services",
    "Retail Corporations",
    "Manufacturing Industries",
    "Educational Institutions"
  ],
  interests: [
    { 
      name: "Climbing & Fitness", 
      description: "Active participant in the UTD climbing club, valuing teamwork, resilience, and physical health." 
    },
    { 
      name: "Innovation in Neuroscience & Technology", 
      description: "Dedicated to creating impactful solutions by blending neuroscience principles with advanced technology." 
    }
  ],
  industryMetrics: [
    {
      industry: "Manufacturing",
      metrics: [
        "Production Costs",
        "Downtime & Quality",
        "Case Studies"
      ],
      numbers: [
        "15–20% reduction",
        "Up to 25% productivity gains; AI-powered visual inspections can achieve up to 5× efficiency and 20% fewer false positives",
        "Siemens and GE report significant gains, with GE noting over $1B in productivity gains"
      ]
    },
    {
      industry: "Healthcare",
      metrics: [
        "Cost Savings",
        "Lives Saved",
        "Diagnostic Efficiency"
      ],
      numbers: [
        "Potential to save the US healthcare industry $200–360 billion annually",
        "Estimated 380,000–403,000 lives saved annually in Europe",
        "Radiotherapy planning times reduced by up to 90%"
      ]
    },
    {
      industry: "Financial Services",
      metrics: [
        "Productivity Gains",
        "Operational Ease",
        "Revenue & Cost"
      ],
      numbers: [
        "Average improvement of around 20% in functions such as software development and customer service",
        "63% of CFOs report significantly easier payment automation",
        "Nearly 70% of companies experience revenue increases (5%+), with over 60% seeing similar cost reductions"
      ]
    },
    {
      industry: "Transportation & Logistics",
      metrics: [
        "Fuel Efficiency",
        "Processing Time",
        "Maintenance"
      ],
      numbers: [
        "Over 15% reduction in fuel consumption through optimized routing",
        "10% reduction in processing time",
        "Predictive maintenance can lower costs by up to 30% and reduce downtime by up to 45%"
      ]
    },
    {
      industry: "Retail & E-commerce",
      metrics: [
        "Revenue Growth",
        "Customer Engagement"
      ],
      numbers: [
        "69% of retailers reported revenue increases, with an average rise of 10–12%",
        "Personalization is key—driving 35% of purchases (as seen on platforms like Amazon)"
      ]
    },
    {
      industry: "Agriculture",
      metrics: [
        "Yield Prediction",
        "Resource Management"
      ],
      numbers: [
        "Improvement in prediction accuracy by around 15%",
        "Reduction in water consumption by 25%; some systems report up to 90% less use of chemical pesticides"
      ]
    }
  ]
};

// Create the context
const DataContext = createContext<DataContextType | undefined>(undefined);

// Custom hook to use the data context
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

// Provider component
export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [founderData, setFounderData] = useState<FounderData>(() => {
    // Try to load from localStorage first
    const savedData = localStorage.getItem('founderData');
    return savedData ? JSON.parse(savedData) : defaultFounderData;
  });
  const [isEditMode, setIsEditMode] = useState(false);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('founderData', JSON.stringify(founderData));
  }, [founderData]);

  const updateFounderData = (newData: Partial<FounderData>) => {
    setFounderData(prev => ({ ...prev, ...newData }));
  };

  const updateSkill = (index: number, skill: Skill) => {
    setFounderData(prev => {
      const newSkills = [...prev.skills];
      newSkills[index] = skill;
      return { ...prev, skills: newSkills };
    });
  };

  const updateJob = (index: number, job: Job) => {
    setFounderData(prev => {
      const newJobs = [...prev.experience];
      newJobs[index] = job;
      return { ...prev, experience: newJobs };
    });
  };

  const updateEducation = (index: number, education: Education) => {
    setFounderData(prev => {
      const newEducation = [...prev.education];
      newEducation[index] = education;
      return { ...prev, education: newEducation };
    });
  };

  const updateLanguage = (index: number, language: Language) => {
    setFounderData(prev => {
      const newLanguages = [...prev.languages];
      newLanguages[index] = language;
      return { ...prev, languages: newLanguages };
    });
  };

  const addSkill = (skill: Skill) => {
    setFounderData(prev => ({
      ...prev,
      skills: [...prev.skills, skill]
    }));
  };

  const addJob = (job: Job) => {
    setFounderData(prev => ({
      ...prev,
      experience: [...prev.experience, job]
    }));
  };

  const addEducation = (education: Education) => {
    setFounderData(prev => ({
      ...prev,
      education: [...prev.education, education]
    }));
  };

  const addLanguage = (language: Language) => {
    setFounderData(prev => ({
      ...prev,
      languages: [...prev.languages, language]
    }));
  };

  const addAchievement = (achievement: string) => {
    setFounderData(prev => ({
      ...prev,
      achievements: [...prev.achievements, achievement]
    }));
  };

  const addClient = (client: string) => {
    setFounderData(prev => ({
      ...prev,
      clients: [...prev.clients, client]
    }));
  };

  const removeSkill = (index: number) => {
    setFounderData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const removeJob = (index: number) => {
    setFounderData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const removeEducation = (index: number) => {
    setFounderData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const removeLanguage = (index: number) => {
    setFounderData(prev => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index)
    }));
  };

  const removeAchievement = (index: number) => {
    setFounderData(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }));
  };

  const removeClient = (index: number) => {
    setFounderData(prev => ({
      ...prev,
      clients: prev.clients.filter((_, i) => i !== index)
    }));
  };

  const toggleEditMode = () => {
    setIsEditMode(prev => !prev);
  };

  const value = {
    founderData,
    updateFounderData,
    updateSkill,
    updateJob,
    updateEducation,
    updateLanguage,
    addSkill,
    addJob,
    addEducation,
    addLanguage,
    addAchievement,
    addClient,
    removeSkill,
    removeJob,
    removeEducation,
    removeLanguage,
    removeAchievement,
    removeClient,
    isEditMode,
    toggleEditMode
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
