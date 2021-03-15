import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TextInput, ThemedColors, useThemeColors, View } from '../components/Themed';
import TextButton from '../components/TextButton';
import { RootStackParamList } from '../types';
import { addToDo } from '../action/ToDos';

const styles = (colors: ThemedColors) => StyleSheet.create({
  titleStyle: {
    // flex: 1,
    fontSize: 18,
    alignItems: 'stretch',
    margin: 10,
    // backgroundColor: 'white',
  },
  descriptionStyle: {
    alignItems: 'stretch',
    margin: 10,
  },
  containerStyle: {
    position: 'absolute',
    alignItems: 'stretch',
    bottom: 0,
    left: 0,
    right: 0,
    borderWidth: 1,
    borderColor: 'black',
    // backgroundColor: theme.colors.background,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  containerStyle: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  touchOtherStyle: {
    flex: 1,
  },
  addButtonStyle: {
    margin: 10,
  },
  addButtonTextStyle: {
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
  const colors = useThemeColors();
  const themedStyle = styles(colors);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <View style={themedStyle.containerStyle}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={themedStyle.touchOtherStyle}/>
      <View style={themedStyle.containerStyle}>
        <TextInput
          style={themedStyle.titleStyle}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          autoFocus
        />
        <TextInput
          style={themedStyle.descriptionStyle}
          placeholder="Description"
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
