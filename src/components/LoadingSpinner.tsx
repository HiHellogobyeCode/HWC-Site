import React from 'react';
import './LoadingSpinner.css';
import cn from 'classnames';

interface Props {
  className?: string;
}

const LoadingSpinner: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('loading-spinner', className)}>
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
