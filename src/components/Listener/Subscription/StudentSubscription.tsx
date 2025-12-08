import {useTranslations} from "next-intl";
import {PlanResponse} from "@/models/listener/subscription/PlanResponse";
import StudentCard from "@/components/Listener/Subscription/StudentCard";

const StudentSubscription = ({plans, isLoading}: { plans: PlanResponse[], isLoading: boolean }) => {
  const t = useTranslations("Listener.Premium");

  return (
    <div className="flex flex-col gap-6">
      <h3 className="font-bold">{t('plans.type.student')}</h3>
      <div className="grid grid-cols-4 gap-3">
        {plans.map((plan) => (
          <StudentCard key={plan.id} plan={plan}/>
        ))}
      </div>
    </div>
  );
};

export default StudentSubscription;
