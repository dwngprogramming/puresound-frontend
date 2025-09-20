"use client";

import Image from "next/image";
import React, {useEffect, useState} from "react";
import {useTranslations} from "next-intl";
import VerifyEmailStep from "@/components/Listener/ForgetPassword/VerifyEmailStep";
import {useAutoRelogin} from "@/hooks/auth/useAutoRelogin";
import ComponentLoader from "@/components/ComponentLoader";
import Link from "next/link";
import OtpStep from "@/components/Listener/ForgetPassword/OtpStep";
import {useBreakpoint} from "@/context/breakpoint-auth-context";
import ResetPasswordStep from "@/components/Listener/ForgetPassword/ResetPasswordStep";

const ForgotPassword = () => {
  const t = useTranslations("Listener.ForgotPassword");
  const {breakpoint, mountedBreakpoint} = useBreakpoint();
  const [currentStep, setCurrentStep] = useState(1);
  const {relogin, isTryingRelogin} = useAutoRelogin();
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    // Auto check relogin if user access /forget-password
    relogin();
  }, []);

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  // Debounce for set email
  const handleSetEmail = (emailValue: string) => {
    setEmail(emailValue);
  }

  const isLoading = isTryingRelogin || !mountedBreakpoint;

  return isLoading ? (<ComponentLoader/>) : (
    <div className="auth-container">
      <>
        <Image src="/puresound-logo.svg" alt="logo" width={80} height={80}/>
        <div className="mb-6">
          <h1
            className={`text-darkmode ${breakpoint === 'base' ? 'text-2xl' : 'text-3xl'} font-bold inline`}>{t('title')}</h1>
        </div>

        {currentStep === 1 && (
          <>
            <VerifyEmailStep
              handleSetEmail={handleSetEmail}
              handleNextStep={handleNextStep}
            />

            <div className="text-center flex flex-col gap-2 mt-4">
              <div>
                <p className="text-gray-400 inline mr-1">{t('dontHaveAccount')}</p>
                <Link href="/signup" className="text-blue-400 inline">
                  {t('register')}
                </Link>
              </div>
            </div>
          </>
        )}

        {currentStep === 2 && (
          <OtpStep
            email={email}
            handleNextStep={handleNextStep}
          />
        )}

        {currentStep === 3 && (
          <ResetPasswordStep email={email} />
        )}

        <div className="text-center">
          <div>
            <Link href="/login" className="text-blue-400 inline text-sm sm:text-base">
              {t('login')}
            </Link>
          </div>
        </div>
      </>
    </div>
  );
}

export default ForgotPassword;
