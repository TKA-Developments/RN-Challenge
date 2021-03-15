export const API_URL = 'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US';

// The wallpaper are intended for a desktop.
// Be careful with it's size
export const fetchWallpaperData = () => fetch(API_URL);

export type Image = {
  startdate: string;
  fullstartdate: string;
  enddate: string;
  url: string;
  urlbase: string;
  copyright: string;
  copyrightlink: string;
  title: string;
  quiz: string;
  wp: boolean;
  hsh: string;
  drk: number;
  top: number;
  bot: number;
  hs: any[];
};

export type Tooltips = {
  loading: string;
  previous: string;
  next: string;
  walle: string;
  walls: string;
};

export type WallpaperDataResponse = {
  images: Image[];
  tooltips: Tooltips;
};
