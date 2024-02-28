export const ITEMS_PER_PAGE = 10;
export const ORDERS_PER_PAGE = 5;
export function discountPrice(item) {
  return Math.round(item.price * (1 - item.discountPercentage / 100));
}
