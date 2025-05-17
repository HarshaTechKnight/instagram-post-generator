// src/components/LoadingDots.tsx
"use client";

import type { FC } from 'react';

const LoadingDots: FC = () => {
  return (
    <div className="flex space-x-2 justify-center items-center" role="status" aria-live="polite">
      <span className="sr-only">Loading...</span>
      <div className="h-2.5 w-2.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-2.5 w-2.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-2.5 w-2.5 bg-primary rounded-full animate-bounce"></div>
    </div>
  );
};

export default LoadingDots;
