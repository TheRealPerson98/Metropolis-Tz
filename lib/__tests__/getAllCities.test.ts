/// <reference types="jest" />
import CityTimezones from '../index';

describe('CityTimezones.getAllCities', () => {
  const cityTimezones = new CityTimezones();

  test('should return all cities', () => {
    const cities = cityTimezones.getAllCities();
    expect(Array.isArray(cities)).toBe(true);
    expect(cities.length).toBeGreaterThan(0);
  });
});
