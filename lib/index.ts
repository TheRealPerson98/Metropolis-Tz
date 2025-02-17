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
}

export default CityTimezones;
