import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useThemeColor } from './Themed';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { deleteToDo } from '../action/ToDos';

const styles = StyleSheet.create({
  touchableStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    flex: 1,
    borderWidth: 1,
  },
});

const onPressButton = (
  key: string,
  navigation: StackNavigationProp<RootStackParamList, 'EditToDoScreen'>
) => {
  Alert.alert(
    'Delete confirmation',
    'Are you sure you want to delete this to do?',
    [
      {
        text: 'Cancel',
        onPress: () => {
        },
        style: 'cancel',
      },
      {
        text: 'Yes',
        // Proceed delete
        onPress: () => {
          deleteToDo(key)
            .then(_ => {
              navigation.goBack();
            })
            .catch((e) => {
              console.log('Error', e);
            });
        },
      }
    ]
  );
};

export default ({
  lightColor,
  darkColor,
}:
  {
    lightColor?: string,
    darkColor?: string,
  }) => {
  const color = useThemeColor({
    light: lightColor,
    dark: darkColor,
  }, 'primary');
  const route = useRoute<RouteProp<RootStackParamList, 'EditToDoScreen'>>();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'EditToDoScreen'>>();

  return (
    <TouchableOpacity
      style={styles.touchableStyle}
      onPress={() => onPressButton(route.params.key, navigation)}
    >
      <FontAwesome5 name="trash" size={25} style={[{ color }]}/>
    </TouchableOpacity>
  );
};
