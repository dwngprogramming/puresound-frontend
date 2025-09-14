import {Input} from "@heroui/react";
import {PanelBottomClose, Search, X} from "lucide-react";
import {useTranslations} from "next-intl";
import React, {useEffect, useRef, useState} from "react";

const SearchBar = () => {
  const t = useTranslations('Listener.Common');
  const searchWrapperRef = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (focused) {
      // Reset về false trước, sau đó set true để trigger transition
      setVisible(false);
      const timeout = setTimeout(() => setVisible(true), 10);
      return () => clearTimeout(timeout);
    } else {
      setVisible(false);
    }
  }, [focused]);

  const renderEndContent = () => {
    return (
      <div className="flex items-center space-x-1">
        {searchQuery !== '' && (
          <button className="cursor-pointer">
            <X className="text-neutral-400 hover:text-neutral-300"/>
          </button>
        )}

        <button className="pl-2 border-l border-neutral-500 cursor-pointer">
          <PanelBottomClose className="text-neutral-400 hover:text-neutral-300"/>
        </button>
      </div>
    );
  }

  return (
    <div ref={searchWrapperRef} className="relative">
      <Input
        classNames={{
          input: 'text-base',
          inputWrapper: 'h-13 rounded-full bg-neutral-900/60'
        }}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          // Kiểm tra xem blur có xảy ra do click bên trong wrapper không
          if (!e.relatedTarget || !searchWrapperRef.current?.contains(e.relatedTarget as Node)) {
            setFocused(false);
          }
        }}
        disableAnimation
        placeholder={t('searchPlaceholder')}
        startContent={<Search size={30}/>}
        endContent={renderEndContent()}
      />

      {focused && (
        <div
          className={`absolute w-full h-30 bg-primary-900/90 shadow-lg shadow-gray-800 rounded-xl right-0 top-13 z-10 transition-all duration-500 ease-in-out ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          tabIndex={-1} // Để có thể focus vào div này
          onMouseDown={(e) => e.preventDefault()} // Chặn việc mất focus của input
        >
        </div>
      )}
    </div>
  );
}

export default SearchBar;
