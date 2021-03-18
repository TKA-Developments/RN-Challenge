import { StyleSheet, View } from 'react-native';
import React from 'react';
import { GameEngine } from 'react-native-game-engine';
import Entities from '../components/game/entities';
import Physics from '../components/game/systems/Physics';
import Ground from '../components/game/systems/Ground';
import Player from '../components/game/systems/Player';

const styles = StyleSheet.create({
  containerStyle: {
    // justifyContent: 'center',
    // alignItems: 'center',
    flex: 1,
    // backgroundColor: 'black',
  },
  gameContainerStyle: {
    // justifyContent: 'center',
    // alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default () => (
  <View style={styles.containerStyle}>
    <GameEngine
      style={styles.gameContainerStyle}
      running
      entities={Entities()}
      systems={[Physics, Ground, Player]}
    />
  </View>
);
