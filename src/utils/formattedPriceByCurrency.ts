export const formattedPriceByCurrency = (
  price: number,
  currency: string,
  locale: string = "vi-VN"
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: currency === 'VND' ? 0 : 2,
    maximumFractionDigits: currency === 'VND' ? 0 : 2,
  }).format(price);
}
