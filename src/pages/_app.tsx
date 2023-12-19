import "@/locales/i18n";
import "@/utils/highlight";
import "simplebar/dist/simplebar.css";
import "react-image-lightbox/style.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-lazy-load-image-component/src/effects/opacity.css";
import "react-lazy-load-image-component/src/effects/black-and-white.css";
import "@fullcalendar/common/main.min.css";
import "@fullcalendar/daygrid/main.min.css";

import Head from "next/head";
import App, { AppContext, AppInitialProps } from "next/app";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { store, persistor } from "@/redux/store";
import { CollapseDrawerProvider } from "@/contexts/CollapseDrawerContext";
import ThemeProvider from "@/theme";
import ProgressBar from "@/components/ProgressBar";
import NotistackProvider from "@/components/NotistackProvider";
import ThemeLocalization from "@/components/ThemeLocalization";
import MotionLazyContainer from "@/components/animate/MotionLazyContainer";

import { LicenseInfo, LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDateFns } from "@mui/x-date-pickers-pro/AdapterDateFns";
import { FunctionComponent, useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import ThemeColorPresets from "@/components/ThemeColorPresets";
import Layout from "@/layouts";
import AppConfig from "@/config/app";

interface MyAppProps extends AppInitialProps {
  Component: FunctionComponent & { layout?: string };
}

export default function AppMain(props: MyAppProps) {
  const { Component, pageProps } = props;

  useEffect(() => {
    LicenseInfo.setLicenseKey(AppConfig.muiLicenseKey);
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <SessionProvider session={pageProps.session}>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <CollapseDrawerProvider>
                <ThemeProvider>
                  <NotistackProvider>
                    <ThemeColorPresets>
                      <MotionLazyContainer>
                        <ThemeLocalization>
                          <ProgressBar />
                          <Layout variant={Component.layout}>
                            <Component {...pageProps} />
                          </Layout>
                        </ThemeLocalization>
                      </MotionLazyContainer>
                    </ThemeColorPresets>
                  </NotistackProvider>
                </ThemeProvider>
              </CollapseDrawerProvider>
            </LocalizationProvider>
          </PersistGate>
        </ReduxProvider>
      </SessionProvider>
    </>
  );
}

// ----------------------------------------------------------------------

AppMain.getInitialProps = async (context: AppContext) => {
  const appProps = await App.getInitialProps(context);

  return {
    ...appProps,
  };
};
