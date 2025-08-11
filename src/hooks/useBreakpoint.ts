import {useEffect, useState} from "react";

export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'>('base');
  const [mountedBreakpoint, setMountedBreakpoint] = useState(false);

  useEffect(() => {
    const getBreakpoint = (width: number): 'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' => {
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

    // Set mounted sau 0.2 giây
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
  }, []); // Removed mounted from dependency array

  return { breakpoint, mountedBreakpoint };
};
