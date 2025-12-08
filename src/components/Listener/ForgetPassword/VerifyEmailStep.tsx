import {Button, Form, Input} from "@heroui/react";
import React from "react";
import {useTranslations} from "next-intl";
import {useForm} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import authApi from "@/apis/auth/auth.api";
import regex from "@/const/regex";
import {useBreakpoint} from "@/context/breakpoint-auth-context";
import {CheckExistsRequest} from "@/models/auth/CheckExistsRequest";

interface VerifyEmailStepProps {
  handleSetEmail: (email: string) => void;
  handleNextStep: () => void;
}

interface CheckEmailRequest {
  email: string;
}

const VerifyEmailStep = ({handleSetEmail, handleNextStep}: VerifyEmailStepProps) => {
  const t = useTranslations("Listener.ForgotPassword");
  const {breakpoint} = useBreakpoint();
  const checkEmail = useMutation({
    mutationFn: (request: CheckExistsRequest) => authApi.checkEmail(request),
  })
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: {isSubmitting, errors},
  } = useForm<CheckEmailRequest>({
    mode: "onTouched",
    defaultValues: {
      email: "",
    },
  });

  const emailValue = watch("email")

  const sendOtp = useMutation({
    mutationFn: (email: string) => authApi.sendOtp(email),
  });

  const handleCheckEmail = async (data: CheckEmailRequest) => {
    const response = await checkEmail.mutateAsync({field: data.email.trim()});
    if (response.data.exists) {
      await sendOtp.mutateAsync(emailValue)
      handleSetEmail(data.email.trim())
      handleNextStep();
    } else setError('email', {message: response.message})
  }

  return (
    <Form className="mx-auto gap-4 w-full" onSubmit={handleSubmit(handleCheckEmail)}>
      <Input
        {...register("email", {
          required: t("validation.emailRequired"),
          pattern: {
            value: regex.EMAIL_REGEX,
            message: t("validation.emailFormat"),
          }
        })}
        name="email"
        type="email"
        size={breakpoint === 'base' ? 'md' : 'lg'}
        label={t('email')}
        labelPlacement="outside-top"
        classNames={{
          label: 'text-darkmode text-sm font-bold',
          input: 'w-full',
          errorMessage: 'text-base mt-2 text-sm w-full'
        }}
        placeholder={t('placeholderEmail')}
        isInvalid={!!errors.email}
        errorMessage={errors.email?.message}
      />

      <Button
        type="submit"
        size={breakpoint === 'base' ? 'md' : 'lg'}
        disabled={isSubmitting}
        className={`w-full mt-2 bg-blue-400 text-darkmode py-4 md:px-10 rounded-full font-bold border-gray-600
      disabled:opacity-50 disabled:hover:bg-blue-400 disabled:pointer-events-none
      ${isSubmitting ? 'hover:bg-blue-500 hover:text-darkmode hover:border-white' : ''}`}
      >
        {isSubmitting ?
          t('processing') :
          t('submit')}
      </Button>
    </Form>
  );
}

export default VerifyEmailStep;
