export const getExclusiveStrings = (
  arr1: string[],
  arr2: string[]
): string[] => {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  const exclusiveStrings: string[] = [];

  set1.forEach((string) => {
    if (!set2.has(string)) {
      exclusiveStrings.push(string);
    }
  });

  set2.forEach((string) => {
    if (!set1.has(string)) {
      exclusiveStrings.push(string);
    }
  });

  return exclusiveStrings;
};
