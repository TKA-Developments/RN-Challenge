import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import React, { useContext } from 'react';
import { Alert, Share, StyleSheet, TouchableOpacity, } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ThemedColors, View } from './Themed';
import { MainStackParamList } from '../types';
import { deleteToDo, publishToDo } from '../action/ToDos';
import Backend from '../constants/Backend';
import { currentUser } from '../action/Auth';
import { ThemeContext } from '../context/ThemeContext';
import AlertError from '../utils/AlertError';

const styles = (colors: ThemedColors) => StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'transparent',
  },
  touchableStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    // borderWidth: 1,
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
  const { colors } = useContext(ThemeContext);
  const themedStyles = styles(colors);

  const navigation = useNavigation<StackNavigationProp<MainStackParamList, 'EditToDoScreen'>>();
  const route = useRoute<RouteProp<MainStackParamList, 'EditToDoScreen'>>();
  const { id } = route.params;

  const onPressButton = () => {
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
            deleteToDo(id)
              .then((_) => {
                navigation.goBack();
              })
              .catch((reason) => {
                AlertError('delete To Do', reason);
              });
          },
        },
      ],
    );
  };

  return (
    <View style={themedStyles.containerStyle}>
      <TouchableOpacity
        style={themedStyles.touchableStyle}
        onPress={onPressButton}
      >
        <FontAwesome5 name="trash" size={25} style={themedStyles.iconStyle}/>
      </TouchableOpacity>
      <TouchableOpacity
        style={themedStyles.touchableStyle}
        onPress={() => {
          publishToDo(true, id);
          Share.share({
            message: `${Backend.url}${currentUser()?.uid}/${id}`,
          });
        }}
      >
        <Entypo name="share" size={25} style={themedStyles.iconStyle}/>
      </TouchableOpacity>
    </View>
  );
};
