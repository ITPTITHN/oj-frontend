import PropTypes from 'prop-types';
import { PropsWithChildren, useEffect } from "react";
import { useRouter } from 'next/router';
import useAuth from '../hooks/useAuth';
import APP_ROUTES from "@/routes";

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default function GuestGuard({ children }: PropsWithChildren) {
  const { push } = useRouter();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      push(APP_ROUTES.root).catch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return <>{children}</>;
}
