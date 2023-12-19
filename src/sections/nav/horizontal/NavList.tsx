import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { NavItemRoot, NavItemSub } from './NavItem';
import { PaperStyle } from './style';
import { getActive } from '..';
import { NavbarItem } from "@/types/navbar";
import useAuth from "@/hooks/useAuth";

interface NavListRootProps {
  item: NavbarItem;
}

export function NavListRoot({ item }: NavListRootProps) {
  const { hasAuthority } = useAuth();

  const menuRef = useRef(null);

  const { pathname, asPath } = useRouter();

  const active = getActive(item.path, pathname, asPath);

  const [open, setOpen] = useState(false);

  const hasChildren = item.children && item.children?.length > 0;

  useEffect(() => {
    if (open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!hasAuthority(...(item.authority ?? []))) {
    return null;
  }

  if (hasChildren) {
    return (
      <>
        <NavItemRoot
          open={open}
          item={item}
          active={active}
          ref={menuRef}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
        />

        <PaperStyle
          open={open}
          anchorEl={menuRef.current}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          PaperProps={{
            onMouseEnter: handleOpen,
            onMouseLeave: handleClose,
          }}
        >
          {(item.children || []).map((item) => (
            <NavListSub key={item.title} item={item} />
          ))}
        </PaperStyle>
      </>
    );
  }

  return <NavItemRoot item={item} active={active} />;
}

interface NavListSubProps {
  item: NavbarItem;
}

function NavListSub({ item }: NavListSubProps) {
  const menuRef = useRef(null);

  const { pathname, asPath } = useRouter();

  const active = getActive(item.path, pathname, asPath);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const hasChildren = item.children;

  if (hasChildren) {
    return (
      <>
        <NavItemSub
          ref={menuRef}
          open={open}
          item={item}
          active={active}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
        />

        <PaperStyle
          open={open}
          anchorEl={menuRef.current}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          PaperProps={{
            onMouseEnter: handleOpen,
            onMouseLeave: handleClose,
          }}
        >
          {(item.children || []).map((item) => (
            <NavListSub key={item.title} item={item} />
          ))}
        </PaperStyle>
      </>
    );
  }

  return <NavItemSub item={item} active={active} />;
}
