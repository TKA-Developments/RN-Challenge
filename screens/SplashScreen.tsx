import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Spinner, Text, View, } from '../components/Themed';

const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  loadingTextStyle: {
    fontWeight: 'bold',
    fontSize: 30,
  },
});

export default () => {
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    const dotTimeout = setTimeout(() => {
      setDotCount((dotCount + 1) % 5);
    }, 300);
    return () => {
      clearTimeout(dotTimeout);
    };
  }, [dotCount]);

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.loadingTextStyle}>Loading{'.'.repeat(dotCount)}</Text>
      <Spinner size="large"/>
    </View>
  );
};
