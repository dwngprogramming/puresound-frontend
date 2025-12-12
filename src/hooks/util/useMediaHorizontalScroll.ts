import { useRef, useState, useEffect, useCallback } from 'react';

export const useMediaHorizontalScroll = (dependencies: any = []) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  
  // Main logic to determine visibility of scroll buttons
  const checkScrollPosition = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = el;
    
    // Hide both buttons if content fits perfectly (no scrolling needed)
    if (scrollWidth <= clientWidth) {
      setShowLeft(false);
      setShowRight(false);
      return;
    }
    
    // Show left button if we are not at the start
    // Add threshold to accept 2px wrong calculations
    const THRESHOLD = 2;
    setShowLeft(scrollLeft > THRESHOLD);
    
    // Show right button if we are not at the end
    // Using Math.ceil and -1 to accommodate fractional pixel values on high-DPI screens
    setShowRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 1);
  }, []);
  
  // Handler for button click scrolling
  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    
    // Scroll amount set to 45% of the visible container width
    const scrollAmount = el.clientWidth * 0.45;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };
  
  // Effect 1: Attach native scroll listener to sync state during manual scrolling
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    
    el.addEventListener('scroll', checkScrollPosition);
    checkScrollPosition(); // Initial check
    
    return () => el.removeEventListener('scroll', checkScrollPosition);
  }, [checkScrollPosition]);
  
  // Effect 2: Handle layout changes (ResizeObserver) and data updates
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    
    // Use ResizeObserver to detect container size changes (better than window 'resize')
    const resizeObserver = new ResizeObserver(() => {
      checkScrollPosition();
    });
    
    resizeObserver.observe(el);
    checkScrollPosition();
    
    // Check multiple times to handle dynamic content rendering (e.g., images loading)
    const timeoutIds: NodeJS.Timeout[] = [];
    [50, 150, 300].forEach(ms => {
      const id = setTimeout(checkScrollPosition, ms);
      timeoutIds.push(id);
    });
    
    return () => {
      resizeObserver.disconnect();
      timeoutIds.forEach(clearTimeout);
    };
  }, [checkScrollPosition, ...dependencies]);
  
  return {
    scrollRef,
    showLeft,
    showRight,
    scrollLeft: () => scroll('left'),
    scrollRight: () => scroll('right'),
  };
};