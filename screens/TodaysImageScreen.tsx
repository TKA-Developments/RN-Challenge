import React from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import SplashScreen from './SplashScreen';
import AlertBox from '../components/AlertBox';
import useBingDailyWallpaperUrl from '../hooks/useBingDailyWallpaperUrl';

export default () => {
  const {
    isLoading,
    errorMessage,
    imageUrl,
  } = useBingDailyWallpaperUrl();

  if (isLoading) {
    return (<SplashScreen/>);
  }

  return errorMessage !== null
    ? <AlertBox message={errorMessage}/> : (
      <ImageViewer
        imageUrls={[{ url: imageUrl }]}
        style={{ flex: 1 }}
        renderIndicator={() => <></>}
      />
    );
};
