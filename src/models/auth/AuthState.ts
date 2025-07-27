import {UserPrincipal} from "@/models/auth/UserPrincipal";

export interface AuthState {
  principal: UserPrincipal | null;
  token: string | null;
  isAuthenticated?: boolean;
}
