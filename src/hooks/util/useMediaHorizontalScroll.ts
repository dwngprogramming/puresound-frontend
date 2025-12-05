import {useRef, useState, useEffect, useCallback} from 'react';

export const useMediaHorizontalScroll = (dependencies: any = []) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  
  // Hàm kiểm tra vị trí để ẩn/hiện nút
  const checkScrollPosition = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    
    const {scrollLeft, scrollWidth, clientWidth} = el;
    
    // Hiện nút trái nếu đã scroll được > 0
    setShowLeft(scrollLeft > 0);
    
    // Hiện nút phải nếu chưa scroll hết (dùng sai số 1px cho chắc chắn)
    setShowRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
  }, []);
  
  // Hàm xử lý scroll
  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    
    // Tính toán khoảng cách scroll:
    // Lấy 45% chiều rộng container
    // Điều này tốt hơn fix cứng px vì nó responsive theo màn hình
    const scrollAmount = el.clientWidth * 0.45;
    
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };
  
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      // Kiểm tra ngay khi mount và khi resize
      checkScrollPosition();
      el.addEventListener('scroll', checkScrollPosition);
      window.addEventListener('resize', checkScrollPosition);
    }
    
    return () => {
      if (el) el.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, [checkScrollPosition, ...dependencies]); // Re-run khi data thay đổi
  
  return {
    scrollRef,
    showLeft,
    showRight,
    scrollLeft: () => scroll('left'),
    scrollRight: () => scroll('right'),
  };
};