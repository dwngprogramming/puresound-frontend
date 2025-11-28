import {Tooltip} from "@heroui/react";
import {useTranslations} from "next-intl";
import {LucideIcon} from "lucide-react";

interface ControlButtonProps {
  icon: LucideIcon
  label: string;
  isEnabled: boolean;
  size?: number;
}

const OptionButton = ({icon: Icon, label, isEnabled, size = 20}: ControlButtonProps) => {
  const tGeneral = useTranslations("General");

  return (
    <Tooltip
      classNames={{content: "bg-gray-800 text-xs"}}
      content={
        <div className="flex flex-col items-center">
          <div className="font-semibold mb-1">{label}</div>
          <div>{isEnabled ? "" : `(${tGeneral("comingSoon")})`}</div>
        </div>
      }
      delay={500}
      closeDelay={0}
      placement="top"
    >
      <div className={`group py-1 px-2 ${isEnabled ? "cursor-pointer" : "cursor-not-allowed"}`}>
        <Icon
          size={size}
          className={`${
            isEnabled
              ? "text-gray-400 group-hover:scale-105 group-hover:text-white transition ease-in-out duration-300"
              : "text-gray-500"
          }`}
        />
      </div>
    </Tooltip>
  );
};

export default OptionButton;
