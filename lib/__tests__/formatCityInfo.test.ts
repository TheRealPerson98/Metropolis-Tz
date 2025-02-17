import CityTimezones from '../index';

describe('formatCityInfo', () => {
  const cityTz = new CityTimezones();
  const london = cityTz
    .searchCities('London')
    .find((city) => city.country === 'GB' && city.name === 'London');

  beforeEach(() => {
    expect(london).toBeDefined();
  });

  test('formats with default template', () => {
    const formatted = cityTz.formatCityInfo(london!);
    expect(formatted).toBe('London, GB');
  });

  test('formats with custom template', () => {
    const formatted = cityTz.formatCityInfo(london!, '{name} ({timezone})');
    expect(formatted).toBe('London (Europe/London)');
  });

  test('formats with coordinates', () => {
    const formatted = cityTz.formatCityInfo(london!, '{name} at {coordinates}');
    expect(formatted).toMatch(/London at \d+\.\d+,-?\d+\.\d+/);
  });

  test('handles all placeholders', () => {
    const formatted = cityTz.formatCityInfo(
      london!,
      '{name}, {country}, {timezone}, {coordinates}'
    );
    expect(formatted).toContain('London');
    expect(formatted).toContain('GB');
    expect(formatted).toContain('Europe/London');
    expect(formatted).toMatch(/\d+\.\d+,-?\d+\.\d+/);
  });
});
