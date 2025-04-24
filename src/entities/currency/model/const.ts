export const CurrencyEnum = {
  RUB: 'RUB',
  USD: 'USD',
  EUR: 'EUR'
} as const;

export type Currency = keyof typeof CurrencyEnum;

export const CurrencyOptions = [
  { value: CurrencyEnum.RUB, label: 'RUB' },
  { value: CurrencyEnum.USD, label: 'USD' },
  { value: CurrencyEnum.EUR, label: 'EUR' }
];

export const DEFAULT_CURRENCY = CurrencyEnum.RUB;
