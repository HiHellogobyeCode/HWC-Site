
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EditableFieldProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  multiline?: boolean;
  className?: string;
}

const EditableField: React.FC<EditableFieldProps> = ({
  value,
  onChange,
  label,
  multiline = false,
  className
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleSave = () => {
    onChange(tempValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempValue(value);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div 
        className={cn("group cursor-pointer", className)}
        onClick={() => {
          setIsEditing(true);
          setTempValue(value);
        }}
      >
        {label && <span className="text-xs text-gray-500 block mb-1">{label}</span>}
        <div className="min-h-6 relative">
          {multiline ? (
            <p>{value || 'Click to edit'}</p>
          ) : (
            <div>{value || 'Click to edit'}</div>
          )}
          <div className="absolute inset-0 bg-gray-800/0 group-hover:bg-gray-800/10 transition-colors duration-200 rounded flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span className="text-xs text-gray-300">Click to edit</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {label && <span className="text-xs text-gray-500 block mb-1">{label}</span>}
      {multiline ? (
        <Textarea
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          className="bg-black border-gray-800 text-gray-200"
          rows={4}
          autoFocus
        />
      ) : (
        <Input
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          className="bg-black border-gray-800 text-gray-200"
          autoFocus
        />
      )}
      <div className="flex gap-2 mt-2">
        <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent border-gray-800 hover:bg-gray-900" onClick={handleSave}>
          <Check size={16} className="text-dot-cyan" />
        </Button>
        <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent border-gray-800 hover:bg-gray-900" onClick={handleCancel}>
          <X size={16} className="text-dot-magenta" />
        </Button>
      </div>
    </div>
  );
};

export default EditableField;
