"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Định nghĩa type cho breakpoint
type Breakpoint = 'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// Interface cho context value
interface BreakpointContextValue {
  breakpoint: Breakpoint;
  mountedBreakpoint: boolean;
}

// Tạo context
const BreakpointContext = createContext<BreakpointContextValue | undefined>(undefined);

// Props cho Provider
interface BreakpointProviderProps {
  children: ReactNode;
}

// Provider component
export const BreakpointProvider: React.FC<BreakpointProviderProps> = ({ children }) => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('base');
  const [mountedBreakpoint, setMountedBreakpoint] = useState(false);

  useEffect(() => {
    const getBreakpoint = (width: number): Breakpoint => {
      if (width >= 1536) return '2xl';
      if (width >= 1280) return 'xl';
      if (width >= 1024) return 'lg';
      if (width >= 768) return 'md';
      if (width >= 640) return 'sm';
      return 'base';
    };

    const updateBreakpoint = () => {
      const currentWidth = window.innerWidth;
      const newBreakpoint = getBreakpoint(currentWidth);
      setBreakpoint(newBreakpoint);
    };

    // Debounce function
    const debounce = (func: Function, delay: number) => {
      let timeoutId: NodeJS.Timeout;
      return (...args: any[]) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(null, args), delay);
      };
    };

    // Tạo debounced version của updateBreakpoint
    const debouncedUpdateBreakpoint = debounce(updateBreakpoint, 50);

    // Update breakpoint ngay lập tức
    updateBreakpoint();

    // Set mounted sau 0.5 giây
    const mountTimer = setTimeout(() => {
      setMountedBreakpoint(true);
    }, 500);

    // Add event listener cho resize với debounce
    window.addEventListener('resize', debouncedUpdateBreakpoint);

    // Cleanup
    return () => {
      clearTimeout(mountTimer);
      window.removeEventListener('resize', debouncedUpdateBreakpoint);
    };
  }, []);

  const value: BreakpointContextValue = {
    breakpoint,
    mountedBreakpoint,
  };

  return (
    <BreakpointContext.Provider value={value}>
      {children}
    </BreakpointContext.Provider>
  );
};

// Custom hook để sử dụng context
export const useBreakpoint = (): BreakpointContextValue => {
  const context = useContext(BreakpointContext);

  if (context === undefined) {
    throw new Error('useBreakpoint must be used within a BreakpointProvider');
  }

  return context;
};

// Export type để sử dụng ở nơi khác
export type { Breakpoint, BreakpointContextValue };
