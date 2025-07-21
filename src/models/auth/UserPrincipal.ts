export interface UserPrincipal {
  id: string | undefined;
  fullname: string;
  userType: string;
  authorities?: string[];
}
