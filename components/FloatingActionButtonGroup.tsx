import React, { ReactChild, ReactChildren } from 'react';
import { StyleSheet } from 'react-native';
import { View } from './Themed';

const styles = StyleSheet.create({
  containerStyle: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    borderRadius: 1,
    // borderColor: 'black',
    // borderWidth: 1,
    backgroundColor: 'transparent',
  },
});

export default ({ children }: { children: ReactChildren | ReactChild | ReactChild[] }) => {
  return (
    <View style={styles.containerStyle}>
      {children}
    </View>
  );
};
