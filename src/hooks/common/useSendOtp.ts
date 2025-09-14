// src/hooks/useOtpResend.ts
import { useAccurateCountdown } from "@/hooks/util/useAccurateCountdown";
import { useMutation } from "@tanstack/react-query";
import { useAppDispatch } from "@/libs/redux/hooks";
import { showSuccessNotification } from "@/libs/redux/features/notification/notificationAction";

interface OtpResendProps {
  email: string;
  resendFn: (email: string) => Promise<any>;
  t: (key: string) => string;
}

export const useSendOtp = ({ email, resendFn, t }: OtpResendProps) => {
  const dispatch = useAppDispatch();
  const { countdown, start: startCountdown, isActive } = useAccurateCountdown();

  const resendCode = useMutation({
    mutationFn: () => resendFn(email),
    onSuccess: () => {
      dispatch(showSuccessNotification(t('otp.resendSuccess')));
      startCountdown(60);
    },
    onError: () => {
      startCountdown(60);
    }
  });

  const handleSendOtp = () => {
    if (!isActive && !resendCode.isPending) {
      resendCode.mutate();
    }
  };

  return {
    countdown,
    isActive,
    isPending: resendCode.isPending,
    handleSendOtp
  };
};
