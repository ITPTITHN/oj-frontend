import ZitadelProvider, { ZitadelProfile } from "next-auth/providers/zitadel";
import { signIn } from "next-auth/react";
import { Issuer } from "openid-client";
import { AuthProvider } from "@/utils/auth/auth-provider";


const PROVIDER_ID = "zitadel";
let issuer: Issuer<any>;

const getIssuer = async () => {
  if (!issuer) {
    issuer = await Issuer.discover(process.env.ZITADEL_ISSUER ?? "");
  }
  return issuer;
};

const serializeProfile = (profile: ZitadelProfile & any) => ({
  sub: profile.sub,
  name: profile.name,
  email: profile.email,
  image: profile.image,
  authorities: Object.keys(profile[`urn:zitadel:iam:org:project:${process.env.ZITADEL_PROJECT_ID}:roles`] ?? {}),
  emailVerified: profile.email_verified,
  username: profile.preferred_username,
  metadata: profile["urn:zitadel:iam:user:metadata"],
  exp: profile.exp,
});

const provider = ZitadelProvider({
  id: "zitadel",
  issuer: process.env.ZITADEL_ISSUER ?? "",
  clientId: process.env.ZITADEL_CLIENT_ID ?? "",
  clientSecret: process.env.ZITADEL_CLIENT_SECRET ?? "",
  authorization: {
    params: {
      scope: `openid profile email offline_access urn:zitadel:iam:org:project:roles urn:zitadel:iam:user:metadata`,
      prompt: "select_account",
    },
  },
});


const refreshToken = async (tokenSet: any) => {
  if (!tokenSet) return null;
  const { refreshToken } = tokenSet;
  const issuer = await getIssuer();

  const urlSearchParams = new URLSearchParams({
    client_id: process.env.ZITADEL_CLIENT_ID ?? "",
    client_secret: process.env.ZITADEL_CLIENT_SECRET ?? "",
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const response = await fetch(`${issuer.token_endpoint}?${urlSearchParams}`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    await signIn(PROVIDER_ID);
    return null;
  }

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    accessTokenExpires: data.expires_in,
  };
};


const ZitadelAuthProvider: AuthProvider = {
  id: PROVIDER_ID,
  provider,
  serializeProfile,
  refreshToken,
};

export default ZitadelAuthProvider;
