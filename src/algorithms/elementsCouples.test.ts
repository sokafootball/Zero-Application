import { getElementsCouples } from './elementsCouples';

describe('getElementsCouples', () => {
  it('should return an empty array for an empty input array', () => {
    const result = getElementsCouples([]);
    expect(result).toEqual([]);
  });

  it('should return an array containing the single element for an input array with one element', () => {
    const result = getElementsCouples(['Pizza']);
    expect(result).toEqual(['Pizza']);
  });

  it('should return an array of pairs for an input array with an even number of elements', () => {
    const result = getElementsCouples(['1', 'Venezia', 'Pasta', 'Kid']);
    expect(result.length).toBe(2);
    result.forEach((pair) => {
      expect(pair).toBeInstanceOf(Array);
      expect(pair.length).toBe(2);
    });
  });

  it('should return an array of pairs and a single element for an input array with an odd number of elements', () => {
    const result = getElementsCouples([
      '1',
      'Venezia',
      'Pasta',
      'Kid',
      'Homer',
    ]);
    expect(result.length).toBe(3);
    let pairCount = 0;
    let singleCount = 0;
    result.forEach((item) => {
      if (Array.isArray(item)) {
        expect(item.length).toBe(2);
        pairCount++;
      } else {
        singleCount++;
      }
    });
    expect(pairCount).toBe(2);
    expect(singleCount).toBe(1);
  });

  it('should handle duplicate values correctly', () => {
    const result = getElementsCouples([
      '1',
      '1',
      'Venezia',
      'Venezia',
      'Pasta',
    ]);
    expect(result.length).toBe(3);
    let pairCount = 0;
    let singleCount = 0;
    result.forEach((item) => {
      if (Array.isArray(item)) {
        expect(item.length).toBe(2);
        pairCount++;
      } else {
        singleCount++;
      }
    });
    expect(pairCount).toBe(2);
    expect(singleCount).toBe(1);
  });
});
