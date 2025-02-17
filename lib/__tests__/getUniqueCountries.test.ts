/// <reference types="jest" />
import CityTimezones from '../index';

describe('CityTimezones.getUniqueCountries', () => {
  const cityTimezones = new CityTimezones();

  test('should return unique countries in sorted order', () => {
    const countries = cityTimezones.getUniqueCountries();
    expect(Array.isArray(countries)).toBe(true);
    expect(countries.length).toBeGreaterThan(0);
    // Should include US
    expect(countries).toContain('US');
    // Should be sorted
    const sortedCountries = [...countries].sort();
    expect(countries).toEqual(sortedCountries);
    // Should have no duplicates
    const uniqueCountries = new Set(countries);
    expect(uniqueCountries.size).toBe(countries.length);
  });
}); 