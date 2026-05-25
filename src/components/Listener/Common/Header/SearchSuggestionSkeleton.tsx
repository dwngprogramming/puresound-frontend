import {Skeleton} from "@heroui/react";

const SearchSuggestionSkeleton = () => {
  return (
    <div className="max-h-[min(60vh,28rem)] overflow-hidden p-2">
      <div className="flex flex-col gap-1">
        {Array.from({length: 3}).map((_, index) => (
          <div
            key={index}
            className="grid w-full grid-cols-[2.75rem_1fr] items-center gap-3 rounded-lg px-2 py-2"
          >
            <Skeleton className="h-11 w-11 rounded-md bg-primary-500/40"/>

            <div className="flex min-w-0 flex-col gap-1">
              <Skeleton className="h-4 w-3/4 rounded-md bg-primary-500/40"/>
              <Skeleton className="h-3 w-1/2 rounded-md bg-primary-500/30"/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchSuggestionSkeleton;
