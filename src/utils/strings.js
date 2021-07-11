export const removeStringAndAddSeperator = (str, sep) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[&\\/\\#, @^+()$~%.'":*?<>{}]/g, " ")
    .split(" ")
    .filter((el) => el)
    .join(`${sep}`);
};
