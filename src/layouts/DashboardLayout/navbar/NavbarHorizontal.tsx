import { memo } from "react";
import { Container } from "@mui/material";
import { NavSectionHorizontal } from "@/sections/nav";
import NavbarConfig from "@/config/navbar";


function NavbarHorizontal() {
  return (
    <Container maxWidth={false}>
      <NavSectionHorizontal navConfig={NavbarConfig} />
    </Container>
  );
}

export default memo(NavbarHorizontal);
