import {useMutation} from "@tanstack/react-query";
import authApi from "@/apis/auth/auth.api";
import {SignupRequest} from "@/models/auth/SignupRequest";

export const useSignUp = () => {
  // Sign up endpoint return 204 no content
  return useMutation({
    mutationFn: (request: SignupRequest) => authApi.signup(request),
  });
};
