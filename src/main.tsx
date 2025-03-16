import React, { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import './index.css';

const App = lazy(() => import('./App').then(module => ({ default: module.default })));

// Export for testing purposes
export { App };

const MobileLoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center p-4">
    <div className="w-12 h-12 border-4 border-dot-cyan/50 border-t-dot-cyan rounded-full animate-spin" />
  </div>
);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<div className="p-4 text-red-500">Something went wrong</div>}>
      <Suspense fallback={<MobileLoadingSpinner />}>
        <App />
      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>
);
