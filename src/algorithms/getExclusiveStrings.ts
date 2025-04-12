export const getExclusiveStrings = (
  arr1: string[],
  arr2: string[]
): string[] => {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  const exclusiveStrings: string[] = [];

  for (const str of arr1) {
    if (!set2.has(str)) {
      exclusiveStrings.push(str);
    }
  }

  for (const str of arr2) {
    if (!set1.has(str)) {
      exclusiveStrings.push(str);
    }
  }

  return exclusiveStrings;
};
