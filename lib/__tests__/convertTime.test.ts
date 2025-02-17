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
      // Get hours in their respective timezones
      const nyFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York',
        hour: 'numeric',
        hour12: false,
      });
      const londonFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Europe/London',
        hour: 'numeric',
        hour12: false,
      });

      const nyHour = parseInt(nyFormatter.format(testDate));
      const londonHour = parseInt(londonFormatter.format(nyToLondon));

      // London should be ahead of NY by 4-5 hours depending on DST
      const hourDiff = (londonHour - nyHour + 24) % 24;
      expect(hourDiff).toBeGreaterThanOrEqual(4);
      expect(hourDiff).toBeLessThanOrEqual(5);
    }
  });
});
