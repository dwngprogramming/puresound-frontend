import {useRef, useEffect, useState, RefObject} from 'react';

interface UseHorizontalScrollReturn {
  containerRef: RefObject<HTMLDivElement | null>;
  showLeftButton: boolean;
  showRightButton: boolean;
  scrollToStart: () => void;
  scrollToEnd: () => void;
  scrollLeft: () => void;
  scrollRight: () => void;
}

const useHorizontalScroll = (): UseHorizontalScrollReturn => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

  // Kiểm tra vị trí scroll để hiển thị/ẩn nút
  const checkScrollButtons = () => {
    if (!containerRef.current) return;

    const {scrollLeft, scrollWidth, clientWidth} = containerRef.current;
    const maxScrollLeft = scrollWidth - clientWidth;

    setShowLeftButton(scrollLeft > 10);
    setShowRightButton(scrollLeft < maxScrollLeft - 10);
  };

  // Scroll với animation mượt
  const smoothScrollTo = (scrollPosition: number) => {
    if (!containerRef.current) return;

    containerRef.current.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  };

  // Cuộn về đầu
  const scrollToStart = () => {
    smoothScrollTo(0);
  };

  // Cuộn về cuối
  const scrollToEnd = () => {
    if (!containerRef.current) return;
    const maxScroll = containerRef.current.scrollWidth - containerRef.current.clientWidth;
    smoothScrollTo(maxScroll);
  };

  // Cuộn trái một khoảng
  const scrollLeft = () => {
    if (!containerRef.current) return;
    const currentScroll = containerRef.current.scrollLeft;
    const scrollAmount = containerRef.current.clientWidth * 0.8;
    smoothScrollTo(currentScroll - scrollAmount);
  };

  // Cuộn phải một khoảng
  const scrollRight = () => {
    if (!containerRef.current) return;
    const currentScroll = containerRef.current.scrollLeft;
    const scrollAmount = containerRef.current.clientWidth * 0.8;
    smoothScrollTo(currentScroll + scrollAmount);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Xử lý cuộn chỉ cho con lăn chuột
    const handleWheel = (e: WheelEvent) => {
      const {scrollWidth, clientWidth} = container;

      // Chỉ xử lý khi có thể scroll ngang
      if (scrollWidth <= clientWidth) return;

      // CHỈ xử lý con lăn chuột (deltaY) mà KHÔNG có deltaX
      // Touchpad cuộn ngang sẽ có deltaX, để trình duyệt xử lý tự nhiên
      if (Math.abs(e.deltaY) > 0 && Math.abs(e.deltaX) === 0 && !e.shiftKey) {
        // Đây là con lăn chuột
        e.preventDefault();
        const scrollSpeed = 2;
        const scrollAmount = e.deltaY * scrollSpeed;
        container.scrollLeft += scrollAmount;
        return;
      }

      // Xử lý Shift + con lăn chuột
      if (e.shiftKey && Math.abs(e.deltaY) > 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }

      // Để touchpad cuộn ngang (có deltaX) xử lý tự nhiên - KHÔNG preventDefault
    };

    // Lắng nghe sự kiện scroll để cập nhật trạng thái nút
    const handleScroll = () => {
      checkScrollButtons();
    };

    // Kiểm tra ban đầu và khi resize
    const handleResize = () => {
      checkScrollButtons();
    };

    // Thêm event listener với passive: false để có thể preventDefault
    container.addEventListener('wheel', handleWheel, {passive: false});
    container.addEventListener('scroll', handleScroll, {passive: true});
    window.addEventListener('resize', handleResize);

    // Kiểm tra trạng thái ban đầu
    setTimeout(checkScrollButtons, 100);

    // Observer để theo dõi thay đổi nội dung
    const resizeObserver = new ResizeObserver(() => {
      setTimeout(checkScrollButtons, 50);
    });
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, []);

  return {
    containerRef,
    showLeftButton,
    showRightButton,
    scrollToStart,
    scrollToEnd,
    scrollLeft,
    scrollRight
  };
};

export default useHorizontalScroll;
