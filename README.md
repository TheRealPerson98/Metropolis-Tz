# Metropolis-TZ

[![CI](https://github.com/TheRealPerson98/Metropolis-Tz/actions/workflows/ci.yml/badge.svg)](https://github.com/TheRealPerson98/Metropolis-Tz/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/metropolis-tz.svg)](https://badge.fury.io/js/metropolis-tz)
[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)

A lightweight and efficient TypeScript/JavaScript library for managing city timezone information worldwide. Perfect for applications that need to handle multiple cities and their corresponding timezones.

## Features

- 🌍 Get timezone information for cities worldwide
- 🔍 Search cities by name
- 🕒 Find all cities in a specific timezone
- 🌐 Get a list of unique countries
- ✨ TypeScript support out of the box
- 📦 Zero dependencies
- ⚡ Fast and efficient

## Requirements

- Node.js >= 18.0.0

## Installation

```bash
npm install metropolis-tz
```

## Usage

```typescript
import CityTimezones from 'metropolis-tz';

const cityTimezones = new CityTimezones();

// Get timezone for a specific city
const nyTimezone = cityTimezones.getTimezone('New York City', 'US');
console.log(nyTimezone); // 'America/New_York'

// Search for cities
const newYorkCities = cityTimezones.searchCities('New York');
console.log(newYorkCities);
// [
//   { name: 'New York City', country: 'US', timezone: 'America/New_York' },
//   { name: 'East New York', country: 'US', timezone: 'America/New_York' },
//   ...
// ]

// Get all cities in a timezone
const newYorkTzCities = cityTimezones.getCitiesByTimezone('America/New_York');
console.log(newYorkTzCities);
// [
//   { name: 'New York City', country: 'US', timezone: 'America/New_York' },
//   { name: 'Boston', country: 'US', timezone: 'America/New_York' },
//   ...
// ]

// Get list of all unique countries
const countries = cityTimezones.getUniqueCountries();
console.log(countries); // ['US', 'CA', 'GB', ...]

// Get all cities
const allCities = cityTimezones.getAllCities();
```

## API Reference

### `getTimezone(cityName: string, country: string): string | null`
Returns the timezone for a given city and country. Returns null if the city is not found.

### `searchCities(query: string): CityInfo[]`
Searches for cities whose names contain the query string (case-insensitive).

### `getCitiesByTimezone(timezone: string): CityInfo[]`
Returns all cities in the specified timezone.

### `getUniqueCountries(): string[]`
Returns a sorted array of all unique country codes in the dataset.

### `getAllCities(): CityInfo[]`
Returns an array of all cities in the dataset.

### Types

```typescript
interface CityInfo {
  name: string;
  country: string;
  timezone: string;
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the Mozilla Public License 2.0 - see the [LICENSE](LICENSE) file for details.

## Author

Jace Sleeman 