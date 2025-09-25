'use client';

import {useTranslations} from "next-intl";
import LibraryFilter from "@/components/Listener/Common/Library/LibraryFilter";
import {useState} from "react";

const MyLibrary = () => {
  const t = useTranslations('Listener.MyLibrary');
  const [currentFilter, setCurrentFilter] = useState('');

  const handleFilter = (type: string) => {
    if (currentFilter === type)
      setCurrentFilter('');
    else
      setCurrentFilter(type);
  }

  return (
    <aside id="sidebar" className="fixed left-0 top-20 bottom-20 w-76 ml-2 px-4 py-2 lg:px-6 lg:py-4 bg-neutral-900/60 z-40 rounded-2xl
                            transform -translate-x-full lg:translate-x-0 transition-transform duration-300 ease-in-out">
      <p className="font-bold text-lg">{t('title')}</p>

      <LibraryFilter
        className="mt-4"
        currentFilter={currentFilter}
        handleFilter={handleFilter}
      />


    </aside>
  );
}

export default MyLibrary;
