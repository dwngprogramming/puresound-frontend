import {Button, Form, InputOtp} from "@heroui/react";
import {useForm} from "react-hook-form";
import React, {useEffect, useState} from "react";
import {useBreakpoint} from "@/hooks/useBreakpoint";
import {useTranslations} from "next-intl";
import {useMutation} from "@tanstack/react-query";
import authApi from "@/apis/auth/auth.api";
import {useAccurateCountdown} from "@/hooks/util/useAccurateCountdown";

interface VerifyCode {
  code: string
}

const VerifyStep = () => {
  const [visible, setVisible] = useState(false);
  const { countdown, start: startCountdown, isActive } = useAccurateCountdown();
  const {breakpoint} = useBreakpoint();
  const t = useTranslations("Listener.SignUp");
  const tValidation = useTranslations("Listener.SignUp.validation");
  const verifyCode = useMutation({
    mutationFn: authApi.verifyRegister
  })
  const resendCode = useMutation({
    mutationFn: () => authApi.sendOtp(),
    onSuccess: () => {
      startCountdown(60); // Bắt đầu đếm ngược 60s
    },
    onError: () => {
      startCountdown(60); // Bắt đầu đếm ngược 60s
    }
  })
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: {errors, isSubmitting}
  } = useForm<VerifyCode>(
    {
      mode: "onTouched",
      defaultValues: {
        code: ''
      }
    }
  );
  const code = watch('code');

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 10) // Delay nhỏ để trigger transition
    return () => clearTimeout(timeout)
  }, [])

  const handleSetCode = (value: string) => {
    setValue('code', value);
  }

  const handleVerify = (data: VerifyCode) => {
    console.log(data);
  }

  const handleResendClick = () => {
    if (!isActive && !resendCode.isPending) {
      resendCode.mutate();
    }
  };

  return (
    <Form className="mx-auto gap-4 w-full" onSubmit={handleSubmit(handleVerify)}>
      <div
        className={`w-full mb-2 flex flex-col items-center gap-4 transition-all duration-300 ease-in-out ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <h2 className="text-2xl font-bold text-center">{t('otp.title')}</h2>
        <p className="text-center text-gray-400">{t('otp.description')}</p>
        <InputOtp
          {...register('code', {
            required: `${tValidation('otpRequired')}`,
            minLength: {value: 6, message: `${tValidation('otpLengthError')}`}
          })}
          length={6}
          value={code}
          onValueChange={handleSetCode}
          isInvalid={!!errors.code}
          errorMessage={errors.code?.message}
        />

        <Button
          type="submit"
          size={breakpoint === 'base' ? 'md' : 'lg'}
          disabled={isSubmitting}
          className={`w-full mt-2 bg-blue-400 text-darkmode py-4 md:px-10 rounded-full font-bold border-gray-600
      disabled:opacity-50 disabled:hover:bg-blue-400 disabled:pointer-events-none
      ${isSubmitting ? 'hover:bg-blue-500 hover:text-darkmode hover:border-white' : ''}`}
        >
          {verifyCode.isPending ? t('processing') : t('otp.send')}
        </Button>

        <p
          className="text-center text-gray-400">
          {t('otp.cantReceive')}
          {countdown > 0 ? (
            // Đang đếm ngược - không thể click
            <span className="text-gray-500 cursor-not-allowed">
              {t('otp.isResending', { count: countdown })} {/* Pass countdown as parameter */}
            </span>
          ) : (
            // Có thể click để gửi lại
            <span
              className={`cursor-pointer transition-colors ${
                resendCode.isPending
                  ? 'text-gray-500 cursor-not-allowed'
                  : 'text-blue-400 hover:text-blue-300'
              }`}
              onClick={handleResendClick}
            >
              {resendCode.isPending ? 'Đang gửi...' : t('otp.resend')}
            </span>
          )}
        </p>
      </div>
    </Form>
  )
}

export default VerifyStep;
