import {Button, Form, InputOtp} from "@heroui/react";
import {useForm} from "react-hook-form";
import React, {useEffect, useState} from "react";
import {useTranslations} from "next-intl";
import {useMutation} from "@tanstack/react-query";
import authApi from "@/apis/auth/auth.api";
import {OtpEmailRequest} from "@/models/otp/OtpEmailRequest";
import {useSendOtp} from "@/hooks/common/useSendOtp";
import {useBreakpoint} from "@/context/breakpoint-auth-context";
import {AxiosError} from "axios";

interface OtpStep {
  email: string
  handleNextStep: () => void
}

const OtpStep = ({email, handleNextStep}: OtpStep) => {
  const [visible, setVisible] = useState(false);
  const {breakpoint} = useBreakpoint();
  const t = useTranslations("Listener.ForgotPassword");
  const verifyCode = useMutation({
    mutationFn: (request: OtpEmailRequest) => authApi.verifyRegister(request)
  })
  const {countdown, isActive, isPending, handleSendOtp} = useSendOtp({
    email,
    resendFn: authApi.sendOtp,
    t
  });
  const {
    register,
    watch,
    setValue,
    setError,
    handleSubmit,
    formState: {errors, isSubmitting}
  } = useForm<OtpEmailRequest>(
    {
      mode: "onTouched",
      defaultValues: {
        email: '',
        otp: ''
      }
    }
  );

  useEffect(() => {
    setValue("email", email);
  }, []);

  const otp = watch('otp');

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 10) // Delay nhỏ để trigger transition
    return () => clearTimeout(timeout)
  }, [])

  const handleSetOtp = (value: string) => {
    setValue('otp', value);
  }

  const handleVerify = async (data: OtpEmailRequest) => {
    try {
      await verifyCode.mutateAsync(data);
      handleNextStep();
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message;
        setError('otp', {message: errorMessage});
      }
    }
  }

  const handleResendClick = () => {
    if (!isActive && !isPending) {
      handleSendOtp();
    }
  };

  return (
    <Form className="mx-auto gap-4 w-full" onSubmit={handleSubmit(handleVerify)}>
      <div
        className={`w-full mb-2 flex flex-col items-center gap-4 transition-all duration-300 ease-in-out ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <h3 className="text-center">{t('otp.title')}</h3>
        <p className="text-center text-gray-400">{t('otp.description')}</p>
        <InputOtp
          {...register('otp', {
            required: `${t('validation.otpRequired')}`,
            minLength: {value: 6, message: `${t('validation.otpLengthError')}`}
          })}
          length={6}
          value={otp}
          onValueChange={handleSetOtp}
          isInvalid={!!errors.otp}
          errorMessage={errors.otp?.message}
        />

        <Button
          type="submit"
          size={breakpoint === 'base' ? 'md' : 'lg'}
          disabled={isSubmitting}
          className={`w-full mt-2 bg-blue-400 text-darkmode py-4 md:px-10 rounded-full font-bold border-gray-600
      disabled:opacity-50 disabled:hover:bg-blue-400 disabled:pointer-events-none
      ${isSubmitting ? 'hover:bg-blue-500 hover:text-darkmode hover:border-white' : ''}`}
        >
          {isSubmitting ? t('processing') : t('otp.send')}
        </Button>

        <p
          className="text-center text-gray-400">
          {t('otp.cantReceive')}
          {countdown > 0 ? (
            // Đang đếm ngược - không thể click
            <span className="text-gray-500 cursor-not-allowed">
              {t('otp.isResending', {count: countdown})} {/* Pass countdown as parameter */}
            </span>
          ) : (
            // Có thể click để gửi lại
            <span
              className={`cursor-pointer transition-colors ${
                isPending
                  ? 'text-gray-500 cursor-not-allowed'
                  : 'text-blue-400 hover:text-blue-300'
              }`}
              onClick={handleResendClick}
            >
              {isPending ? t('otp.sending') : t('otp.resend')}
            </span>
          )}
        </p>
      </div>
    </Form>
  )
}

export default OtpStep;
