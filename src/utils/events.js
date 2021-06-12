// Event is received in UPPER CASE
export const formatEventType = (type) => {
  const arr = type.split("_");
  let resultString = "";

  arr.forEach((word) => {
    resultString.concat();
    resultString =
      resultString +
      `${word.substr(0, 1).toUpperCase()}${word.substr(1).toLowerCase()} `;
  });

  return resultString;
};

export const isEventPastDate = (event) => {
  if (event && event.endDate) {
    return new Date() > new Date(event.endDate);
  }
};
