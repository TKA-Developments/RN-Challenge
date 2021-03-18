import React, { useContext, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TextInput, ThemedColors, View } from '../components/Themed';
import TextButton from '../components/TextButton';
import { MainStackParamList } from '../types';
import { addToDo } from '../action/ToDos';
import { ThemeContext } from '../context/ThemeContext';

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
    // position: 'absolute',
    // alignItems: 'stretch',
    // bottom: 0,
    // left: 0,
    // right: 0,
    flex: 1,
    // borderWidth: 1,
    backgroundColor: 'transparent',
    // borderColor: 'transparent',
  },
  containerModalStyle: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  touchOtherStyle: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  bottomSectionStyle: {
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // right: 0,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // borderWidth: 1,
    alignItems: 'center',
  },
  addButtonStyle: {
    // justifyContent: 'flex-end',
    // alignItems: 'flex-end',
    // borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  editButtonTextStyle: {
    fontWeight: 'bold',
  },
});

export default ({ navigation }:
  { navigation: StackNavigationProp<MainStackParamList, 'CreateToDoModal'> }) => {
  const { colors } = useContext(ThemeContext);
  const themedStyle = styles(colors);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const addButtonPress = () => {
    addToDo(title, description);
    navigation.goBack();
  };

  return (
    <View style={themedStyle.containerStyle}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={themedStyle.touchOtherStyle}/>
      <View style={themedStyle.containerModalStyle}>
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
        <View
          style={themedStyle.bottomSectionStyle}
        >
          <TextButton
            onPress={addButtonPress}
            textStyle={themedStyle.editButtonTextStyle}
            touchableStyle={themedStyle.addButtonStyle}
          >
            Add
          </TextButton>
        </View>
      </View>
    </View>
  );
};
