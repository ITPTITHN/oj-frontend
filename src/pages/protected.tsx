import { Box, Button } from "@mui/material";
import AuthGuard from "@/guards/AuthGuard";
import useAuth from "@/hooks/useAuth";
import { signOut } from "next-auth/react";
import { LAYOUT } from "@/layouts";

export default function ProtectedPage() {
  const { session } = useAuth();

  return (
    <AuthGuard>
      <Box>
        <h1>Hello, {session?.user?.name}</h1>
        <Button onClick={() => signOut()}>Sign out</Button>
      </Box>
    </AuthGuard>
  );
}

ProtectedPage.layout = LAYOUT.dashboard;
