import { MaterialIcons } from '@expo/vector-icons';
import iconSet from '@expo/vector-icons/build/Fontisto';
import { forFadeFromBottomAndroid } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/CardStyleInterpolators';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from './Themed';

const Task= (prop: any) => {
    return (
    <View style={styles.container}>
      <Text style={styles.item}>
          {prop.name}
      </Text>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '70%',
        height: 54,
        padding: 15,
        borderColor: '#204051',
        borderWidth: 2,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    item: {
        fontSize: 16,
        alignItems: 'flex-end',
        marginHorizontal: 10,
        maxWidth: '85%'
    },
  });

  export default Task;