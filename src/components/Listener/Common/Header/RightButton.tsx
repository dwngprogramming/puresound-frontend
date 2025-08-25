import {Button} from "@heroui/react";
import {useTranslations} from "next-intl";
import {useRouter} from "next/navigation";

const RightButton = () => {
  const t = useTranslations('Listener.Common');
  const navigator = useRouter();

  return (
    <>
      <Button
        variant="bordered"
        onPress={() => navigator.push('/signup')}
        className="text-darkmode py-5 px-4 rounded-full justify-center items-center font-bold hover:text-darkmode border-gray-600
                hover:border-white">
        {t('signup')}
      </Button>

      <Button
        onPress={() => navigator.push('/login')}
        className="text-darkmode py-5 px-4 rounded-full justify-center items-center font-bold hover:text-darkmode bg-blue-500 border border-blue-500
                hover:border-blue-800 hover:bg-blue-800">
        {t('login')}
      </Button>
    </>
  )
}

export default RightButton;
