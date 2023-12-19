import { useState } from 'react';
import { useRouter } from 'next/router';
import { List, Collapse } from '@mui/material';
import { NavItemRoot, NavItemSub } from './NavItem';
import { getActive } from '..';
import { NavbarItem } from "@/types/navbar";
import useAuth from "@/hooks/useAuth";

interface NavListRootProps {
  isCollapse?: boolean;
  item: NavbarItem;
}

export function NavListRoot({ item, isCollapse }: NavListRootProps) {
  const { hasAuthority } = useAuth();

  const { pathname, asPath } = useRouter();

  const active = getActive(item.path, pathname, asPath);

  const [open, setOpen] = useState(active);

  const hasChildren = item.children && item.children?.length > 0;

  if (!hasAuthority(...(item.authority ?? []))) {
    return null;
  }

  if (hasChildren) {
    return (
      <>
        <NavItemRoot item={item} isCollapse={isCollapse} active={active} open={open} onOpen={() => setOpen(!open)} />

        {!isCollapse && (
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {(item.children || []).map((item: any) => (
                <NavListSub key={item.title} item={item} />
              ))}
            </List>
          </Collapse>
        )}
      </>
    );
  }

  return <NavItemRoot item={item} active={active} isCollapse={isCollapse} />;
}

interface NavListSubProps {
  item: NavbarItem;
}

function NavListSub({ item }: NavListSubProps) {
  const { pathname, asPath } = useRouter();

  const { hasAuthority } = useAuth();

  const active = getActive(item.path, pathname, asPath);

  const [open, setOpen] = useState(active);

  const hasChildren = item.children && item.children?.length > 0;

  if (!hasAuthority(...(item.authority ?? []))) {
    return null;
  }

  if (hasChildren) {
    return (
      <>
        <NavItemSub item={item} onOpen={() => setOpen(!open)} open={open} active={active} />

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 3 }}>
            {(item.children || []).map((item: any) => (
              <NavItemSub key={item.title} item={item} active={getActive(item.path, pathname, asPath)} />
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  return <NavItemSub item={item} active={active} />;
}
