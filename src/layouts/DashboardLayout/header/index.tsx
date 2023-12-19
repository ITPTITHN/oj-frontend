import { ReactNode } from "react";
import { styled } from "@mui/material/styles";
import { Box, Stack, AppBar, Toolbar, Button } from "@mui/material";
import useOffSetTop from "@/hooks/useOffSetTop";
import useResponsive from "@/hooks/useResponsive";
import cssStyles from "@/utils/cssStyles";
import { HEADER, NAVBAR } from "@/config/theme";
import Logo from "@/components/Logo";
import Iconify from "@/components/Iconify";
import { IconButtonAnimate } from "@/components/animate";
import AccountPopover from "./AccountPopover";
import LanguagePopover from "./LanguagePopover";
import useAuth from "@/hooks/useAuth";
import AppConfig from "@/config/app";
import i18next from "i18next";

const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "isCollapse" && prop !== "isOffset" && prop !== "verticalLayout",
})(({ isCollapse, isOffset, verticalLayout, theme }: any) => ({
  ...cssStyles(theme).bgBlur(),
  height: HEADER.MOBILE_HEIGHT,
  zIndex: theme.zIndex.appBar + 1,
  transition: theme.transitions.create(["width", "height"], {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up("lg")]: {
    height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH + 1}px)`,
    ...(isCollapse && {
      width: `calc(100% - ${NAVBAR.DASHBOARD_COLLAPSE_WIDTH}px)`,
    }),
    ...(isOffset && {
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
    }),
    ...(verticalLayout && {
      width: "100%",
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
      backgroundColor: theme.palette.background.default,
    }),
  },
}));

interface DashboardHeaderProps {
  isCollapse?: boolean;
  onOpenSidebar: Function;
  verticalLayout?: boolean;
  centerContent?: ReactNode;
};

export default function DashboardHeader({
                                          onOpenSidebar,
                                          isCollapse = false,
                                          verticalLayout = false,
                                          centerContent,
                                        }: DashboardHeaderProps) {
  const { isAuthenticated, logIn } = useAuth();
  const isOffset = useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT) && !verticalLayout;

  const isDesktop = useResponsive("up", "lg");

  return (
    // @ts-ignore
    <RootStyle isCollapse={isCollapse} isOffset={isOffset} verticalLayout={verticalLayout}>
      <Toolbar
        sx={{
          minHeight: "100% !important",
          px: { lg: 5 },
        }}
      >
        {isDesktop && verticalLayout && <Logo sx={{ mr: 2.5 }} />}

        {!isDesktop && (
          <IconButtonAnimate onClick={onOpenSidebar} sx={{ mr: 1, color: "text.primary" }}>
            <Iconify icon="eva:menu-2-fill" />
          </IconButtonAnimate>
        )}
        <Box sx={{ flexGrow: 1 }}>{centerContent}</Box>

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          <LanguagePopover />
          {isAuthenticated ?
            <AccountPopover /> :
            <Button variant="contained" onClick={() => logIn(AppConfig.defaultAuthProvider)}>{i18next.t`common.login`}</Button>
          }

        </Stack>
      </Toolbar>
    </RootStyle>
  );
}
