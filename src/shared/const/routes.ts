export const ROUTER_PATHS = {
  HOME: '/',
  TRANSACTION: 'all',
  LOGIN: 'signin',
  SETTINGS: 'settings',
  NOT_FOUND: '*'
} as const;

export type RouterPaths = (typeof ROUTER_PATHS)[keyof typeof ROUTER_PATHS];
