export interface FeaturedCity {
  name: string;
  chineseName: string;
  temp: number; // 預設顯示溫度
  status: string; // 預設顯示狀態
  lat: number;
  lon: number;
}

export const FEATURED_CITIES: FeaturedCity[] = [
  {
    name: 'Taipei',
    chineseName: '台北市',
    temp: 24,
    status: '多雲時晴',
    lat: 25.033,
    lon: 121.565,
  },
  {
    name: 'Taichung',
    chineseName: '台中市',
    temp: 26,
    status: '晴朗',
    lat: 24.147,
    lon: 120.673,
  },
  {
    name: 'Kaohsiung',
    chineseName: '高雄市',
    temp: 28,
    status: '晴',
    lat: 22.627,
    lon: 120.301,
  },
  {
    name: 'Tainan',
    chineseName: '台南市',
    temp: 27,
    status: '多雲',
    lat: 22.999,
    lon: 120.227,
  },
];
