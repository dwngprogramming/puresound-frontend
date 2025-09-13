import {UserType} from "@/const/user/UserType";

export interface UserPrincipal {
  id: string | undefined;
  fullname: string;
  userType: UserType;
  authorities?: string[];
}
