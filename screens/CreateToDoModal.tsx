import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Theme, useTheme } from '@react-navigation/native';
import { View } from '../components/Themed';
import TextButton from '../components/TextButton';
import { RootStackParamList } from '../types';
import { addToDo } from '../action/ToDos';

const styles = (theme: Theme) => StyleSheet.create({
  titleStyle: {
    // flex: 1,
    fontSize: 18,
    color: theme.colors.text,
    alignItems: 'stretch',
    margin: 10,
    // backgroundColor: 'white',
  },
  descriptionStyle: {
    color: theme.colors.text,
    alignItems: 'stretch',
    margin: 10,
  },
  modalContainerStyle: {
    position: 'absolute',
    alignItems: 'stretch',
    bottom: 0,
    left: 0,
    right: 0,
    borderWidth: 1,
    borderColor: theme.colors.border,
    // backgroundColor: theme.colors.background,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  fullScreenContainerStyle: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  touchOtherStyle: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  addButtonStyle: {
    margin: 10,
  },
  addButtonTextStyle: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
});

const addButtonPress = (
  navigation: StackNavigationProp<RootStackParamList, 'CreateToDoModal'>,
  title: string,
  description: string,
) => {
  addToDo(title, description);
  navigation.goBack();
};

export default ({ navigation }:
  { navigation: StackNavigationProp<RootStackParamList, 'CreateToDoModal'> }) => {
  const theme = useTheme();
  const themedStyle = styles(theme);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <View style={themedStyle.fullScreenContainerStyle}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={themedStyle.touchOtherStyle}/>
      <View style={themedStyle.modalContainerStyle}>
        <TextInput
          style={themedStyle.titleStyle}
          placeholder="Title"
          placeholderTextColor={theme.colors.text}
          value={title}
          onChangeText={setTitle}
          autoFocus
        />
        <TextInput
          style={themedStyle.descriptionStyle}
          placeholder="Description"
          placeholderTextColor={theme.colors.text}
          value={description}
          multiline
          onChangeText={setDescription}
        />
        <View>
          <TextButton
            onPress={() => addButtonPress(navigation, title, description)}
            textStyle={themedStyle.addButtonTextStyle}
            touchableStyle={themedStyle.addButtonStyle}
          >
            Add
          </TextButton>
        </View>
      </View>
    </View>
  );
};
