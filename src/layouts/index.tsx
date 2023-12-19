import { PropsWithChildren } from "react";
import LogoOnlyLayout from "./LogoOnlyLayout";
import DashboardLayout from "./DashboardLayout";

export const LAYOUT = {
  dashboard: "dashboard",
  logoOnly: "logoOnly",
  dashboardVertical: "dashboardVertical",
};

interface LayoutProps extends PropsWithChildren {
  variant?: string;
}

export default function Layout({ variant, children }: LayoutProps) {
  switch (variant) {
    case LAYOUT.dashboard:
      return <DashboardLayout>{children}</DashboardLayout>;
    case LAYOUT.dashboardVertical:
      return <DashboardLayout verticalLayout>{children}</DashboardLayout>;
    case LAYOUT.logoOnly:
      return <LogoOnlyLayout>{children}</LogoOnlyLayout>;
    default:
      return children;
  }
}
