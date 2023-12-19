import { User } from "@/types/user";
import { Provider } from "next-auth/providers/index";

interface TokenSet {
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: number;
}

export interface AuthProvider {
  id: string;
  provider: Provider;
  // eslint-disable-next-line no-unused-vars
  serializeProfile: (profile: any) => User;
  // eslint-disable-next-line no-unused-vars
  refreshToken: (session: TokenSet) => Promise<TokenSet|null>;
}
