import {Button, Card, CardBody, CardFooter, CardHeader, Chip} from "@heroui/react";
import PuresoundLogo from "@/components/Utility/PuresoundLogo";
import {Check} from "lucide-react";
import {useTranslations} from "next-intl";

const IndividualSubscription = () => {
  const t = useTranslations("Listener.Premium");

  return (
    <div className="flex flex-col gap-6">
      <h3 className="font-bold">{t('plans.type.individual')}</h3>
      <div className="grid grid-cols-4 gap-3">
        <Card className="p-4 flex flex-col bg-blue-950 hover:scale-105 transition ease-in-out duration-300">
          <CardHeader className="flex flex-col gap-2 items-start">
            <div className="flex items-center gap-1">
              <PuresoundLogo size={36}/>
              <p className="text-[14px] font-bold text-premium-500">Premium</p>
            </div>
            <p className="font-bold text-2xl">{t('plans.monthly.individual.title')}</p>
            <p className="text-gray-400 text-sm">{t('plans.monthly.individual.description')}</p>
          </CardHeader>
          <CardBody className="flex flex-col gap-2">
            <p className="text-xl font-bold">{t('plans.monthly.individual.price', {price: "500.000đ"})}</p>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <Check size={14} className="text-gray-400"/>
                <p className="text-gray-400 text-[14px]">{t('plans.basePolicy.subscription')}</p>
              </div>
              <div className="flex items-center gap-1">
                <Check size={14} className="text-gray-400"/>
                <p className="text-gray-400 text-[14px]">{t('plans.basePolicy.cancel')}</p>
              </div>
              <div className="flex items-center gap-1">
                <Check size={14} className="text-gray-400"/>
                <p className="text-gray-400 text-[14px]">{t('plans.basePolicy.vat')}</p>
              </div>
            </div>
          </CardBody>
          <CardFooter>
            <Button
              className="relative overflow-hidden bg-gray-200 hover:bg-premium-600 text-zinc-300 hover:text-gray-200 font-semibold transition-all ease-in-out duration-500 w-full group">
              {/* Thêm các hiệu ứng shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1200 ease-out"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-out delay-200"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-yellow-400/30 via-yellow-300/40 to-yellow-400/30 transition-opacity duration-500"></div>
              {/* Text với z-index cao */}
              <span className="relative z-10 text-gray-900">
                  {t('subscribe')}
                </span>
            </Button>
          </CardFooter>
        </Card>

        <Card className="p-4 flex flex-col bg-blue-200 hover:scale-105 transition ease-in-out duration-300">
          <CardHeader className="flex flex-col gap-2 items-start">
            <div className="flex items-center gap-1">
              <PuresoundLogo size={36} dark={false}/>
              <p className="text-[14px] font-bold text-premium-600">Premium</p>
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="font-bold text-2xl text-neutral-950">{t('plans.quarterly.individual.title')}</p>
              <Chip
                size="sm"
                classNames={{base: 'bg-gradient-to-br from-gray-800/70 via-gray-900/70 via-gray-700/70 to-gray-900/90'}}
              >
                {t('plans.popular')}
              </Chip>
            </div>
            <p className="text-neutral-800 text-sm">{t('plans.quarterly.individual.description')}</p>
          </CardHeader>
          <CardBody className="flex flex-col gap-2">
            <p className="text-xl font-bold text-neutral-950">{t('plans.quarterly.individual.price', {price: "500.000đ"})}</p>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <Check size={14} className="text-neutral-800"/>
                <p className="text-neutral-800 text-[14px]">{t('plans.basePolicy.subscription')}</p>
              </div>
              <div className="flex items-center gap-1">
                <Check size={14} className="text-neutral-800"/>
                <p className="text-neutral-800 text-[14px]">{t('plans.basePolicy.cancel')}</p>
              </div>
              <div className="flex items-center gap-1">
                <Check size={14} className="text-neutral-900"/>
                <p className="text-neutral-800 text-[14px]">{t('plans.basePolicy.vat')}</p>
              </div>
            </div>
          </CardBody>
          <CardFooter>
            <Button
              className="relative overflow-hidden bg-neutral-950 hover:bg-premium-600 text-zinc-300 hover:text-neutral-950 font-semibold transition-all ease-in-out duration-500 w-full group">
              {/* Thêm các hiệu ứng shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1200 ease-out"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-out delay-200"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-yellow-400/30 via-yellow-300/40 to-yellow-400/30 transition-opacity duration-500"></div>
              {/* Text với z-index cao */}
              <span className="relative z-10">
                  {t('subscribe')}
                </span>
            </Button>
          </CardFooter>
        </Card>

        <Card className="p-4 flex flex-col bg-blue-950 hover:scale-105 transition ease-in-out duration-300">
          <CardHeader className="flex flex-col gap-2 items-start">
            <div className="flex items-center gap-1">
              <PuresoundLogo size={36}/>
              <p className="text-[14px] font-bold text-premium-500">Premium</p>
            </div>
            <p className="font-bold text-2xl">{t('plans.biannually.individual.title')}</p>
            <p className="text-gray-400 text-sm">{t('plans.biannually.individual.description')}</p>
          </CardHeader>
          <CardBody className="flex flex-col gap-2">
            <p className="text-xl font-bold">{t('plans.biannually.individual.price', {price: "500.000đ"})}</p>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <Check size={14} className="text-gray-400"/>
                <p className="text-gray-400 text-[14px]">{t('plans.basePolicy.subscription')}</p>
              </div>
              <div className="flex items-center gap-1">
                <Check size={14} className="text-gray-400"/>
                <p className="text-gray-400 text-[14px]">{t('plans.basePolicy.cancel')}</p>
              </div>
              <div className="flex items-center gap-1">
                <Check size={14} className="text-gray-400"/>
                <p className="text-gray-400 text-[14px]">{t('plans.basePolicy.vat')}</p>
              </div>
            </div>
          </CardBody>
          <CardFooter>
            <Button
              className="relative overflow-hidden bg-gray-200 hover:bg-premium-600 text-zinc-300 hover:text-gray-200 font-semibold transition-all ease-in-out duration-500 w-full group">
              {/* Thêm các hiệu ứng shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1200 ease-out"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-out delay-200"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-yellow-400/30 via-yellow-300/40 to-yellow-400/30 transition-opacity duration-500"></div>
              {/* Text với z-index cao */}
              <span className="relative z-10 text-gray-900">
                  {t('subscribe')}
                </span>
            </Button>
          </CardFooter>
        </Card>

        <Card className="p-4 flex flex-col bg-blue-950 hover:scale-105 transition ease-in-out duration-300">
          <CardHeader className="flex flex-col gap-2 items-start">
            <div className="flex items-center gap-1">
              <PuresoundLogo size={36}/>
              <p className="text-[14px] font-bold text-premium-500">Premium</p>
            </div>
            <p className="font-bold text-2xl">{t('plans.annually.individual.title')}</p>
            <p className="text-gray-400 text-sm">{t('plans.annually.individual.description')}</p>
          </CardHeader>
          <CardBody className="flex flex-col gap-2">
            <p className="text-xl font-bold">{t('plans.annually.individual.price', {price: "500.000đ"})}</p>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <Check size={14} className="text-gray-400"/>
                <p className="text-gray-400 text-[14px]">{t('plans.basePolicy.subscription')}</p>
              </div>
              <div className="flex items-center gap-1">
                <Check size={14} className="text-gray-400"/>
                <p className="text-gray-400 text-[14px]">{t('plans.basePolicy.cancel')}</p>
              </div>
              <div className="flex items-center gap-1">
                <Check size={14} className="text-gray-400"/>
                <p className="text-gray-400 text-[14px]">{t('plans.basePolicy.vat')}</p>
              </div>
            </div>
          </CardBody>
          <CardFooter>
            <Button
              className="relative overflow-hidden bg-gray-200 hover:bg-premium-600 text-zinc-300 hover:text-gray-200 font-semibold transition-all ease-in-out duration-500 w-full group">
              {/* Thêm các hiệu ứng shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1200 ease-out"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-out delay-200"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-yellow-400/30 via-yellow-300/40 to-yellow-400/30 transition-opacity duration-500"></div>
              {/* Text với z-index cao */}
              <span className="relative z-10 text-gray-900">
                  {t('subscribe')}
                </span>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default IndividualSubscription;
