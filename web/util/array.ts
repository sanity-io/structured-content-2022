export const partition = <T, K extends string>(
  array: T[],
  predicate: (currentValue: T) => K
) => {
  const result = {} as { [key in K]: T[] };
  for (const value of array) {
    const key = predicate(value);
    if (!result[key]) {
      result[key] = [];
    }

    result[key].push(value);
  }

  return result;
};
