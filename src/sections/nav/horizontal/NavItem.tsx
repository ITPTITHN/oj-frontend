import { forwardRef } from "react";
import NextLink from "next/link";
import { Box, Link } from "@mui/material";
import { ICON } from "@/config/theme";
import Iconify from "@/components/Iconify";
import { ListItemStyle } from "./style";
import { isExternalLink } from "..";
import { NavbarItem } from "@/types/navbar";
import useAuth from "@/hooks/useAuth";

interface NavItemRootProps {
  item: NavbarItem;
  active?: boolean;
  open?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const NavItemRoot = forwardRef(function NavItemRoot({
                                                             item,
                                                             active,
                                                             open,
                                                             onMouseEnter,
                                                             onMouseLeave,
                                                           }: NavItemRootProps, ref) {
  const { hasAuthority } = useAuth();

  const { title, path, icon, children, authority } = item;

  if (!hasAuthority(...(authority ?? []))) {
    return null;
  }

  if (children && children.length > 0) {
    return (
      // @ts-ignore
      <ListItemStyle ref={ref} open={open} activeRoot={active} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {/* eslint-disable-next-line react/no-children-prop */}
        <NavItemContent icon={icon} title={title} children={children} />
      </ListItemStyle>
    );
  }

  return isExternalLink(path) ? (
    // @ts-ignore
    <ListItemStyle component={Link} href={path} target="_blank" rel="noopener">
      {/* eslint-disable-next-line react/no-children-prop */}
      <NavItemContent icon={icon} title={title} children={children} />
    </ListItemStyle>
  ) : (
    // @ts-ignore
    <NextLink href={path} passHref>
      {/* @ts-ignore */}
      <ListItemStyle activeRoot={active}>
        {/* eslint-disable-next-line react/no-children-prop */}
        <NavItemContent icon={icon} title={title} children={children} />
      </ListItemStyle>
    </NextLink>
  );
});

interface NavItemSubProps {
  item: NavbarItem;
  active?: boolean;
  open?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const NavItemSub = forwardRef(function NavItemSub({
                                                           item,
                                                           active,
                                                           open,
                                                           onMouseEnter,
                                                           onMouseLeave,
                                                         }: NavItemSubProps, ref) {
  const { hasAuthority } = useAuth();

  const { title, path, icon, children, authority } = item;

  if (!hasAuthority(...(authority ?? []))) {
    return null;
  }

  if (children && children.length > 0) {
    return (
      <ListItemStyle
        // @ts-ignore
        ref={ref}
        subItem
        disableRipple
        open={open}
        activeSub={active}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {/* eslint-disable-next-line react/no-children-prop */}
        <NavItemContent icon={icon} title={title} children={children} subItem />
      </ListItemStyle>
    );
  }

  return isExternalLink(path) ? (
    // @ts-ignore
    <ListItemStyle subItem href={path} disableRipple rel="noopener" target="_blank" component={Link}>
      {/* eslint-disable-next-line react/no-children-prop */}
      <NavItemContent icon={icon} title={title} children={children} subItem />
    </ListItemStyle>
  ) : (
    // @ts-ignore
    <NextLink href={path} passHref>
      {/* @ts-ignore */}
      <ListItemStyle disableRipple activeSub={active} subItem>
        {/* eslint-disable-next-line react/no-children-prop */}
        <NavItemContent icon={icon} title={title} children={children} subItem />
      </ListItemStyle>
    </NextLink>
  );
});

interface NavItemContentProps {
  icon?: any;
  title?: string;
  children?: any;
  subItem?: boolean;
}

function NavItemContent({ icon, title, children, subItem }: NavItemContentProps) {
  return (
    <>
      {icon && (
        <Box
          component="span"
          sx={{
            mr: 1,
            width: ICON.NAVBAR_ITEM_HORIZONTAL,
            height: ICON.NAVBAR_ITEM_HORIZONTAL,
            "& svg": { width: "100%", height: "100%" },
          }}
        >
          {icon}
        </Box>
      )}
      {title}
      {children?.length > 0 && (
        <Iconify
          icon={subItem ? "eva:chevron-right-fill" : "eva:chevron-down-fill"}
          sx={{
            ml: 0.5,
            width: ICON.NAVBAR_ITEM_HORIZONTAL,
            height: ICON.NAVBAR_ITEM_HORIZONTAL,
          }}
        />
      )}
    </>
  );
}
