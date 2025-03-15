
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check, X, Trash2 } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface EditableSkillProps {
  index: number;
  onDelete: () => void;
}

const EditableSkill: React.FC<EditableSkillProps> = ({ index, onDelete }) => {
  const { founderData, updateSkill } = useData();
  const skill = founderData.skills[index];
  
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(skill.name);
  const [tempLevel, setTempLevel] = useState(skill.level);
  const [tempColor, setTempColor] = useState<'cyan' | 'magenta' | 'yellow'>(skill.color);

  const handleSave = () => {
    updateSkill(index, {
      name: tempName,
      level: tempLevel,
      color: tempColor
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempName(skill.name);
    setTempLevel(skill.level);
    setTempColor(skill.color);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="space-y-1 group">
        <div className="flex justify-between text-sm cursor-pointer" onClick={() => setIsEditing(true)}>
          <span className="text-gray-300">{skill.name}</span>
          <span className="text-gray-500">{skill.level}%</span>
        </div>
        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ease-out ${
              skill.color === "cyan" ? "bg-dot-cyan" : 
              skill.color === "magenta" ? "bg-dot-magenta" : 
              "bg-dot-yellow"
            }`}
            style={{ width: `${skill.level}%` }}
          ></div>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex justify-end">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 p-0 text-gray-500 hover:text-white"
            onClick={onDelete}
          >
            <Trash2 size={14} />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 border border-gray-800 p-3 rounded-md">
      <Input
        value={tempName}
        onChange={(e) => setTempName(e.target.value)}
        placeholder="Skill name"
        className="bg-gray-900 border-gray-700"
      />
      
      <div className="space-y-1">
        <div className="flex justify-between">
          <label className="text-xs text-gray-500">Level: {tempLevel}%</label>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={tempLevel}
          onChange={(e) => setTempLevel(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-800 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
        />
      </div>
      
      <div className="space-y-1">
        <label className="text-xs text-gray-500">Color</label>
        <Tabs defaultValue={tempColor} onValueChange={(value) => setTempColor(value as 'cyan' | 'magenta' | 'yellow')}>
          <TabsList className="bg-gray-900 border border-gray-800">
            <TabsTrigger value="cyan" className="data-[state=active]:bg-dot-cyan data-[state=active]:text-gray-900">
              Cyan
            </TabsTrigger>
            <TabsTrigger value="magenta" className="data-[state=active]:bg-dot-magenta data-[state=active]:text-gray-900">
              Magenta
            </TabsTrigger>
            <TabsTrigger value="yellow" className="data-[state=active]:bg-dot-yellow data-[state=active]:text-gray-900">
              Yellow
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="flex justify-end gap-2 pt-2">
        <Button size="sm" variant="outline" onClick={handleCancel} className="h-8 w-8 p-0">
          <X size={16} />
        </Button>
        <Button size="sm" onClick={handleSave} className="h-8 w-8 p-0">
          <Check size={16} />
        </Button>
      </div>
    </div>
  );
};

export default EditableSkill;
