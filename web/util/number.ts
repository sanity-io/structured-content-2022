export const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
