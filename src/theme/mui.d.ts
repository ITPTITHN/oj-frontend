import * as MUI from "@mui/material";
import { TypeAction } from "@mui/material";
import { TypeBackground } from "@mui/material/styles/createPalette";

export interface Color extends MUI.Color {
  0: string,
}

export interface Palette extends Partial<MUI.Palette> {
  grey: Partial<Color>,
  action: Partial<TypeAction>,
  gradients: any,
  chart: any,
  background: TypeBackground & { neutral: string },
}

export interface PaletteCollection {
  light: Palette,
  dark: Palette,
}


export interface Theme extends MUI.Theme {
  customShadows?: {
    [key: string]: any
  },
  palette: Palette,
}

