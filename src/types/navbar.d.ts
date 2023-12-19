export interface NavbarItem {
  title: string;
  icon?: string;
  info?: string;
  path?: string;
  children?: NavbarItem[];
  authority?: string[];
}

export interface NavbarGroup extends NavbarItem {
  children: NavbarItem[];
}
