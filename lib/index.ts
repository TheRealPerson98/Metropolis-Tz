/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { CityInfo, cities } from './data/cities';

class CityTimezones {
  private cities: CityInfo[] = cities;

  getTimezone(cityName: string, country: string): string | null {
    const city = this.cities.find(
      (c) =>
        c.name.toLowerCase() === cityName.toLowerCase() &&
        c.country.toLowerCase() === country.toLowerCase()
    );

    return city ? city.timezone : null;
  }

  searchCities(query: string): CityInfo[] {
    const searchTerm = query.toLowerCase();
    return this.cities.filter((city) => 
      city.name.toLowerCase().includes(searchTerm)
    );
  }

  getAllCities(): CityInfo[] {
    return [...this.cities];
  }

  getCitiesByTimezone(timezone: string): CityInfo[] {
    return this.cities.filter((city) => 
      city.timezone.toLowerCase() === timezone.toLowerCase()
    );
  }

  getUniqueCountries(): string[] {
    const countries = new Set(this.cities.map((city) => city.country));
    return Array.from(countries).sort();
  }

  getUniqueTimezones(): string[] {
    const timezones = new Set(this.cities.map((city) => city.timezone));
    return Array.from(timezones).sort();
  }

  getTimezoneOffset(timezone: string): number | null {
    try {
      const date = new Date();
      const timeString = date.toLocaleString('en-US', { timeZone: timezone });
      const localTime = new Date(timeString);
      const utcTime = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
      return (localTime.getTime() - utcTime.getTime()) / (1000 * 60);
    } catch (error) {
      return null;
    }
  }

  getCitiesByCountry(country: string): CityInfo[] {
    return this.cities.filter(
      (city) => city.country.toLowerCase() === country.toLowerCase()
    );
  }

  getTimeDifference(fromCity: string, fromCountry: string, toCity: string, toCountry: string): number | null {
    const fromTimezone = this.getTimezone(fromCity, fromCountry);
    const toTimezone = this.getTimezone(toCity, toCountry);

    if (!fromTimezone || !toTimezone) return null;

    const fromOffset = this.getTimezoneOffset(fromTimezone);
    const toOffset = this.getTimezoneOffset(toTimezone);

    if (fromOffset === null || toOffset === null) return null;

    return toOffset - fromOffset;
  }

  formatTimeDifference(minutes: number): string {
    if (minutes === 0) return 'same time';
    
    const hours = Math.floor(Math.abs(minutes) / 60);
    const remainingMinutes = Math.abs(minutes) % 60;
    const parts: string[] = [];
    
    if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
    if (remainingMinutes > 0) parts.push(`${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}`);
    
    const timeString = parts.join(' and ');
    return minutes > 0 ? `ahead by ${timeString}` : `behind by ${timeString}`;
  }

  getCurrentTime(cityName: string, country: string): Date | null {
    const timezone = this.getTimezone(cityName, country);
    if (!timezone) return null;

    try {
      const timeString = new Date().toLocaleString('en-US', { timeZone: timezone });
      return new Date(timeString);
    } catch (error) {
      return null;
    }
  }
}

export default CityTimezones;
