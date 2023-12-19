import PropTypes from "prop-types";
import { Container, Alert, AlertTitle } from "@mui/material";
import { PropsWithChildren } from "react";
import useAuth from "@/hooks/useAuth";

// ----------------------------------------------------------------------

RoleBasedGuard.propTypes = {
  accessibleRoles: PropTypes.array, // Example ['admin', 'leader']
  children: PropTypes.node,
};

interface RoleBasedGuardProps extends PropsWithChildren {
  accessibleAuthorities: string[];
  needAllAuthorities?: boolean;
}

export default function RoleBasedGuard({ accessibleAuthorities, needAllAuthorities, children }: RoleBasedGuardProps) {
  const { hasAuthority, hasAnyAuthority } = useAuth();
  const accessible = needAllAuthorities ? hasAuthority(...accessibleAuthorities) : hasAnyAuthority(...accessibleAuthorities);

  if (!accessible) {
    return (
      <Container>
        <Alert severity="error">
          <AlertTitle>Permission Denied</AlertTitle>
          You do not have permission to access this page
        </Alert>
      </Container>
    );
  }

  return <>{children}</>;
}
