import React, { useEffect, useState } from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import { IImageInfo } from 'react-native-image-zoom-viewer/built/image-viewer.type';
import { fetchWallpaperData, WallpaperDataResponse } from '../action/BingDailyWallpaper';
import { Spinner, View } from '../components/Themed';

// Store the data on top level
let images: Array<IImageInfo> | null = null;

export default () => {
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWallpaperData()
      .then((resp) => resp.json())
      .then((jsonData: WallpaperDataResponse) => {
        images = [{
          // Guaranteed to have at least one image
          url: `https://www.bing.com${jsonData.images[0].url}`,
        }];
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <View style={{ flex: 1, }}>
      {
        isLoading ?
          <Spinner/> :
          <ImageViewer imageUrls={images!!} style={{ flex: 1, }} renderIndicator={() => {
          }}/>
      }
    </View>
  );
};
