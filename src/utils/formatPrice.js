export function formatPrice(value) {
  const num = Number(value);
  if (Number.isNaN(num)) return value;
  const integer = Math.trunc(num);
  const fractional = Math.round((num - integer) * 100);
  if (fractional === 0) return `${integer},00`;
  return `${integer},${fractional.toString().padStart(2, '0')}`;
}
