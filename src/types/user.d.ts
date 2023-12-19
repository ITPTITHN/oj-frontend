import { Profile } from "next-auth";

export interface User extends Profile {
  username: string;
  authorities: string[];
  emailVerified: boolean;
  metadata: {
    [key: string]: string;
  };
  exp: number;
}
