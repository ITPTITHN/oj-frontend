import NextLink from 'next/link';
import { Box, Link, ListItemText } from '@mui/material';
import Iconify from '@/components/Iconify';
import { ListItemStyle, ListItemTextStyle, ListItemIconStyle } from './style';
import { isExternalLink } from '..';
import { NavbarItem } from "@/types/navbar";
import useAuth from "@/hooks/useAuth";

interface NavItemRootProps {
  active?: boolean;
  open?: boolean;
  isCollapse?: boolean;
  onOpen?: () => void;
  item: NavbarItem;
}

export function NavItemRoot({ item, isCollapse, open = false, active, onOpen }: NavItemRootProps) {
  const { hasAuthority } = useAuth();

  const { title, path, icon, info, children } = item;

  const renderContent = (
    <>
      {icon && <ListItemIconStyle>{icon}</ListItemIconStyle>}
      {/* @ts-ignore */}
      <ListItemTextStyle disableTypography primary={title} isCollapse={isCollapse} />
      {!isCollapse && (
        <>
          {info && info}
          {children && <ArrowIcon open={open} />}
        </>
      )}
    </>
  );

  if (!hasAuthority(...(item.authority ?? []))) {
    return null;
  }

  if (children && children.length > 0) {
    return (
      // @ts-ignore
      <ListItemStyle onClick={onOpen} activeRoot={active}>
        {renderContent}
      </ListItemStyle>
    );
  }

  return isExternalLink(path) ? (
    // @ts-ignore
    <ListItemStyle component={Link} href={path} target="_blank" rel="noopener">
      {renderContent}
    </ListItemStyle>
  ) : (
    // @ts-ignore
    <NextLink href={path} passHref style={{ textDecoration: "none" }}>
      {/* @ts-ignore */}
      <ListItemStyle activeRoot={active}>{renderContent}</ListItemStyle>
    </NextLink>
  );
}

interface NavItemSubProps {
  active?: boolean;
  open?: boolean;
  onOpen?: () => void;
  item: NavbarItem;
}

export function NavItemSub({ item, open = false, active = false, onOpen }: NavItemSubProps) {
  const { hasAuthority } = useAuth();

  const { title, path, info, children, authority } = item;

  const renderContent = (
    <>
      <DotIcon active={active} />
      <ListItemText disableTypography primary={title} />
      {info && info}
      {children && <ArrowIcon open={open} />}
    </>
  );

  if (!hasAuthority(...(authority ?? []))) {
    return null;
  }

  if (children && children.length > 0) {
    return (
      // @ts-ignore
      <ListItemStyle onClick={onOpen} activeSub={active} subItem>
        {renderContent}
      </ListItemStyle>
    );
  }

  return isExternalLink(path) ? (
    // @ts-ignore
    <ListItemStyle component={Link} href={path} target="_blank" rel="noopener" subItem>
      {renderContent}
    </ListItemStyle>
  ) : (
    // @ts-ignore
    <NextLink href={path} passHref style={{ textDecoration: "none" }}>
      {/* @ts-ignore */}
      <ListItemStyle activeSub={active} subItem>
        {renderContent}
      </ListItemStyle>
    </NextLink>
  );
}

interface DotIconProps {
  active?: boolean;
}

export function DotIcon({ active }: DotIconProps) {
  return (
    <ListItemIconStyle>
      <Box
        component="span"
        sx={{
          width: 4,
          height: 4,
          borderRadius: '50%',
          bgcolor: 'text.disabled',
          transition: (theme) =>
            theme.transitions.create('transform', {
              duration: theme.transitions.duration.shorter,
            }),
          ...(active && {
            transform: 'scale(2)',
            bgcolor: 'primary.main',
          }),
        }}
      />
    </ListItemIconStyle>
  );
}

interface ArrowIconProps {
  open?: boolean;
}

export function ArrowIcon({ open }: ArrowIconProps) {
  return (
    <Iconify
      icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
      sx={{ width: 16, height: 16, ml: 1 }}
    />
  );
}
