'use client';

import {useTranslations} from "next-intl";
import LibraryFilter from "@/components/Listener/Common/Library/LibraryFilter";
import React, {useState} from "react";
import {Button, Divider, Tooltip} from "@heroui/react";
import {
  AlignJustify,
  ArrowDown,
  ArrowUp,
  Grip,
  LayoutGrid,
  List,
  ListCheck,
  ListMusic,
  Plus,
  Search
} from "lucide-react";
import useClickOutside from "@/hooks/util/useClickOutside";

interface SortProps {
  sortBy: 'recentlyPlayed' | 'recentlyAdded' | 'alphabetical' | 'creator';
  sortDir: 'asc' | 'desc';
  viewAs: 'compactList' | 'defaultList' | 'compactGrid' | 'defaultGrid';
}

const MyLibrary = () => {
  const t = useTranslations('Listener.MyLibrary');
  const [currentFilter, setCurrentFilter] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isSorting, setIsSorting] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [sortOptions, setSortOptions] = useState<SortProps>({
    sortBy: 'recentlyPlayed',
    sortDir: 'desc',
    viewAs: 'defaultList'
  });
  const sortDropdownRef = useClickOutside(() => setIsSorting(false), isSorting);
  const createDropdownRef = useClickOutside(() => setIsCreating(false), isCreating);
  const searchInputRef = useClickOutside(() => setIsSearching(false), isSearching);

  const sortByOptions = [
    {key: 'recentlyPlayed', value: t('sortOptions.sortBy.recentlyPlayed')},
    {key: 'recentlyAdded', value: t('sortOptions.sortBy.recentlyAdded')},
    {key: 'alphabetical', value: t('sortOptions.sortBy.alphabetical')},
    {key: 'creator', value: t('sortOptions.sortBy.creator')}
  ];

  const icons = [
    {key: "compactList", icon: <AlignJustify size={16}/>, value: t('sortOptions.viewAs.compactList')},
    {key: "defaultList", icon: <List size={16}/>, value: t('sortOptions.viewAs.defaultList')},
    {key: "compactGrid", icon: <Grip size={16}/>, value: t('sortOptions.viewAs.compactGrid')},
    {key: "defaultGrid", icon: <LayoutGrid size={16}/>, value: t('sortOptions.viewAs.defaultGrid')}
  ]

  const handleFilter = (type: string) => {
    if (currentFilter === type)
      setCurrentFilter('');
    else
      setCurrentFilter(type);
  }

  const handleCreate = () => {
    setIsCreating(state => !state);
  }

  const handleSortButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSorting(prev => !prev);
  }

  const handleSortBy = (sortBy: 'recentlyPlayed' | 'recentlyAdded' | 'alphabetical' | 'creator') => {
    setSortOptions(prev => ({
      ...prev,
      sortBy: sortBy
    }))
  }

  const handleSortDir = () => {
    setSortOptions(prev => ({
      ...prev,
      sortDir: prev.sortDir === 'asc' ? 'desc' : 'asc'
    }))
  }

  const handleViewAs = (viewAs: 'compactList' | 'defaultList' | 'compactGrid' | 'defaultGrid') => {
    setSortOptions(prev => ({
      ...prev,
      viewAs: viewAs
    }))
  }

  const handleOpenSearch = () => {
    if (!isSearching) setIsSearching(true);
  }

  return (
    <aside id="sidebar" className="fixed left-0 top-20 bottom-20 w-76 ml-2 px-4 py-3 lg:px-6 lg:py-5 bg-neutral-900/60 z-40 rounded-2xl
                            transform -translate-x-full lg:translate-x-0 transition-transform duration-300 ease-in-out">
      <div className="flex items-center justify-between">
        <p className="font-bold text-lg">{t('title')}</p>
        <div className="relative">
          <Button
            size="sm"
            className="relative rounded-full font-bold text-[14px] py-1 px-5 bg-blue-500/70 hover:bg-blue-500"
            onPress={handleCreate}
          >
            <Plus
              size={16}
              className={`transition-transform duration-300 ${isCreating ? 'rotate-45' : 'rotate-0'}`}
            />
            {t('create.title')}
          </Button>

          <div
            ref={createDropdownRef}
            className={`absolute flex flex-col w-max p-1 top-9 left-0 z-50 bg-primary-600 rounded-md transition ease-in-out duration-300
             ${isCreating ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <div
              className="flex items-center gap-4 px-3 py-2 cursor-pointer hover:bg-blue-400/40 rounded-md transition ease-in-out duration-300">
              <ListMusic/>
              <div className="flex flex-col mr-4">
                <p className="font-bold">{t('create.playlist.label')}</p>
                <p className="text-neutral-400 text-sm">{t('create.playlist.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LibraryFilter
        className="my-4"
        currentFilter={currentFilter}
        handleFilter={handleFilter}
      />

      <div className="flex items-center justify-between">
        <div
          ref={searchInputRef}
          className="relative">
          <input
            type="text"
            className={`h-8 pl-8 bg-neutral-600/80 rounded-lg transition-all ease-in-out duration-300
            ${isSearching ? 'w-50 opacity-100' : 'w-0 opacity-0 pointer-events-none'}
            `}
          />
          <div
            className={`absolute -top-[1px] left-0 cursor-pointer p-2 transition ease-in-out duration-300 rounded-full
             ${isSearching ? 'pointer-event-none cursor-default text-gray-200' : 'text-gray-400 hover:bg-neutral-700 hover:text-gray-200'}`}
            onClick={handleOpenSearch}
          >
            <Search size={18}/>
          </div>
        </div>

        <div className="relative">
          <div
            className="relative flex items-end gap-2 text-gray-400 cursor-pointer transition ease-in-out duration-300 hover:text-gray-200 hover:scale-[102%]"
            onClick={(e) => handleSortButtonClick(e)}>

            <p className={`absolute right-6 bottom-0 text-[13px] whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out
             ${isSearching ? 'opacity-0 pointer-events-none transform translate-x-2' : 'max-w-fit opacity-100 transform translate-x-0'}`}>
              {t(`sortOptions.sortBy.${sortOptions.sortBy}`)}
            </p>

            <div className="static">
              {currentFilter === '' ? <List size={18}/> : <ListCheck size={18}/>}
            </div>
          </div>

          <div
            ref={sortDropdownRef}
            className={`absolute w-50 px-1 py-4 bg-primary-800/80 shadow-lg shadow-gray-800 rounded-xl right-0 top-8 z-10 transition-all duration-500 ease-in-out
          ${isSorting ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <div className="flex flex-col">
              <p className="text-xs text-neutral-400 font-bold mb-1.5 pl-3">{t('sortOptions.sortBy.label')}</p>
              {sortByOptions.map((option) => (
                <div
                  key={option.key}
                  className="flex justify-between items-center cursor-pointer pl-3 pr-2 py-2 transition ease-in-out duration-300 hover:bg-neutral-500/30"
                  onClick={() => handleSortBy(option.key as SortProps['sortBy'])}
                >
                  <p className={`text-sm ${option.key === sortOptions.sortBy ? "text-blue-400" : "text-neutral-300"}`}>
                    {option.value}
                  </p>
                  {
                    option.key === sortOptions.sortBy ?
                      (sortOptions.sortDir === 'desc' ?
                          <ArrowDown
                            size={18}
                            className="text-blue-400"
                            onClick={handleSortDir}
                          /> :
                          <ArrowUp
                            size={18}
                            className="text-blue-400"
                            onClick={handleSortDir}
                          />
                      ) : null
                  }
                </div>
              ))}
            </div>

            <Divider className="my-4 px-3 text-neutral-500 h-[0.5px]"/>

            <div className="flex flex-col gap-2">
              <p className="text-xs text-neutral-400 font-bold mb-0.5 pl-3">{t('sortOptions.viewAs.label')}</p>
              <div className="flex items-center justify-between bg-blue-900/40 mx-3 p-1 rounded-md">
                {icons.map((icon) => (
                  <Tooltip
                    key={icon.key}
                    content={icon.value}
                    delay={1000}
                    closeDelay={0}
                    classNames={{content: 'bg-blue-800 text-neutral-200 text-xs'}}
                  >
                    <button
                      className={`px-3 py-2 rounded-md cursor-pointer hover:text-neutral-300 transform ease-in-out duration-300
                    ${icon.key === sortOptions.viewAs ? "text-neutral-50 bg-blue-600/70" : "text-neutral-400"}`}
                      onClick={() => handleViewAs(icon.key as SortProps['viewAs'])}
                    >
                      {icon.icon}
                    </button>
                  </Tooltip>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default MyLibrary;
