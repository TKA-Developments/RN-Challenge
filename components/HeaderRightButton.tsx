import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { Alert, Share, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedColors, useThemeColors, View } from './Themed';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { deleteToDo } from '../action/ToDos';
import Backend from '../constants/Backend';
import { currentUser } from '../action/Auth';

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

const styles = (colors: ThemedColors) => StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    flex: 1,
  },
  touchableStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderWidth: 1,
  },
  iconStyle: {
    color: colors.primary,
  },
});

export default ({
  lightColor,
  darkColor,
}:
  {
    lightColor?: string,
    darkColor?: string,
  }) => {
  const colors = useThemeColors();
  const themedStyle = styles(colors);
  const route = useRoute<RouteProp<RootStackParamList, 'EditToDoScreen'>>();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'EditToDoScreen'>>();

  return (
    <View style={themedStyle.containerStyle}>
      <TouchableOpacity
        style={themedStyle.touchableStyle}
        onPress={() => onPressButton(route.params.key, navigation)}
      >
        <FontAwesome5 name="trash" size={25} style={themedStyle.iconStyle}/>
      </TouchableOpacity>
      <TouchableOpacity
        style={themedStyle.touchableStyle}
        onPress={() => Share.share({
          message: `${Backend.url}${currentUser()?.uid}/${route.params.key}`,
        })}
      >
        <Entypo name="share" size={25} style={themedStyle.iconStyle}/>
      </TouchableOpacity>
    </View>
  );
};
