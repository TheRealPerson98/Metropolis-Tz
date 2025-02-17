/// <reference types="jest" />
import CityTimezones from '../index';

describe('CityTimezones.getCitiesByTimezone', () => {
  const cityTimezones = new CityTimezones();

  test('should return all cities in America/New_York timezone', () => {
    const results = cityTimezones.getCitiesByTimezone('America/New_York');
    expect(results.length).toBeGreaterThan(0);
    // All cities should be in America/New_York timezone
    results.forEach((city) => {
      expect(city.timezone).toBe('America/New_York');
    });
    // Should include New York City
    expect(results).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'New York City',
          country: 'US',
          timezone: 'America/New_York',
        }),
      ])
    );
  });
});
