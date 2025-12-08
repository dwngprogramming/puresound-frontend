import {useRef, useEffect} from 'react';

export const useClickOutside = (onOutsideClick: () => void, isActive: boolean = true) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        // Đặt setTimeout để đảm bảo onOutsideClick được gọi sau các sự kiện onClick khác
        setTimeout(() => {
          onOutsideClick()
        }, 0);
      }
    };

    // Type là click chứ không phải mousedown để tránh việc onOutsideClick bị gọi trước các sự kiện onClick khác
    if (isActive) {
      document.addEventListener('click', handleClickOutside, true);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [onOutsideClick, isActive]);

  return ref;
};

export default useClickOutside;
