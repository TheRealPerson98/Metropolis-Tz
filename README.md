# Metropolis-TZ

[![CI](https://github.com/TheRealPerson98/Metropolis-Tz/actions/workflows/ci.yml/badge.svg)](https://github.com/TheRealPerson98/Metropolis-Tz/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/metropolis-tz.svg)](https://badge.fury.io/js/metropolis-tz)
[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)

A high-performance TypeScript/JavaScript library for managing city timezone information worldwide. Uses optimized data structures and binary search for extremely fast lookups.

## Features

- 🚀 High-performance binary search for lookups
- 🌍 Comprehensive worldwide city database with coordinates
- 🔍 Fast city search with smart partial matching and fuzzy search
- 🕒 Timezone offset and time difference calculations
- 🌐 ISO country code support
- ✨ Full TypeScript support
- 📦 Zero dependencies
- ⚡ Optimized for speed

## Requirements

- Node.js >= 18.0.0

## Installation

```bash
npm install metropolis-tz
```

## Quick Start

```typescript
import CityTimezones from 'metropolis-tz';

const cityTz = new CityTimezones();

// Get timezone for a city
const timezone = cityTz.getTimezone('New York', 'US');
console.log(timezone); // 'America/New_York'

// Search for cities (with typo tolerance)
const cities = cityTz.searchCitiesFuzzy('londun', 2);
// Will find 'London' despite the typo

// Validate city and timezone
const isValidCity = cityTz.isValidCity('Paris', 'FR'); // true
const isValidTz = cityTz.isValidTimezone('Europe/Paris'); // true

// Get time difference
const diff = cityTz.getTimeDifference('New York', 'US', 'London', 'GB');
console.log(cityTz.formatTimeDifference(diff!));
// "behind by 5 hours" (during EDT)
```

## API Reference

### Core Methods

#### `getTimezone(cityName: string, country: string): string | null`
Gets the IANA timezone identifier for a city.
```typescript
const timezone = cityTz.getTimezone('Paris', 'FR');
// Returns: 'Europe/Paris'
```

#### `searchCities(query: string): CityInfo[]`
Searches for cities by name (case-insensitive, partial match).
```typescript
const cities = cityTz.searchCities('san');
// Returns: San Francisco, San Diego, San Jose, etc.
```

#### `searchCitiesFuzzy(query: string, maxDistance: number = 2): CityInfo[]`
Searches for cities with typo tolerance using Levenshtein distance.
```typescript
const cities = cityTz.searchCitiesFuzzy('londun', 2);
// Returns: London (despite the typo)
```

### Validation Methods

#### `isValidCity(cityName: string, country: string): boolean`
Checks if a city exists in the database.
```typescript
const isValid = cityTz.isValidCity('Paris', 'FR'); // true
```

#### `isValidTimezone(timezone: string): boolean`
Checks if a timezone is supported.
```typescript
const isValid = cityTz.isValidTimezone('Europe/Paris'); // true
```

### Time Calculations

#### `getTimezoneOffset(timezone: string): number | null`
Gets the current UTC offset in minutes for a timezone.
```typescript
const offset = cityTz.getTimezoneOffset('America/Los_Angeles');
// Returns: -420 (7 hours behind UTC during PDT)
```

#### `getTimeDifference(fromCity: string, fromCountry: string, toCity: string, toCountry: string): number | null`
Calculates time difference between cities in minutes.
```typescript
const diff = cityTz.getTimeDifference('Tokyo', 'JP', 'London', 'GB');
console.log(cityTz.formatTimeDifference(diff!));
// Returns human-readable time difference
```

#### `convertTime(time: Date, fromCity: string, fromCountry: string, toCity: string, toCountry: string): Date | null`
Converts a time from one city's timezone to another's.
```typescript
const time = new Date('2024-03-15T12:00:00');
const converted = cityTz.convertTime(time, 'New York', 'US', 'Tokyo', 'JP');
```

### Geographic Methods

#### `findNearestCities(lat: number, lon: number, maxResults: number = 5): CityInfo[]`
Finds cities closest to given coordinates.
```typescript
const nearby = cityTz.findNearestCities(51.5074, -0.1278, 3); // Near London
```

#### `formatCityInfo(city: CityInfo, format: string = '{name}, {country}'): string`
Formats city information using a template string.
```typescript
const city = cityTz.findNearestCities(51.5074, -0.1278, 1)[0];
console.log(cityTz.formatCityInfo(city, '{name}, {country} ({coordinates})')); 
// "London, GB (51.5074,-0.1278)"
```

### Data Methods

#### `getAllCities(): CityInfo[]`
Returns all cities in the database.

#### `getCitiesByTimezone(timezone: string): CityInfo[]`
Gets all cities in a specific timezone.

#### `getUniqueCountries(): string[]`
Returns all unique country codes.

#### `getUniqueTimezones(): string[]`
Returns all unique timezone identifiers.

#### `getCitiesByCountry(country: string): CityInfo[]`
Returns all cities in a specific country.

### Types

```typescript
interface CityInfo {
  name: string;      // City name
  country: string;   // ISO country code (e.g., 'US', 'GB')
  timezone: string;  // IANA timezone (e.g., 'America/New_York')
  latitude: number;  // Geographical latitude
  longitude: number; // Geographical longitude
}
```

## Performance

The library uses optimized data structures and algorithms:
- Binary search for exact matches (O(log n))
- Pre-computed search keys
- Efficient string operations
- Smart partial matching
- Fuzzy search with Levenshtein distance

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the Mozilla Public License 2.0 - see the [LICENSE](LICENSE) file for details.

## Author

Jace Sleeman 