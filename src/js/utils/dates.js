const isSameYear = (aDate, bDate = new Date()) => {
  const yearA = new Date(aDate).getFullYear();
  const yearB = new Date(bDate).getFullYear();

  return yearA === yearB;
};

const isSameMonth = (aDate, bDate = new Date()) => {
  const monthA = new Date(aDate).getMonth();
  const monthB = new Date(bDate).getMonth();

  return monthA === monthB;
};

const isSameDateOfMonth = (aDate, bDate = new Date()) => {
  const dateA = new Date(aDate).getDate();
  const dateB = new Date(bDate).getDate();

  return dateA === dateB;
};

const isSameDate = (aDate, bDate = new Date()) => {
  return (
    isSameYear(aDate, bDate) &&
    isSameMonth(aDate, bDate) &&
    isSameDateOfMonth(aDate, bDate)
  );
};

export const relativeDate = (dateCreated) => {
  const date = new Date(dateCreated);
  return `${isSameDate(date) ? "" : date.toLocaleDateString()} ${
    isSameDate(date) ? date.toLocaleTimeString() : ""
  }`;
};
