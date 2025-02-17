import CityTimezones from '../index';

describe('findNearestCities', () => {
  const cityTz = new CityTimezones();

  test('finds London as the nearest city to its coordinates', () => {
    const cities = cityTz.findNearestCities(51.5074, -0.1278, 1);
    expect(cities).toHaveLength(1);
    expect(cities[0].name).toBe('London');
    expect(cities[0].country).toBe('GB');
  });

  test('returns correct number of results', () => {
    const cities = cityTz.findNearestCities(51.5074, -0.1278, 3);
    expect(cities).toHaveLength(3);
  });

  test('returns cities sorted by distance', () => {
    const cities = cityTz.findNearestCities(51.5074, -0.1278, 2);
    expect(cities[0].name).toBe('London'); // Closest
    expect(cities[1].name).not.toBe('London'); // Second closest
  });
});
