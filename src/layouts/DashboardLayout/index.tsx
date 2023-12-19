import { PropsWithChildren, useState } from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import useCollapseDrawer from "@/hooks/useCollapseDrawer";
import { HEADER, NAVBAR } from "@/config/theme";
import DashboardHeader from "./header";
import NavbarVertical from "./navbar/NavbarVertical";
import NavbarHorizontal from "./navbar/NavbarHorizontal";
import useResponsive from "@/hooks/useResponsive";

const MainStyle = styled("main", {
  shouldForwardProp: (prop) => prop !== "collapseClick",
})(({ collapseClick, theme }: any) => ({
  flexGrow: 1,
  paddingTop: HEADER.MOBILE_HEIGHT + 24,
  paddingBottom: HEADER.MOBILE_HEIGHT + 24,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: HEADER.DASHBOARD_DESKTOP_HEIGHT + 24,
    paddingBottom: HEADER.DASHBOARD_DESKTOP_HEIGHT + 24,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH}px)`,
    transition: theme.transitions.create("margin-left", {
      duration: theme.transitions.duration.shorter,
    }),
    ...(collapseClick && {
      marginLeft: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
    }),
  },
}));

interface DashboardLayoutProps extends PropsWithChildren {
  verticalLayout?: boolean;
}

export default function DashboardLayout({ children, verticalLayout }: DashboardLayoutProps) {
  const { collapseClick, isCollapse } = useCollapseDrawer();
  const isDesktop = useResponsive("up", "lg");
  const [open, setOpen] = useState(false);

  if (!verticalLayout) {
    return (
      <>
        <DashboardHeader onOpenSidebar={() => setOpen(true)} verticalLayout={true}
                         centerContent={isDesktop && <NavbarHorizontal />} />

        {!isDesktop && (
          <NavbarVertical isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
        )}

        <MainStyle>

          {children}
        </MainStyle>
      </>
    );
  }

  return (
    <Box
      sx={{
        display: { lg: "flex" },
        minHeight: { lg: 1 },
      }}
    >
      <DashboardHeader isCollapse={isCollapse} onOpenSidebar={() => setOpen(true)} />
      <NavbarVertical isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      {/* @ts-ignore */}
      <MainStyle collapseClick={collapseClick}>{children}</MainStyle>
    </Box>
  );
}
