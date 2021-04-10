import React from 'react';
import { Animated, Easing } from 'react-native';
import { Icon } from 'react-native-elements';
import { useColor } from './Themed';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

const Loading = () => {
  const spinValue = new Animated.Value(0);

  // First set up animation
  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();

  // Next, interpolate beginning and end values (in this case 0 and 1)
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={{ ...styles.animated, transform: [{ rotate: spin }] }}>
      <Icon iconStyle={styles.loading} name="sync-circle" type="ionicon" color={useColor('text')} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  loading: {
    fontSize: 50,
  },
  animated: {
    marginTop: 30,
  },
});

export default Loading;
