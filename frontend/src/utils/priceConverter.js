export const formatPrice = (value) => {
  const formatter = new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return `${formatter.format(value)} ₽`;
};
