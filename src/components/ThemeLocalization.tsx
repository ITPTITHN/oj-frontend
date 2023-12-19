import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import useLocales from '../hooks/useLocales';
import { PropsWithChildren } from "react";


export default function ThemeLocalization({ children }: PropsWithChildren) {
  const defaultTheme = useTheme();
  const { currentLang } = useLocales();

  const theme = createTheme(defaultTheme, currentLang.systemValue);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
