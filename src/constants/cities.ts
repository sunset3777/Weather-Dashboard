export interface FeaturedCity {
  name: string;
  temp: number;
  status: string;
  lat: number;
  lon: number;
}

export const FEATURED_CITIES: FeaturedCity[] = [
  {
    name: 'Taipei',
    temp: 24,
    status: 'Partly Cloudy',
    lat: 25.033,
    lon: 121.565,
  },
  {
    name: 'Taichung',
    temp: 26,
    status: 'Sunny',
    lat: 24.147,
    lon: 120.673,
  },
  {
    name: 'Kaohsiung',
    temp: 28,
    status: 'Clear',
    lat: 22.627,
    lon: 120.301,
  },
  {
    name: 'Tainan',
    temp: 27,
    status: 'Cloudy',
    lat: 22.999,
    lon: 120.227,
  },
];
