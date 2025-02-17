/// <reference types="jest" />
import CityTimezones from '../index';

describe('CityTimezones.searchCities', () => {
  const cityTimezones = new CityTimezones();

  test('should find all cities containing "New York"', () => {
    const results = cityTimezones.searchCities('New York');
    expect(results.length).toBeGreaterThan(1);
    expect(results).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'New York City', country: 'US' }),
        expect.objectContaining({ name: 'East New York', country: 'US' }),
        expect.objectContaining({ name: 'West New York', country: 'US' }),
      ])
    );
    // All results should contain "New York" in their name
    results.forEach((city) => {
      expect(city.name.toLowerCase()).toContain('new york');
    });
  });
});
