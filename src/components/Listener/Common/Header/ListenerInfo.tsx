import {Avatar, Button, Divider} from "@heroui/react";
import React, {useEffect, useRef} from "react";
import {useAppSelector} from "@/libs/redux/hooks";
import {useTranslations} from "next-intl";
import {useRouter} from "next/navigation";
import {useLogout} from "@/hooks/auth/useLogout";

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        handleVisible(false);
      }
    };

    // Chỉ add event listener khi popup đang hiển thị
    if (visible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup
    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [visible]);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className={`group ml-2 flex items-center py-1 bg-neutral-700/80 rounded-full cursor-pointer
      transition-all duration-300 ease-in-out overflow-hidden
      ${visible
          ? 'px-4' // Khi popup hiển thị - giữ expanded
          : 'px-2 hover:px-4' // Khi popup ẩn - cho phép hover effect
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
            ? 'ml-3 max-w-xs opacity-100' // Khi popup hiển thị - luôn expanded
            : 'ml-0 max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-3' // Khi popup ẩn - hover effect
          }`}
        >
          <p className="font-semibold text-sm">{authState.principal?.fullname}</p>
          <p className="text-[12px] text-gray-400">dwnq.coding</p>
        </div>

        {visible && (
          <div
            className={`absolute lg:min-w-[200px] bg-neutral-700/80 shadow-lg rounded-xl right-0 top-14 z-100 transition-all duration-500 ease-in-out`}
          >
            <div className="px-4 py-2 hover:bg-gray-500 rounded-t-xl"
                 onClick={() => navigator.push("/me")}>
              {t('me')}
            </div>
            <div className="px-4 py-2 hover:bg-gray-500">{t('profile')}</div>
            <div className="px-4 py-2 hover:bg-gray-500">{t('settings')}</div>
            <Divider/>
            <div className="px-4 py-2 hover:bg-gray-500 rounded-b-xl"
                 onClick={logout}>
              {t('logout')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListenerInfo;
