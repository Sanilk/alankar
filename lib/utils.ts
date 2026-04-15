export function formatPrice(amount: number) {
  return `₹${(amount / 100).toFixed(2)}`;
}

export function truncate(text: string, length = 100) {
  return text.length > length
    ? text.slice(0, length) + "..."
    : text;
}