declare global {
  export type Brand<K, T> = K & { __brand: T };

  export type UniqId = string;
  export type Email = string;
  export type Slug = string;
  export type DateTimeString = string;
}

export {};
