export const formatCurrency = (
  value: number,
  currency: string,
  locale?: string,
  options?: Intl.NumberFormatOptions
): string => {
  return Intl.NumberFormat(locale, {
    ...options,
    style: 'currency',
    currency,
  }).format(value);
};

export const formatPercentage = (value: number, locale?: string): string => {
  return Intl.NumberFormat(locale, { style: 'percent' }).format(value);
};
