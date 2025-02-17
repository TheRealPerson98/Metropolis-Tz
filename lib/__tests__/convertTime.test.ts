import CityTimezones from '../index';

describe('convertTime', () => {
  const cityTz = new CityTimezones();
  const testDate = new Date('2024-03-15T12:00:00Z'); // Noon UTC

  test('converts time between New York and London', () => {
    const converted = cityTz.convertTime(testDate, 'New York City', 'US', 'London', 'GB');
    expect(converted).toBeInstanceOf(Date);
  });

  test('returns null for invalid city', () => {
    const converted = cityTz.convertTime(testDate, 'Invalid City', 'XX', 'London', 'GB');
    expect(converted).toBeNull();
  });

  test('maintains correct time difference', () => {
    // Convert from NY to London
    const nyToLondon = cityTz.convertTime(testDate, 'New York City', 'US', 'London', 'GB');
    expect(nyToLondon).not.toBeNull();

    if (nyToLondon) {
      // Get the hour in both timezones
      const nyHour = testDate.getUTCHours();
      const londonHour = nyToLondon.getUTCHours();

      // London should be ahead of NY by 4-5 hours depending on DST
      const hourDiff = (londonHour - nyHour + 24) % 24;
      expect(hourDiff).toBeGreaterThanOrEqual(4);
      expect(hourDiff).toBeLessThanOrEqual(5);
    }
  });
});
