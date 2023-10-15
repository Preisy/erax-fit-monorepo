export const filterUndefined = (object: Record<string, any>) => {
  const filteredEntries = Object.entries(object).filter((item) => item[1] !== undefined);
  return Object.fromEntries(filteredEntries);
};
