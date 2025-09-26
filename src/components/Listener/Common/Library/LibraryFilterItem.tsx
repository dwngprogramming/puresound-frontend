import {Chip} from "@heroui/react";
import {useTranslations} from "next-intl";

interface FilterItemProps {
  type: string;
  currentFilter: string;
  handleFilter: (type: string) => void;
}

const LibraryFilterItem = (props: FilterItemProps) => {
  const t = useTranslations('Listener.MyLibrary');
  return (
    <Chip
      classNames={{
        base: `cursor-pointer text-white font-semibold transition ease-in-out duration-300 hover:bg-neutral-500 text-[13px]
        ${props.currentFilter === props.type && 'bg-blue-300 text-primary-900 hover:bg-blue-400'}`,
      }}
      onClick={() => props.handleFilter(props.type)}
    >
      {t(props.type)}
    </Chip>
  );
}

export default LibraryFilterItem;
