/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import citiesData from './data/cities.json';

export interface CityInfo {
  /** The name of the city */
  name: string;
  /** The ISO country code (e.g., 'US', 'GB') */
  country: string;
  /** The IANA timezone identifier (e.g., 'America/New_York') */
  timezone: string;
  /** The latitude coordinate of the city */
  latitude: number;
  /** The longitude coordinate of the city */
  longitude: number;
  /** The population of the city */
  population?: number;
}

interface IndexedCity extends CityInfo {
  searchKey: string;
}

/**
 * A high-performance library for managing city timezone information worldwide.
 * Uses binary search and optimized data structures for fast lookups.
 */
class CityTimezones {
  private readonly cities: IndexedCity[];

  constructor() {
    // Create a single sorted array with pre-computed search keys
    this.cities = (citiesData as CityInfo[])
      .map((city) => ({
        ...city,
        country: city.country.toUpperCase(),
        searchKey: `${city.name.toLowerCase()}|${city.country.toUpperCase()}`,
      }))
      .sort((a, b) => a.searchKey.localeCompare(b.searchKey));
  }

  private binarySearch(searchKey: string): number {
    let low = 0;
    let high = this.cities.length - 1;

    while (low <= high) {
      const mid = (low + high) >>> 1;
      const cmp = this.cities[mid].searchKey.localeCompare(searchKey);

      if (cmp === 0) return mid;
      if (cmp < 0) low = mid + 1;
      else high = mid - 1;
    }

    return -1;
  }

  private levenshteinDistance(a: string, b: string): number {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = Array(b.length + 1)
      .fill(null)
      .map(() => Array(a.length + 1).fill(null));

    for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= b.length; j++) matrix[j][0] = j;

