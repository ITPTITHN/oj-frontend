import NextAuth, { AuthOptions } from "next-auth";
import AppConfig from "@/config/app";


const authOptions: AuthOptions = {
  providers: AppConfig.authProviders.map((p) => p.provider),
  callbacks: {
    jwt: async ({ token, account, profile }) => {
      const provider = AppConfig.authProviders.find((p) => p.id === account?.provider);
      if (account && profile && provider) {
        token.sub = profile.sub;
        token.provider = provider.id;
        token.user = provider.serializeProfile(profile);
        token.token = {
          accessTokenExpires: account.expires_at,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
        };
        const tokenExpiry = (account.expires_at ?? 0) * 1000;
        if (Date.now() > tokenExpiry) {
          token.token = await provider.refreshToken(token.token as any);
        }
      }


      return token;
    },
    session: ({ session, token }) => ({
      ...session,
      ...token,
    }),
  },
};

export default NextAuth(authOptions);
