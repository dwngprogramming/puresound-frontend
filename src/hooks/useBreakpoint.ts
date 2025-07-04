import {useEffect, useState} from "react";

export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'>('base');
  const [mounted, setMounted] = useState(false);

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

    // Update breakpoint ngay lập tức
    updateBreakpoint();

    // Set mounted sau 1 giây
    const mountTimer = setTimeout(() => {
      setMounted(true);
    }, 500);

    // Add event listener cho resize
    window.addEventListener('resize', updateBreakpoint);

    // Cleanup
    return () => {
      clearTimeout(mountTimer);
      window.removeEventListener('resize', updateBreakpoint);
    };
  }, [mounted]);

  return { breakpoint, mounted };
};
