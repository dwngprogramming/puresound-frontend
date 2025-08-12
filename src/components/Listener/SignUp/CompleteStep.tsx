import {useTranslations} from "next-intl";
import {CircleCheck} from "lucide-react";
import React from "react";
import {Button} from "@heroui/react";
import {useRouter} from "next/navigation";

const CompleteStep = () => {
  const t = useTranslations("Listener.SignUp");
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <CircleCheck className="text-green-500" size={80} />
      <h3 className="text-center">{t("complete.title")}</h3>
      <p className="text-gray-400 whitespace-pre-line">{t("complete.description")}</p>
      <Button
        type="button"
        onPress={() => router.push("/login")}
        className="w-full mt-4 bg-blue-400 text-darkmode py-4 md:px-10 rounded-full font-bold border-gray-600"
      >
        {t("complete.backToLogin")}
      </Button>
    </div>
  );
};

export default CompleteStep;
