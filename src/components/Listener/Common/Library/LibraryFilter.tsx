import LibraryFilterItem from "@/components/Listener/Common/Library/LibraryFilterItem";
import useHorizontalScroll from "@/hooks/util/useHorizontalScroll";
import {ChevronLeft, ChevronRight} from "lucide-react";

interface FilterProps {
  className: string;
  currentFilter: string;
  handleFilter: (type: string) => void;
}

const LibraryFilter = (props: FilterProps) => {
  const mockFilters = ['playlist', 'artist', 'album', 'liked', 'local'];
  const {
    containerRef,
    showLeftButton,
    showRightButton,
    scrollToStart,
    scrollToEnd
  } = useHorizontalScroll();

  return (
    <div className={`relative ${props.className}`}>
      {/* Nút cuộn trái */}
      {showLeftButton && (
        <div className="absolute -left-[1px] top-0 z-10 w-12 h-full bg-gradient-to-r from-neutral-900 via-neutral-900/80 to-transparent rounded-l-full flex items-center justify-start">
          <button
            className="rounded-full p-1 transition ease-in-out duration-300 bg-neutral-800 hover:bg-neutral-500 cursor-pointer"
            onClick={scrollToStart}
          >
            <ChevronLeft size={20}/>
          </button>
        </div>
      )}

      {/* Container scroll */}
      <div
        ref={containerRef}
        className="flex flex-1 gap-2 overflow-x-auto w-full no-scrollbar rounded-full relative scroll-smooth"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {mockFilters.map((filter) => (
          <LibraryFilterItem
            key={filter}
            type={filter}
            currentFilter={props.currentFilter}
            handleFilter={props.handleFilter}
          />
        ))}
      </div>

      {/* Nút cuộn phải */}
      {showRightButton && (
        <div className="absolute -right-[1px] top-0 z-10 w-12 h-full bg-gradient-to-l from-neutral-900 via-neutral-900/80 to-transparent rounded-r-full flex items-center justify-end">
          <button
            className="rounded-full p-1 transition ease-in-out duration-300 bg-neutral-800 hover:bg-neutral-500 cursor-pointer"
            onClick={scrollToEnd}
          >
            <ChevronRight size={20}/>
          </button>
        </div>
      )}
    </div>
  );
}

export default LibraryFilter;
