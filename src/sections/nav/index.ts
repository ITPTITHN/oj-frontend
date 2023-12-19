
export { default as NavSectionVertical } from './vertical';
export { default as NavSectionHorizontal } from './horizontal';

export function isExternalLink(path: string = "") {
  return path.includes('http');
}

export function getActive(path: string = "", pathname: string, asPath: string): boolean {
  if (!path) return false;
  return pathname.includes(path) || asPath.includes(path);
}
