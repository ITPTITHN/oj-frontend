import { forwardRef, PropsWithChildren } from "react";
import { useTheme } from '@mui/material/styles';
import { Avatar as MUIAvatar, SxProps } from "@mui/material";

interface AvatarProps extends PropsWithChildren {
  src?: string;
  alt?: string;
  sx?: SxProps;
  color: string;
}

const Avatar = forwardRef(function Avatar({ color = 'default', children, sx, ...other }: AvatarProps, ref) {
  const theme: any = useTheme();

  if (color === 'default') {
    return (
      // @ts-ignore
      <MUIAvatar ref={ref} sx={sx} {...other}>
        {children}
      </MUIAvatar>
    );
  }

  return (
    // @ts-ignore
    <MUIAvatar
      ref={ref}
      sx={{
        fontWeight: theme.typography.fontWeightMedium,
        color: theme.palette[color].contrastText,
        backgroundColor: theme.palette[color].main,
        ...sx,
      }}
      {...other}
    >
      {children}
    </MUIAvatar>
  );
});

export default Avatar;
