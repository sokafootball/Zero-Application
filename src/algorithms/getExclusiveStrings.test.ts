import { getExclusiveStrings } from './getExclusiveStrings';

describe('getExclusiveStrings', () => {
  it('should return an empty array if both input arrays are empty', () => {
    const result = getExclusiveStrings([], []);
    expect(result).toEqual([]);
  });

  it('should return the first array if the second array is empty', () => {
    const result = getExclusiveStrings(['a', 'b', 'c'], []);
    expect(result).toEqual(['a', 'b', 'c']);
  });

  it('should return the second array if the first array is empty', () => {
    const result = getExclusiveStrings([], ['x', 'y', 'z']);
    expect(result).toEqual(['x', 'y', 'z']);
  });

  it('should return the strings present in only one of the two arrays', () => {
    const result = getExclusiveStrings(
      ['apple', 'banana', 'orange', 'grape'],
      ['banana', 'kiwi', 'orange', 'pear']
    );
    expect(result).toEqual(['apple', 'grape', 'kiwi', 'pear']);
  });

  it('should handle duplicate strings correctly', () => {
    const result = getExclusiveStrings(
      ['apple', 'banana', 'apple', 'orange'],
      ['banana', 'kiwi', 'kiwi', 'orange', 'pear']
    );
    expect(result).toEqual(['apple', 'kiwi', 'pear']);
  });

  it('should handle cases with no exclusive strings', () => {
    const result = getExclusiveStrings(['a', 'b', 'c'], ['a', 'b', 'c']);
    expect(result).toEqual([]);
  });
});
