import {useMutation} from "@tanstack/react-query";
import authApi from "@/apis/auth/auth.api";

export const useSignUp = () => {
  // Sign up endpoint return 204 no content
  return useMutation({
    mutationFn: authApi.signup,
  });
};
