import { NavbarGroup } from "@/types/navbar";
import i18next from "i18next";
import Authority from "@/config/authority";

const NavbarConfig: NavbarGroup[] = [
  {
    title: i18next.t`Menu Item 1`,
    children: [
      {
        title: i18next.t`Menu Item 1.1`,
        children: [
          {
            title: i18next.t`Menu Item 1.1.1`,
            path: "/menu-item-1-1-1",
          },
          {
            title: i18next.t`Menu Item 1.1.2`,
            path: "/menu-item-1-1-2",
          },
        ],
      },
    ],
  },
  {
    title: i18next.t`Menu Item 2`,
    children: [
      {
        title: i18next.t`Menu Item 2.1`,
        path: "/menu-item-2-1",
      },
      {
        title: i18next.t`Menu Item 2.2`,
        path: "/menu-item-2-2",
        authority: [Authority.superAdmin]
      },
    ],
  },
  {
    title: i18next.t`Menu Item 3`,
    path: "/menu-item-3",
    children: [],
  },
];

export default NavbarConfig;
