import {JwtPayload} from "jwt-decode";

export interface CustomJwtPayload extends JwtPayload {
  fullname: string;
  userType: string;
  authorities: string[];
}
