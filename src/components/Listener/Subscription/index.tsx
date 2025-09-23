"use client"

import {useTranslations} from "next-intl";
import IndividualSubscription from "@/components/Listener/Subscription/IndividualSubscription";
import StudentSubscription from "@/components/Listener/Subscription/StudentSubscription";
import {Check} from "lucide-react";

const Subscription = () => {
  const t = useTranslations("Listener.Premium");

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2>{t('title')}</h2>
        <p className="text-gray-400 text-[14px]">{t('description')}</p>
      </div>

      {/* Individual */}
      <IndividualSubscription/>

      {/* Student */}
      <StudentSubscription/>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2>{t('benefits.title')}</h2>
          <p className="text-gray-400 text-[14px]">{t('benefits.description')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex gap-2 bg-primary-600 p-3 rounded-2xl">
            <Check size={16} className="mt-2"/>
            <div className="flex flex-col gap-1">
              <p className="text-gray-200 text-lg">{t('benefits.adFree.title')}</p>
              <p className="text-gray-400 text-sm">{t('benefits.adFree.description')}</p>
            </div>
          </div>

          <div className="flex gap-2 bg-primary-600 p-3 rounded-2xl">
            <Check size={16} className="mt-2"/>
            <div className="flex flex-col gap-1">
              <p className="text-gray-200 text-lg">{t('benefits.weatherPlaylist.title')}</p>
              <p className="text-gray-400 text-sm">{t('benefits.weatherPlaylist.description')}</p>
            </div>
          </div>

          <div className="flex gap-2 bg-primary-600 p-3 rounded-2xl">
            <Check size={16} className="mt-2"/>
            <div className="flex flex-col gap-1">
              <p className="text-gray-200 text-lg">{t('benefits.offline.title')}</p>
              <p className="text-gray-400 text-sm">{t('benefits.offline.description')}</p>
            </div>
          </div>

          <div className="flex gap-2 bg-primary-600 p-3 rounded-2xl">
            <Check size={16} className="mt-2"/>
            <div className="flex flex-col gap-1 ">
              <p className="text-gray-200 text-lg">{t('benefits.highQuality.title')}</p>
              <p className="text-gray-400 text-sm">{t('benefits.highQuality.description')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Subscription;
