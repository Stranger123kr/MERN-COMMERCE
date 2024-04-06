export const ITEMS_PER_PAGE = 10;

export const discountPrice = (item) => {
  return Math.round(item.price * (1 - item.discountPercentage / 100));
};

export const whiteColor = "text-black";
export const blackColor = "text-white";
export const bg_black = "bg-black";
export const bg_white = "bg-white";
