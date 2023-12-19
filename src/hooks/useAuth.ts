import { AuthorityConstant } from "@/config";
import { useSession, signOut, signIn } from "next-auth/react";
import { useCallback, useMemo } from "react";

const useAuth = () => {
  const { data: session, status }: any = useSession();

  const user = useMemo(() => session?.user ?? {}, [session]);

  const authorities: string[] = useMemo(() => user?.authorities ?? [], [user]);

  const isAuthenticated = useMemo(() => status === "authenticated", [status]);

  const isSystemAdmin = useCallback((): boolean => authorities.includes(AuthorityConstant.superAdmin), [authorities]);

  const hasAuthority = useCallback((..._authorities: string[]): boolean => {
    if (isSystemAdmin()) return true;

    for (const authority of _authorities) {
      if (!authorities.includes(authority)) {
        return false;
      }
    }
    return true;
  }, [authorities, isSystemAdmin]);

  const hasAnyAuthority = useCallback((..._authorities: string[]): boolean => {
    if (!_authorities.length) return true;
    for (const authority of _authorities) {
      if (hasAuthority(authority)) return true;
    }
    return false;
  }, [hasAuthority]);

  const logIn = signIn;

  const logOut = signOut;


  return {
    user,
    session,
    isAuthenticated,
    hasAuthority,
    hasAnyAuthority,
    logIn,
    logOut,
  };
};

export default useAuth;
