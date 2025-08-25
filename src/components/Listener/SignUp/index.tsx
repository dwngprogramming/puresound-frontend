"use client";

import {useLocale, useTranslations} from "next-intl";
import {Controller, FieldPath, FormProvider, useForm} from "react-hook-form";
import {SignUpData} from "@/types/auth.types";
import {yupResolver} from "@hookform/resolvers/yup";
import {createRegisterSchema} from "@/libs/validation/auth.validation";
import React, {useEffect, useMemo, useState} from "react";
import {useAutoRelogin} from "@/hooks/auth/useAutoRelogin";
import {useRouter} from "next/navigation";
import ComponentLoader from "@/components/ComponentLoader";
import Image from "next/image";
import {Button, Divider, Form, Input} from "@heroui/react";
import Link from "next/link";
import {handleFacebookLogin, handleGoogleLogin} from "@/utils/oAuth2Redirect";
import {useSignUp} from "@/hooks/auth/useSignUp";
import {SignupRequest} from "@/models/auth/SignupRequest";
import LabeledDivider from "@/components/Utility/LabeledDivider";
import StepIndicator from "@/components/Listener/SignUp/StepIndicator";
import PasswordStep from "@/components/Listener/SignUp/PasswordStep";
import InfoStep from "@/components/Listener/SignUp/InfoStep";
import {getLocalTimeZone, today} from "@internationalized/date";
import {Gender} from "@/const/Gender";
import VerifyStep from "@/components/Listener/SignUp/VerifyStep";
import authApi from "@/apis/auth/auth.api";
import {CircleCheckBig, LockKeyhole} from "lucide-react";
import CompleteStep from "@/components/Listener/SignUp/CompleteStep";
import {useBreakpoint} from "@/context/breakpoint-auth-context";
import {CheckExistsRequest} from "@/models/auth/CheckExistsRequest";

