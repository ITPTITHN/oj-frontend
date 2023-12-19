import { Icon, IconifyIcon } from "@iconify/react";
import { Box } from '@mui/material';

// ----------------------------------------------------------------------



interface IconifyProps {
  icon: string | IconifyIcon;
  sx?: any;
  [x: string]: any;
}

export default function Iconify({ icon, sx, ...other }: IconifyProps) {
  return <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />;
}
