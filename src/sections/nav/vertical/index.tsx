import { styled } from "@mui/material/styles";
import { List, Box, ListSubheader } from "@mui/material";
import { NavListRoot } from "./NavList";
import { NavbarGroup } from "@/types/navbar";
import useAuth from "@/hooks/useAuth";

export const ListSubheaderStyle = styled((props: any) => <ListSubheader disableSticky
                                                                        disableGutters {...props} />)(
  ({ theme }) => ({
    ...theme.typography.overline,
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    color: theme.palette.text.primary,
    transition: theme.transitions.create("opacity", {
      duration: theme.transitions.duration.shorter,
    }),
  }),
);

interface NavSectionVerticalProps {
  isCollapse?: boolean;
  navConfig: NavbarGroup[];
}

export default function NavSectionVertical({ navConfig, isCollapse = false, ...other }: NavSectionVerticalProps) {
  const { hasAuthority } = useAuth();
  return (
    <Box {...other}>
      {navConfig.map((group) => (
        hasAuthority(...(group.authority ?? [])) &&
        <List key={group.title} disablePadding sx={{ px: 2 }}>
          <ListSubheaderStyle
            sx={{
              ...(isCollapse && {
                opacity: 0,
              }),
            }}
          >
            {group.title}
          </ListSubheaderStyle>

          {group.children.map((item) => (
            <NavListRoot key={item.title} item={item} isCollapse={isCollapse} />
          ))}
        </List>
      ))}
    </Box>
  );
}
