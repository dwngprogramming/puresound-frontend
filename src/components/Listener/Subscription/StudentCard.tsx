import {PlanResponse} from "@/models/listener/subscription/PlanResponse";
import {useLocale, useTranslations} from "next-intl";
import {formattedPriceByCurrency} from "@/utils/formattedPriceByCurrency";
import {Button, Card, CardBody, CardFooter, CardHeader} from "@heroui/react";
import PuresoundLogo from "@/components/Utility/PuresoundLogo";
import {Check} from "lucide-react";

const StudentCard = ({plan}: { plan: PlanResponse }) => {
  const t = useTranslations("Listener.Premium");
  const locale = useLocale();
  const formattedPrice = formattedPriceByCurrency(plan.price, plan.currency, locale);
  const formattedBillingCycle = plan.billingCycle.toLowerCase();

  return (
    <Card className="p-4 flex flex-col bg-violet-950 hover:scale-105 transition ease-in-out duration-300">
      <CardHeader className="flex flex-col gap-2 items-start">
        <div className="flex items-center gap-1">
          <PuresoundLogo size={36}/>
          <p className="text-[14px] font-bold text-premium-500">Premium</p>
        </div>
        <p className="font-bold text-2xl">{t(`plans.${formattedBillingCycle}.student.title`)}</p>
        <p className="text-zinc-400 text-sm">{t(`plans.${formattedBillingCycle}.student.description`)}</p>
      </CardHeader>
      <CardBody className="flex flex-col gap-2">
        <p className="text-xl font-bold">{t(`plans.${formattedBillingCycle}.student.price`, {price: `${formattedPrice}`})}</p>
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <Check size={14} className="text-zinc-400"/>
            <p className="text-zinc-400 text-[14px]">{t('plans.basePolicy.student.verify')}</p>
          </div>
          <div className="flex items-center gap-1">
            <Check size={14} className="text-zinc-400"/>
            <p className="text-zinc-400 text-[14px]">{t('plans.basePolicy.student.oneTimePayment')}</p>
          </div>
          <div className="flex items-center gap-1">
            <Check size={14} className="text-zinc-400"/>
            <p className="text-zinc-400 text-[14px]">{t('plans.basePolicy.cancel')}</p>
          </div>
          <div className="flex items-center gap-1">
            <Check size={14} className="text-zinc-400"/>
            <p className="text-zinc-400 text-[14px]">{t('plans.basePolicy.vat')}</p>
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <Button
          className="relative overflow-hidden bg-gray-200 hover:bg-premium-600 text-zinc-400 hover:text-gray-200 font-semibold transition-all ease-in-out duration-500 w-full group">
          {/* Thêm các hiệu ứng shimmer */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1200 ease-out"></div>
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-out delay-200"></div>
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-yellow-400/30 via-yellow-300/40 to-yellow-400/30 transition-opacity duration-500"></div>
          {/* Text với z-index cao */}
          <span className="relative z-10 text-gray-900">
                  {t('subscribe')}
                </span>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default StudentCard;
