export const formatNumber = (amount, decimal = undefined) => {
  if (amount) {
    return amount.toLocaleString(undefined, {
      minimumFractionDigits: decimal,
      maximumFractionDigits: decimal,
    });
  }
  return;
};

export const subtractDaysFromDate = (days) => {
  const date = new Date();
  const result = date.setDate(date.getDate() - days);
  return encodeURIComponent(new Date(result).toISOString());
};

export const shortDateFormat = (date) => {
  const convertDate = new Date(date);
  const day = convertDate.getDate();
  const month = String(convertDate.getMonth() + 1).padStart(2, "0");
  const year = convertDate.getFullYear();
  return `${day}/${month}/${year}`;
};
export const historyDuration = [
  {
    id: 1,
    name: "7 days",
    value: subtractDaysFromDate(7),
  },
  {
    id: 2,
    name: "14 days",
    value: subtractDaysFromDate(14),
  },
  {
    id: 3,
    name: "30 days",
    value: subtractDaysFromDate(30),
  },
];
