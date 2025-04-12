export const isAnagram = (string1: string, string2: string) => {
  const string1Normalised = string1.toLowerCase();
  const string2Normalised = string2.toLowerCase();

  if (string1Normalised === string2Normalised) {
    return false;
  }

  if (string1Normalised.length !== string2Normalised.length) {
    return false;
  }

  const charCount: { [key: string]: number } = {};
  for (const char of string1Normalised) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  for (const char of string2Normalised) {
    if (!charCount[char]) {
      return false;
    }
    charCount[char]--;
  }

  for (const char in charCount) {
    if (charCount[char] !== 0) {
      return false;
    }
  }

  return true;
};
