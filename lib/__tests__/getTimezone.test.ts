/// <reference types="jest" />
import CityTimezones from '../index';

describe('CityTimezones.getTimezone', () => {
  const cityTimezones = new CityTimezones();

  test('should return correct timezone for New York City', () => {
    expect(cityTimezones.getTimezone('New York City', 'US')).toBe('America/New_York');
  });

  test('should return null for non-existent city', () => {
    expect(cityTimezones.getTimezone('NonExistent', 'XX')).toBeNull();
  });
});
