export const formatPrice = (price) => {
  if (!price) {
    return "";
  }
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};
