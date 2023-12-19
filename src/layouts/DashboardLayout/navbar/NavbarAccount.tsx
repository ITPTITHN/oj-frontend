import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import useAuth from "@/hooks/useAuth";
import MyAvatar from "../../../components/MyAvatar";

const RootStyle = styled("div")(({ theme }: any) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create("opacity", {
    duration: theme.transitions.duration.shorter,
  }),
}));

interface NavbarAccountProps {
  isCollapse: boolean;
}

export default function NavbarAccount({ isCollapse }: NavbarAccountProps) {
  const { user } = useAuth();

  return (
    <RootStyle
      sx={{
        ...(isCollapse && {
          bgcolor: "transparent",
        }),
      }}
    >
      <MyAvatar />

      <Box
        sx={{
          ml: 2,
          transition: (theme) =>
            theme.transitions.create("width", {
              duration: theme.transitions.duration.shorter,
            }),
          ...(isCollapse && {
            ml: 0,
            width: 0,
          }),
        }}
      >
        <Typography variant="subtitle2" noWrap>
          {user?.name}
        </Typography>
        <Typography variant="body2" noWrap sx={{ color: "text.secondary" }}>
          {user?.role}
        </Typography>
      </Box>
    </RootStyle>
  );
}