    for (let j = 1; j <= b.length; j++) {
      for (let i = 1; i <= a.length; i++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + cost
        );
      }
    }

    return matrix[b.length][a.length];
  }

  /**
   * Gets the timezone for a specific city and country.
   * @param cityName The name of the city
   * @param country The ISO country code (e.g., 'US', 'GB')
   * @returns The IANA timezone identifier or null if not found
   * @example
   * const timezone = cityTimezones.getTimezone('New York', 'US');
   * console.log(timezone); // 'America/New_York'
   */
  getTimezone(cityName: string, country: string): string | null {
    const searchKey = `${cityName.toLowerCase()}|${country.toUpperCase()}`;
    const index = this.binarySearch(searchKey);
    return index >= 0 ? this.cities[index].timezone : null;
  }

  /**
   * Searches for cities by name (case-insensitive partial match).
   * @param query The search query
   * @returns Array of matching cities
   * @example
   * const cities = cityTimezones.searchCities('york');
   * // Returns all cities containing 'york' in their name
   */
  searchCities(query: string): CityInfo[] {
    const searchTerm = query.toLowerCase();
    const results: CityInfo[] = [];

    // Binary search for the first potential match
    let index = 0;
    while (index < this.cities.length && !this.cities[index].searchKey.includes(searchTerm)) {
      index++;
    }

    // Collect all matches
    while (index < this.cities.length) {
      const city = this.cities[index];
      if (city.name.toLowerCase().includes(searchTerm)) {
        results.push(city);
      }
      index++;
    }

    return results;
  }

  /**
   * Gets all cities in the database.
   * @returns Array of all cities
   */
  getAllCities(): CityInfo[] {
    return this.cities;
  }

  /**
   * Gets all cities in a specific timezone.
   * @param timezone The IANA timezone identifier
   * @returns Array of cities in the specified timezone
   * @example
   * const cities = cityTimezones.getCitiesByTimezone('America/New_York');
   */
  getCitiesByTimezone(timezone: string): CityInfo[] {
    return this.cities.filter((city) => city.timezone === timezone);
  }

  /**
   * Gets a sorted list of all unique country codes.
   * @returns Array of ISO country codes
   */
  getUniqueCountries(): string[] {
    return [...new Set(this.cities.map((city) => city.country))].sort();
  }

  /**
   * Gets a sorted list of all unique timezone identifiers.
   * @returns Array of IANA timezone identifiers
   */
  getUniqueTimezones(): string[] {
    return [...new Set(this.cities.map((city) => city.timezone))].sort();
  }

  /**
   * Gets the current offset from UTC for a timezone in minutes.
   * @param timezone The IANA timezone identifier
   * @returns The offset in minutes or null if invalid
   * @example
   * const offset = cityTimezones.getTimezoneOffset('America/New_York');
   * console.log(offset); // -240 (during EDT)
   */
  getTimezoneOffset(timezone: string): number | null {
    try {
      const date = new Date();
      const timeString = date.toLocaleString('en-US', { timeZone: timezone });
      const localTime = new Date(timeString);
      const utcTime = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
      return (localTime.getTime() - utcTime.getTime()) / (1000 * 60);
    } catch (_error) {
      return null;
    }
  }

  /**
   * Gets all cities in a specific country.
   * @param country The ISO country code
   * @returns Array of cities in the specified country
   * @example
   * const cities = cityTimezones.getCitiesByCountry('US');
   */
  getCitiesByCountry(country: string): CityInfo[] {
    const searchKey = country.toUpperCase();
    return this.cities.filter((city) => city.country === searchKey);
  }

  /**
   * Gets the time difference between two cities in minutes.
   * @param fromCity The name of the source city
   * @param fromCountry The ISO country code of the source city
   * @param toCity The name of the destination city
   * @param toCountry The ISO country code of the destination city
   * @returns The time difference in minutes or null if invalid
   * @example
   * const diff = cityTimezones.getTimeDifference('New York', 'US', 'London', 'GB');
   * console.log(diff); // -300 (5 hours behind during EDT)
   */
  getTimeDifference(
    fromCity: string,
    fromCountry: string,
    toCity: string,
    toCountry: string
  ): number | null {
    const fromTimezone = this.getTimezone(fromCity, fromCountry);
    const toTimezone = this.getTimezone(toCity, toCountry);

    if (!fromTimezone || !toTimezone) return null;

    const fromOffset = this.getTimezoneOffset(fromTimezone);
    const toOffset = this.getTimezoneOffset(toTimezone);

    if (fromOffset === null || toOffset === null) return null;

    return toOffset - fromOffset;
  }

  /**
   * Formats a time difference in minutes into a human-readable string.
   * @param minutes The time difference in minutes
   * @returns A human-readable string describing the time difference
   * @example
   * const str = cityTimezones.formatTimeDifference(-300);
   * console.log(str); // 'behind by 5 hours'
   */
  formatTimeDifference(minutes: number): string {
    if (minutes === 0) return 'same time';

    const hours = Math.floor(Math.abs(minutes) / 60);
    const remainingMinutes = Math.abs(minutes) % 60;
    const parts: string[] = [];

    if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
    if (remainingMinutes > 0)
      parts.push(`${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}`);

    const timeString = parts.join(' and ');
    return minutes > 0 ? `ahead by ${timeString}` : `behind by ${timeString}`;
  }

  private haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    return 2 * R * Math.asin(Math.sqrt(a));
  }

  /**
   * Finds the nearest city to given coordinates.
   * @param lat Latitude
   * @param lon Longitude
   * @param maxResults Maximum number of results to return
   */
  findNearestCities(lat: number, lon: number, maxResults: number = 5): CityInfo[] {
    return [...this.cities]
      .map((city) => ({
        ...city,
        distance: this.haversineDistance(lat, lon, city.latitude, city.longitude),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, maxResults);
  }
  /**
   * Converts a time from one city's timezone to another's.
   * @param time The Date object to convert
   * @param fromCity Source city name
   * @param fromCountry Source country code
   * @param toCity Target city name
   * @param toCountry Target country code
   */
  convertTime(
    time: Date,
    fromCity: string,
    fromCountry: string,
    toCity: string,
    toCountry: string
  ): Date | null {
    const fromTz = this.getTimezone(fromCity, fromCountry);
    const toTz = this.getTimezone(toCity, toCountry);
    if (!fromTz || !toTz) return null;

    try {
      const timeString = time.toLocaleString('en-US', { timeZone: fromTz });
      return new Date(new Date(timeString).toLocaleString('en-US', { timeZone: toTz }));
    } catch (_error) {
      return null;
    }
  }
  /**
   * Gets major cities (by population) in a country.
   * @param country The ISO country code
   * @param limit Maximum number of cities to return
   */
  getMajorCities(country: string, limit: number = 5): CityInfo[] {
    return this.getCitiesByCountry(country)
      .sort((a, b) => (b.population ?? 0) - (a.population ?? 0))
      .slice(0, limit);
  }
  /**
   * Formats a city's information into a readable string.
   */
  formatCityInfo(city: CityInfo, format: string = '{name}, {country}'): string {
    return format
      .replace('{name}', city.name)
      .replace('{country}', city.country)
      .replace('{timezone}', city.timezone)
      .replace('{coordinates}', `${city.latitude},${city.longitude}`);
  }
  /**
   * Fuzzy searches cities with better matching and typo tolerance.
   * @param query The search query
   * @param maxDistance Maximum Levenshtein distance for matches
   */
  searchCitiesFuzzy(query: string, maxDistance: number = 2): CityInfo[] {
    const searchTerm = query.toLowerCase();
    return this.cities.filter((city) => {
      const distance = this.levenshteinDistance(city.name.toLowerCase(), searchTerm);
      return distance <= maxDistance;
    });
  }
  /**
   * Validates if a city exists in the database.
   */
  isValidCity(cityName: string, country: string): boolean {
    return this.binarySearch(`${cityName.toLowerCase()}|${country.toUpperCase()}`) !== -1;
  }

  /**
   * Validates if a timezone is supported.
   */
  isValidTimezone(timezone: string): boolean {
    return this.getUniqueTimezones().includes(timezone);
  }
  /**
   * Gets the current time in a specific city.
   * @param cityName The name of the city
   * @param country The ISO country code
   * @returns The current Date object in the city's timezone or null if invalid
   * @example
   * const time = cityTimezones.getCurrentTime('Tokyo', 'JP');
   */
  getCurrentTime(cityName: string, country: string): Date | null {
    const timezone = this.getTimezone(cityName, country);
    if (!timezone) return null;

    try {
      const timeString = new Date().toLocaleString('en-US', { timeZone: timezone });
      return new Date(timeString);
    } catch (_error) {
      return null;
    }
  }
}

export default CityTimezones;
