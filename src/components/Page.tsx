import { forwardRef, PropsWithChildren, ReactNode } from "react";
import Head from 'next/head';
import { Box } from '@mui/material';
import AppConfig from "@/config/app";


export interface PageProps extends PropsWithChildren {
  title?: string;
  meta?: ReactNode;
  [x: string]: any;
}

// eslint-disable-next-line react/display-name
const Page = forwardRef(({ children, title = '', meta, ...other }: PageProps, ref) => (
  <>
    <Head>
      <title>{`${title} | ${AppConfig.appName}`}</title>
      {meta}
    </Head>

    <Box ref={ref} {...other}>
      {children}
    </Box>
  </>
));

export default Page;
