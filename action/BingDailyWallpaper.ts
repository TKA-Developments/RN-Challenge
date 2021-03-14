export const API_URL = 'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US';

// The wallpaper are intended for a desktop.
// Be careful with it's size
export const fetchWallpaperUrl = () => fetch(API_URL);
