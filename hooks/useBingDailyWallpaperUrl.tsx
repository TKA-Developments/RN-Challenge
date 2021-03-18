import React, { useEffect, useState } from 'react';
import { fetchWallpaperData, WallpaperDataResponse } from '../action/BingDailyWallpaper';

export default () => {
  const [imageUrl, setImageUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchWallpaperData()
      .then((resp) => resp.json())
      .then((jsonData: WallpaperDataResponse) => {
        setImageUrl(`https://www.bing.com${jsonData.images[0].url}`);
      })
      .catch((reason) => {
        setErrorMessage(`Error: ${reason}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return {
    imageUrl,
    setImageUrl,
    errorMessage,
    setErrorMessage,
    isLoading,
    setIsLoading,
  };
};
