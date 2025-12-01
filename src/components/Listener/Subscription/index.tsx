"use client"

import {useTranslations} from "next-intl";
import IndividualSubscription from "@/components/Listener/Subscription/IndividualSubscription";
import StudentSubscription from "@/components/Listener/Subscription/StudentSubscription";
import PremiumBenefits from "@/components/Listener/Subscription/PremiumBenefits";
import {useQuery} from "@tanstack/react-query";
import listenerPublicApi from "@/apis/main/listener/listenerPublic.api";
import {useAppSelector} from "@/libs/redux/hooks";
import {useEffect, useState} from "react";
import {PlanResponse} from "@/models/listener/subscription/PlanResponse";
import {SubscriptionType} from "@/const/subscription/SubscriptionType";

const Subscription = () => {
  const t = useTranslations("Listener.Premium");
  const [individual, setIndividual] = useState<PlanResponse[]>([])
  const [student, setStudent] = useState<PlanResponse[]>([])
  const token = useAppSelector(state => state.auth.token);
  // TODO: Cần thêm stale time để tránh việc fetch lại data liên tục
  const {data, isLoading} = useQuery({
    queryKey: ['all-subscriptions', token],
    queryFn: async () => {
      const response = await listenerPublicApi.getAllPlans({
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined
        }
      })
      return response.data;
    }
  })

  useEffect(() => {
    if (data) {
      const individualPlans = data.filter(plan => plan.subscriptionType === SubscriptionType.INDIVIDUAL);
      const studentPlans = data.filter(plan => plan.subscriptionType === SubscriptionType.STUDENT);
      setIndividual(individualPlans);
      setStudent(studentPlans);
    }
  }, [data]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2>{t('title')}</h2>
        <p className="text-gray-400 text-[14px]">{t('description')}</p>
      </div>

      {/* Individual */}
      <IndividualSubscription
        plans={individual}
        isLoading={isLoading}
      />

      {/* Student */}
      <StudentSubscription
        plans={student}
        isLoading={isLoading}
      />

      {/* Benefits */}
      <PremiumBenefits/>
    </div>
  )
}

export default Subscription;
