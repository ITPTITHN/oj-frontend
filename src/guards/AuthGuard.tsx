import { useState, useEffect, PropsWithChildren } from "react";
import { useRouter } from "next/router";
import LoadingScreen from "@/components/LoadingScreen";
import { useSession } from "next-auth/react";
import AppConfig from "@/config/app";
import useAuth from "@/hooks/useAuth";

export default function AuthGuard({ children }: PropsWithChildren) {
  const { logIn } = useAuth();
  const { status } = useSession({ required: true, onUnauthenticated: () => logIn(AppConfig.defaultAuthProvider) });
  const { pathname, push } = useRouter();

  const [requestedLocation, setRequestedLocation] = useState(null);

  useEffect(() => {
    if (requestedLocation && pathname !== requestedLocation) {
      setRequestedLocation(null);
      push(requestedLocation);
    }
  }, [pathname, push, requestedLocation]);

  if (status === "authenticated") {
    return <>{children}</>;
  }

  return <LoadingScreen />;
}