const SignUp = () => {
  const t = useTranslations("Listener.SignUp");
  const tValidation = useTranslations("Listener.SignUp.validation");
  const registerSchema = useMemo(() =>
    createRegisterSchema(tValidation), [tValidation]);
  const router = useRouter();
  const locale = useLocale();
  const {breakpoint, mountedBreakpoint} = useBreakpoint();
  const {relogin, isTryingRelogin} = useAutoRelogin(router);
  const signup = useSignUp();
  const [currentStep, setCurrentStep] = useState(0);  // Email tính là step 0
  const totalIndicatorSteps = 4;   // Không tính email step, vì không nằm trong indicator
  const todayDate = useMemo(() => today(getLocalTimeZone()), []);

  const reactFormMethods = useForm<SignUpData>({
    resolver: yupResolver(registerSchema),
    mode: 'onTouched',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      retypePassword: '',
      firstname: '',
      lastname: '',
      gender: Gender.MALE,
      dob: todayDate,
    },
  });

  const {
    control,
    handleSubmit,
    trigger,
    watch,
    setError,
    formState: {errors, isSubmitting}
  } = reactFormMethods;

  const stepFields: Record<number, FieldPath<SignUpData>[]> = {
    0: ['email'],
    1: ['password', 'retypePassword'],
    2: ['username', 'firstname', 'lastname', 'gender', 'dob'],
  };

  const stepTitles = ['email', t('step.password'), t('step.info'), t('step.verify'), t('step.complete')];

  useEffect(() => {
    // Auto check relogin if user access /signup
    relogin();
  }, []);

  const handleSignUp = async (data: SignUpData) => {
    const request: SignupRequest = {
      username: data.username,
      email: data.email,
      password: data.password,
      retypePassword: data.retypePassword,
      firstname: data.firstname,
      lastname: data.lastname,
      gender: data.gender,
      dob: data.dob.toString()
    };
    // Chạy tiến trình ngầm (Có gửi OTP)
    signup.mutate(request);
    await new Promise(resolve => setTimeout(resolve, 5000));
    setCurrentStep(prev => prev + 1);

    /*catch (error) {
    if (error instanceof AxiosError) {
      const data = error.response?.data.data;
      let message = tValidation('validationMessage');
      if (data) {
        const errorList = Object.entries(data)
          .map(([, value]) => `- ${value}`)
          .join('\n');

        message += errorList;
        dispatch(showErrorNotification(message));
      }
    }*/
  }

  const handleNextStep = async () => {
    const validateFields = stepFields[currentStep];
    const isValid = await trigger(validateFields); // Add this option
    if (isValid) {
      if (currentStep === 0) {
        const email = watch('email');
        const request: CheckExistsRequest = {
          field: email
        }
        const response = await authApi.checkEmail(request);
        if (response.data.exists) {
          setError('email', {
            message: tValidation('emailExists'),
          });
          return;
        }
      }
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const isLoadingPage = isTryingRelogin || !mountedBreakpoint;

  return isLoadingPage ? (<ComponentLoader/>) : (
    <div
      className="auth-container">
      <>
        <Image src="/puresound-logo.svg" alt="logo" width={80} height={80}/>
        {currentStep === 0 && (
          <div className="mb-6 flex flex-col items-center gap-2">
            <div
              className={`text-darkmode ${breakpoint === 'base' ? 'text-2xl' : 'text-3xl'} font-bold inline`}>{t('title')}</div>
            <div className="w-fit">
              <div
                className={`text-blue-300 ${breakpoint === 'base' ? 'text-2xl' : 'text-3xl'} font-bold inline`}> Pure
              </div>
              <div
                className={`text-gray-400 ${breakpoint === 'base' ? 'text-2xl' : 'text-3xl'} font-bold inline`}>Sound
              </div>
            </div>
          </div>
        )}

        <div className="mb-2">
        </div>

        {currentStep > 0 &&
          <>
            <StepIndicator
              currentStep={currentStep}
              totalSteps={4}
            />
          </>
        }

        {/* Login Form with React Hook Form */
        }
        <FormProvider {...reactFormMethods}>
          <Form className="mx-auto gap-4 w-full" onSubmit={handleSubmit(handleSignUp)}>
            {currentStep === 0 && (
              <Controller
                name="email"
                control={control}
                render={({field}) => (
                  <div
                    className="w-full"
                  >
                    <Input
                      {...field}
                      name="email"
                      type="text"
                      size={breakpoint === 'base' ? 'md' : 'lg'}
                      label={t('email')}
                      labelPlacement="outside-top"
                      classNames={{
                        label: 'text-darkmode text-sm font-bold',
                        input: 'w-full',
                        errorMessage: 'text-base mt-2 text-sm w-full'
                      }}
                      placeholder={t('placeholderEmail')}
                      autoComplete="email"
                      isInvalid={!!errors.email}
                      errorMessage={errors.email?.message}
                    />
                  </div>
                )}
              />
            )}

            {currentStep > 0 && (
              <div className="flex items-center justify-start gap-2 mb-4">
                {currentStep > 0 && currentStep < 3 ? (
                  <span onClick={handlePrevStep}>
                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 6L9 12L15 18" stroke="#99a1af" strokeWidth="2" strokeLinecap="round"
                            strokeLinejoin="round"/>
                    </svg>
                  </span>
                ) : currentStep === 3 ? (
                  <LockKeyhole/>
                ) : currentStep === 4 && (
                  <CircleCheckBig/>
                )}
                <div className="flex flex-col gap-1">
                  <h6 className="font-bold text-gray-400">Step {currentStep} of {totalIndicatorSteps}</h6>
                  <p className="text-darkmode text-sm font-bold">{stepTitles[currentStep]}</p>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <PasswordStep
                t={t}
                breakpoint={breakpoint}
              />
            )}

            {currentStep === 2 && (
              <InfoStep
                t={t}
                breakpoint={breakpoint}
              />
            )}

            {currentStep < 2 && (
              <Button
                type="button"
                size={breakpoint === 'base' ? 'md' : 'lg'}
                onPressStart={handleNextStep}   // Dùng onPressStart khi Conditional Rendering button có type="submit" với HeroUI.
                className={`w-full mt-2 bg-blue-400 text-darkmode py-4 md:px-10 rounded-full font-bold border-gray-600`}
              >
                {t('next')}
              </Button>
            )}

            {currentStep === 2 && (
              <Button
                type="submit"
                size={breakpoint === 'base' ? 'md' : 'lg'}
                disabled={isSubmitting}
                className={`w-full mt-2 bg-blue-400 text-darkmode py-4 md:px-10 rounded-full font-bold border-gray-600
      disabled:opacity-50 disabled:hover:bg-blue-400 disabled:pointer-events-none
      ${isSubmitting ? 'hover:bg-blue-500 hover:text-darkmode hover:border-white' : ''}`}
              >
                {signup.isPending ? t('processing') : t('submit')}
              </Button>
            )}
          </Form>
        </FormProvider>

        {currentStep === 3 && (
          <VerifyStep
            email={watch('email')}
            handleNextStep={() => setCurrentStep(prev => prev + 1)}
          />
        )}

        {currentStep === 4 && (
          <CompleteStep/>
        )}

        {currentStep === 0 && (
          <>
            <LabeledDivider label={t('or')}/>

            {/* Social Login Buttons */}
            <div className="flex flex-col gap-3">
              <Button
                variant="bordered"
                size={breakpoint === 'base' ? 'md' : 'lg'}
                onPress={() => handleGoogleLogin(locale)}
                disabled={isSubmitting}
                className="text-darkmode py-4 px-8 md:px-10 rounded-full justify-center items-center font-bold hover:text-darkmode border-gray-600
                hover:border-white [&[data-hover=true]]:opacity-100 disabled:opacity-50">
                <svg width="24px" height="24px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none">
                  <path fill="#4285F4"
                        d="M14.9 8.161c0-.476-.039-.954-.121-1.422h-6.64v2.695h3.802a3.24 3.24 0 01-1.407 2.127v1.75h2.269c1.332-1.22 2.097-3.02 2.097-5.15z"/>
                  <path fill="#34A853"
                        d="M8.14 15c1.898 0 3.499-.62 4.665-1.69l-2.268-1.749c-.631.427-1.446.669-2.395.669-1.836 0-3.393-1.232-3.952-2.888H1.85v1.803A7.044 7.044 0 008.14 15z"/>
                  <path fill="#FBBC04"
                        d="M4.187 9.342a4.17 4.17 0 010-2.68V4.859H1.849a6.97 6.97 0 000 6.286l2.338-1.803z"/>
                  <path fill="#EA4335"
                        d="M8.14 3.77a3.837 3.837 0 012.7 1.05l2.01-1.999a6.786 6.786 0 00-4.71-1.82 7.042 7.042 0 00-6.29 3.858L4.186 6.66c.556-1.658 2.116-2.89 3.952-2.89z"/>
                </svg>
                <span>{t('google')}</span>
              </Button>
              <Button
                variant="bordered"
                size={breakpoint === 'base' ? 'md' : 'lg'}
                onPress={() => handleFacebookLogin(locale)}
                disabled={isSubmitting}
                className="text-darkmode py-4 md:px-10 rounded-full justify-center items-center font-bold hover:text-darkmode border-gray-600
                hover:border-white [&[data-hover=true]]:opacity-100 disabled:opacity-50">
                <svg width="28px" height="28px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none">
                  <path fill="#1877F2"
                        d="M15 8a7 7 0 00-7-7 7 7 0 00-1.094 13.915v-4.892H5.13V8h1.777V6.458c0-1.754 1.045-2.724 2.644-2.724.766 0 1.567.137 1.567.137v1.723h-.883c-.87 0-1.14.54-1.14 1.093V8h1.941l-.31 2.023H9.094v4.892A7.001 7.001 0 0015 8z"/>
                  <path fill="#ffffff"
                        d="M10.725 10.023L11.035 8H9.094V6.687c0-.553.27-1.093 1.14-1.093h.883V3.87s-.801-.137-1.567-.137c-1.6 0-2.644.97-2.644 2.724V8H5.13v2.023h1.777v4.892a7.037 7.037 0 002.188 0v-4.892h1.63z"/>
                </svg>
                <span className="md:text-normal">{t('facebook')}</span>
              </Button>
            </div>

            <Divider className="my-6 bg-gray-600"/>

            <div className="text-center flex flex-col gap-2">
              <div>
                <p className="text-gray-400 text-sm sm:text-base inline mr-1">{t('alreadyHaveAccount')}</p>
                <Link href="/login" className="text-blue-400 inline text-sm sm:text-base">
                  {t('login')}
                </Link>
              </div>

              <div>
                <Link href="/forgot-password" className="text-blue-400 inline text-sm sm:text-base">
                  {t('forgotPassword')}
                </Link>
              </div>
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default SignUp;
