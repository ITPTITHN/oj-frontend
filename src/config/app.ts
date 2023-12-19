import ZitadelAuthProvider from "@/utils/auth/zitadel-auth-provider";

const AppConfig = {
  appName: "Common System",
  defaultAuthProvider: ZitadelAuthProvider.id,
  authProviders: [ZitadelAuthProvider],
  apiUrl: process.env.API_URL,
  muiLicenseKey: process.env.MUI_LICENSE_KEY ?? "",
}

export default AppConfig;
