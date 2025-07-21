import {UserPrincipal} from "@/models/auth/UserPrincipal";

export interface AuthState {
  user: UserPrincipal | null;
  token: string | null;
  isAuthenticated?: boolean;
}
