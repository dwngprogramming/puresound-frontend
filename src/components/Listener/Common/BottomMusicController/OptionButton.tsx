import {Tooltip} from "@heroui/react";
import {useTranslations} from "next-intl";
import {LucideIcon} from "lucide-react";

interface ControlButtonProps {
  icon: LucideIcon
  label: string;
  isEnabled: boolean;
  isActive?: boolean;
  size?: number;
  onClick?: () => void;
  iconClassname?: string;
}

const OptionButton = ({
                        icon: Icon,
                        label,
                        isEnabled,
                        isActive,
                        size = 20,
                        onClick,
                      }: ControlButtonProps) => {
  const tGeneral = useTranslations("General");
  
  const handleClick = () => {
    if (isEnabled && onClick) {
      onClick();
    }
  };
  
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
              ? isActive ? "group-hover:scale-105 text-blue-400" :
                "text-gray-400 group-hover:scale-105 group-hover:text-white transition ease-in-out duration-300"
              : "text-gray-500"
          }`}
          onClick={handleClick}
        />
      </div>
    </Tooltip>
  );
};

export default OptionButton;
