import { isAnagram } from './isAnagram';

describe('isAnagram', () => {
  it('should return false if they are identical', () => {
    expect(isAnagram('ciao', 'ciao')).toBe(false);
    expect(isAnagram('test', 'test')).toBe(false);
    expect(isAnagram('', '')).toBe(false);
  });
  it('should return false if they have different lengths', () => {
    expect(isAnagram('testi', 'tent')).toBe(false);
    expect(isAnagram('ciao', 'ciaoo')).toBe(false);
    expect(isAnagram('unos', 'due')).toBe(false);
  });
  it('should return true for valid anagrams', () => {
    expect(isAnagram('asino', 'ansio')).toBe(true);
    expect(isAnagram('cane', 'nace')).toBe(true);
    expect(isAnagram('listen', 'silent')).toBe(true);
    expect(isAnagram('Tavolo', 'Volato')).toBe(true);
    expect(isAnagram('mela', 'alme')).toBe(true);
  });
});
