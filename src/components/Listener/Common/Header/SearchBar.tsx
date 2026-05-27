import {Input} from "@heroui/react";
import {PanelBottomClose, Search, X} from "lucide-react";
import {useTranslations} from "next-intl";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import SearchSuggestionDropdown from "@/components/Listener/Common/Header/SearchSuggestionDropdown";
import {
  searchSuggestionMockResponse,
  SearchSuggestionResponse
} from "@/components/Listener/Common/Header/searchSuggestionMock";
import useClickOutside from "@/hooks/util/useClickOutside";

const SearchBar = () => {
  const t = useTranslations('Listener.Common');
  const inputRef = useRef<HTMLInputElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasShownInitialSkeletonRef = useRef(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const normalizedQuery = debouncedSearchQuery.trim().toLowerCase();

  const closeDropdown = useCallback(() => {
    setVisible(false);

    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }

    closeTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
      closeTimeoutRef.current = null;
    }, 300);
  }, []);

  const searchWrapperRef = useClickOutside(closeDropdown, isDropdownOpen);
  
  // Clean up
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }

      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    }
  }, []);
  
  // Debounce for searching
  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    if (!searchQuery.trim()) {
      setDebouncedSearchQuery('');
      setIsSearchLoading(false);
      debounceTimeoutRef.current = null;
      return;
    }

    const shouldShowSkeleton = !hasShownInitialSkeletonRef.current;
    setIsSearchLoading(shouldShowSkeleton);
    debounceTimeoutRef.current = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setIsSearchLoading(false);
      hasShownInitialSkeletonRef.current = true;
      debounceTimeoutRef.current = null;
    }, 500);
  }, [searchQuery]);

  const openDropdown = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    setIsDropdownOpen(true);
    setVisible(false);
    setTimeout(() => setVisible(true), 10);
  }

  const handleSearchQueryChange = (value: string) => {
    setSearchQuery(value);

    if (value.trim()) {
      openDropdown();
      return;
    }

    setDebouncedSearchQuery('');
    setIsSearchLoading(false);
    closeDropdown();
  }

  const filteredSuggestions = useMemo<SearchSuggestionResponse>(() => {
    const suggestions = searchSuggestionMockResponse.data;

    if (!normalizedQuery) {
      return suggestions;
    }

    const includesQuery = (value: string) => value.toLowerCase().includes(normalizedQuery);

    return {
      tracks: suggestions.tracks.filter((track) =>
        includesQuery(track.title) ||
        track.artists.some((artist) => includesQuery(artist.stageName)) ||
        includesQuery(track.album.name)
      ),
      artists: suggestions.artists.filter((artist) => includesQuery(artist.stageName)),
      albums: suggestions.albums.filter((album) =>
        includesQuery(album.name) ||
        album.artists.some((artist) => includesQuery(artist.stageName))
      ),
    };
  }, [normalizedQuery]);

  const handleClearSearch = () => {
    setSearchQuery('');
    setDebouncedSearchQuery('');
    setIsSearchLoading(false);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
      debounceTimeoutRef.current = null;
    }

    closeDropdown();
    inputRef.current?.focus();
  }

  const handleSelectSuggestion = (value: string) => {
    setSearchQuery(value);
    setDebouncedSearchQuery(value);
    setIsSearchLoading(false);
    closeDropdown();
  }

  const handleFullSearch = () => {
    const query = searchQuery.trim();

    if (!query) {
      return;
    }

    // TODO: Integrate full search result rendering/navigation when that surface exists.
    closeDropdown();
  }

  const renderEndContent = () => {
    return (
      <div className="flex items-center space-x-1">
        {searchQuery !== '' && (
          <button
            type="button"
            aria-label={t('clearSearch')}
            className="cursor-pointer"
            onMouseDown={(event) => event.preventDefault()}
            onClick={handleClearSearch}
          >
            <X size={20} className="text-neutral-400 hover:text-neutral-300"/>
          </button>
        )}

        <button
          type="button"
          aria-label={t('closeSearchSuggestions')}
          className="pl-2 border-l border-neutral-500 cursor-pointer"
          onMouseDown={(event) => event.preventDefault()}
          onClick={closeDropdown}
        >
          <PanelBottomClose size={20} className="text-neutral-400 hover:text-neutral-300"/>
        </button>
      </div>
    );
  }

  return (
    <div ref={searchWrapperRef} className="relative w-full">
      <Input
        ref={inputRef}
        value={searchQuery}
        onValueChange={handleSearchQueryChange}
        classNames={{
          input: 'text-sm sm:text-base truncate',
          inputWrapper: 'h-12 sm:h-13 rounded-full bg-neutral-900/60'
        }}
        onFocus={() => {
          if (searchQuery.trim()) {
            openDropdown();
          }
        }}
        onBlur={(e) => {
          if (!e.relatedTarget || !searchWrapperRef.current?.contains(e.relatedTarget as Node)) {
            closeDropdown();
          }
        }}
        disableAnimation
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleFullSearch();
          }
        }}
        placeholder={t('searchPlaceholder')}
        startContent={<Search size={24} className="shrink-0 sm:size-[30px]"/>}
        endContent={renderEndContent()}
      />

      {isDropdownOpen && (
        <div
          className={`absolute right-0 top-13 z-50 w-full overflow-hidden rounded-xl border border-primary-500/50 bg-primary-700/95 shadow-xl shadow-black/35 backdrop-blur-md transition-all duration-300 ease-in-out ${
            visible ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
          }`}
          tabIndex={-1}
          onMouseDown={(e) => e.preventDefault()}
        >
          <SearchSuggestionDropdown
            suggestions={filteredSuggestions}
            isLoading={isSearchLoading}
            onSelect={handleSelectSuggestion}
          />
        </div>
      )}
    </div>
  );
}

export default SearchBar;
