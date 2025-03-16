import React, { useState, useEffect, ErrorInfo, ReactNode } from 'react';
import './ErrorBoundary.css';

interface State {
  hasError: boolean;
  error?: Error;
}

interface Props {
  children: ReactNode;
  fallback: ReactNode;
}

const ErrorBoundary: React.FC<Props> = ({ children, fallback }) => {
  const [hasError, setError] = useState(false);
  const [error, setErrorObject] = useState<Error>();

  useEffect(() => {
    setError(false);
    setErrorObject(undefined);
  }, [children]);

  const staticGetDerivedStateFromError = (error: Error) => {
    setError(true);
    setErrorObject(error);
  };

  const componentDidCatch = (error: Error, errorInfo: ErrorInfo) => {
    console.error('Error Boundary caught:', error, errorInfo);
  };

  if (hasError) {
    return fallback;
  }

  return children;
};

export default ErrorBoundary;
