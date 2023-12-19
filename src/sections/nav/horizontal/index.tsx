import { memo } from "react";
import { Stack } from "@mui/material";
import { NavListRoot } from "./NavList";
import { NavbarGroup } from "@/types/navbar";
import useAuth from "@/hooks/useAuth";

const hideScrollbar = {
  msOverflowStyle: "none",
  scrollbarWidth: "none",
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    display: "none",
  },
};

interface NavSectionHorizontalProps {
  navConfig: NavbarGroup[];
}

function NavSectionHorizontal({ navConfig }: NavSectionHorizontalProps) {
  const { hasAuthority } = useAuth();

  return (
    <Stack direction="row" sx={{ ...hideScrollbar, py: 1 }}>
      {navConfig.map((group) => (
        hasAuthority(...(group.authority ?? [])) &&
        <Stack key={group.title} direction="row" flexShrink={0}>
          {group.children.map((item) => (
            <NavListRoot key={item.title} item={item} />
          ))}
        </Stack>

      ))}
    </Stack>
  );
}

export default memo(NavSectionHorizontal);
