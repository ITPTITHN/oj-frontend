import { PropsWithChildren, useMemo } from "react";
import { alpha, ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import componentsOverride from '../theme/overrides';
import { ThemeColors } from "@/config/theme";

export default function ThemeColorPresets({ children }: PropsWithChildren) {
  const defaultTheme: any = useTheme();

  const themeOptions = useMemo(
    () => ({
      ...defaultTheme,
      palette: {
        ...defaultTheme.palette,
        primary: ThemeColors,
      },
      customShadows: {
        ...defaultTheme.customShadows,
        primary: `0 8px 16px 0 ${alpha(ThemeColors.main, 0.24)}`,
      },
    }),
    [defaultTheme]
  );

  const theme: any = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
