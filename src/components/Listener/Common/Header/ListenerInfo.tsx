import {Avatar, Divider} from "@heroui/react";
import React, {useEffect, useRef} from "react";
import {useAppSelector} from "@/libs/redux/hooks";
import {useTranslations} from "next-intl";
import {useRouter} from "next/navigation";
import {useLogout} from "@/hooks/auth/useLogout";
import {BookHeadphones, CircleUserRound, Crown, LogOut, Settings} from "lucide-react";

interface ListenerInfoProps {
  visible: boolean;
  handleVisible: (visible: boolean) => void;
}

const ListenerInfo = ({visible, handleVisible}: ListenerInfoProps) => {
  const t = useTranslations('Listener.Common');
  const containerRef = useRef<HTMLDivElement>(null);
  const authState = useAppSelector(state => state.auth);
  const navigator = useRouter();
  const logout = useLogout();
  const premium = false;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        handleVisible(false);
      }
    };

    if (visible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [visible]);

  return (
    <div className="relative group">
      {premium && (
        <div className={`absolute -top-3 left-8 z-50 transition-all duration-300 ease-in-out pointer-events-none
    ${visible
          ? 'opacity-100 scale-100'
          : 'opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100'
        }`}
        >
          <Crown size={14} className="text-yellow-400 drop-shadow-lg"/>
        </div>
      )}

      <div
        ref={containerRef}
        className={`ml-2 flex border-2 ${premium ? "border-yellow-400" : "border-primary-100"} items-center py-1 bg-neutral-700/80 rounded-full cursor-pointer
      transition-all duration-300 ease-in-out overflow-hidden relative
      ${visible
          ? 'px-4'
          : 'px-2 hover:px-4'
        }`}
        onClick={() => handleVisible(!visible)}
      >
        <Avatar
          size="sm"
          src="https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3467.jpg"
        />

        <div
          className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out
        ${visible
            ? 'ml-3 max-w-xs opacity-100'
            : 'ml-0 max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-3'
          }`}
        >
          <p className="font-semibold text-sm">{authState.principal?.fullname}</p>
          <p className="text-[12px] text-gray-400">dwnq.coding</p>
        </div>
      </div>
      {visible && (
        <div
          className={`absolute lg:min-w-[200px] border-1 ${premium ? "border-yellow-400" : "border-neutral-800/70"} bg-neutral-800/70 shadow-lg shadow-gray-800 rounded-xl right-0 top-12.5 z-[100] transition-all duration-500 ease-in-out`}
        >
          <div
            className="flex items-center space-x-2 px-4 py-2.5 text-sm hover:bg-neutral-600 transition-all duration-300 cursor-pointer rounded-t-xl"
            onClick={() => navigator.push("/me")}>
            <CircleUserRound size={22} className="text-neutral-400"/>
            <p>{t('me')}</p>
          </div>
          <div
            className="flex items-center space-x-2 px-4 py-2.5 text-sm hover:bg-neutral-600 transition-all duration-300 cursor-pointer">
            <BookHeadphones size={22} className="text-neutral-400"/>
            <p>{t('profile')}</p>
          </div>
          <div
            className="flex items-center space-x-2 px-4 py-2.5 text-sm hover:bg-neutral-600 transition-all duration-300 cursor-pointer"
          >
            <Settings size={22} className="text-neutral-400"/>
            <p>{t('settings')}</p>
          </div>
          <Divider className="bg-neutral-600"/>
          <div
            className="flex items-center space-x-2 px-4 py-2.5 text-sm hover:bg-neutral-600 transition-all duration-300 cursor-pointer rounded-b-xl"
            // Dùng onMouseDown để đồng bộ với click outside (cũng dùng onMouseDown)
            onMouseDown={logout}>
            <LogOut size={22} className="text-neutral-400"/>
            <p>{t('logout')}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListenerInfo;
