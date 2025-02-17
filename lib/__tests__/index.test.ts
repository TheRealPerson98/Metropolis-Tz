import CityTimezones from '../index';

describe('CityTimezones', () => {
  const cityTimezones = new CityTimezones();

  test('should return correct timezone for New York City', () => {
    expect(cityTimezones.getTimezone('New York City', 'US')).toBe('America/New_York');
  });

  test('should return null for non-existent city', () => {
    expect(cityTimezones.getTimezone('NonExistent', 'XX')).toBeNull();
  });

  test('should return all cities', () => {
    const cities = cityTimezones.getAllCities();
    expect(Array.isArray(cities)).toBe(true);
    expect(cities.length).toBeGreaterThan(0);
  });

  test('should find all cities containing "New York"', () => {
    const results = cityTimezones.searchCities('New York');
    expect(results.length).toBeGreaterThan(1);
    expect(results).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'New York City', country: 'US' }),
        expect.objectContaining({ name: 'East New York', country: 'US' }),
        expect.objectContaining({ name: 'West New York', country: 'US' })
      ])
    );
    // All results should contain "New York" in their name
    results.forEach(city => {
      expect(city.name.toLowerCase()).toContain('new york');
    });
  });

  test('should return all cities in America/New_York timezone', () => {
    const results = cityTimezones.getCitiesByTimezone('America/New_York');
    expect(results.length).toBeGreaterThan(0);
    // All cities should be in America/New_York timezone
    results.forEach(city => {
      expect(city.timezone).toBe('America/New_York');
    });
    // Should include New York City
    expect(results).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ 
          name: 'New York City',
          country: 'US',
          timezone: 'America/New_York'
        })
      ])
    );
  });

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
