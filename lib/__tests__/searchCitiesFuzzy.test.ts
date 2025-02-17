import CityTimezones from '../index';

describe('searchCitiesFuzzy', () => {
  const cityTz = new CityTimezones();

  test('finds city with exact match', () => {
    const cities = cityTz.searchCitiesFuzzy('London', 2);
    expect(cities.some((city) => city.name === 'London')).toBe(true);
  });

  test('finds city with typo', () => {
    const cities = cityTz.searchCitiesFuzzy('Londun', 2);
    expect(cities.some((city) => city.name === 'London')).toBe(true);
  });

  test('respects maximum distance', () => {
    const cities = cityTz.searchCitiesFuzzy('Londonnn', 1);
    expect(cities.some((city) => city.name === 'London')).toBe(false);
  });

  test('handles empty query', () => {
    const cities = cityTz.searchCitiesFuzzy('', 2);
    // Empty query should return cities with very short names (distance ≤ 2)
    expect(cities.every((city) => city.name.length <= 2)).toBe(true);
  });

  test('is case insensitive', () => {
    const cities = cityTz.searchCitiesFuzzy('LONDUN', 2);
    expect(cities.some((city) => city.name === 'London')).toBe(true);
  });
});
