export const calculateCommission = ({
  type,
  wineLevel,
  abaloneQty,
  wineQty,
}) => {
  if (type === "wine") {
    let price = 0;

    if (wineLevel === "3m") {
      price = 50000;
    }

    if (wineLevel === "1m") {
      price = 20000;
    }

    return price * Number(wineQty || 1);
  }

  if (type === "abalone") {
    return Number(abaloneQty || 1) * 20000;
  }

  return 0;
};

// ✅ PHẢI CÓ EXPORT NÀY
export const formatMoney = (number) => {
  return Number(number).toLocaleString("vi-VN") + "đ";
};