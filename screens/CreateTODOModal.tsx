import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import TextButton from '../components/TextButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { DiscoverParamList } from '../types';
import { Theme, useTheme } from '@react-navigation/native';
import Firebase from 'firebase';

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
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  fullScreenContainerStyle: {
    flex: 1,
  },
  touchOtherStyle: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  addButtonStyle: {
    margin: 10,
  },
  addButtonTextStyle: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
});

const addTODOToDatabase = (title: string, description: string) => {
  const user = Firebase.auth().currentUser;

  if (user !== null) {
    Firebase.database()
      .ref(`users/${user.uid}/todos`)
      .push({
        title,
        description,
      });
  }
};

export default ({ navigation }:
  { navigation: StackNavigationProp<DiscoverParamList, 'DiscoverScreen'> }) => {
  const theme = useTheme();
  const themedStyle = styles(theme);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const titleTextInputRef = useRef<null | TouchableOpacity>(null);

  useEffect(() => {
    titleTextInputRef.current?.focus();
  }, []);

  return (
    <View style={themedStyle.fullScreenContainerStyle}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={themedStyle.touchOtherStyle}>
      </TouchableOpacity>
      <View style={themedStyle.modalContainerStyle}>
        <TextInput
          ref={titleTextInputRef}
          style={themedStyle.titleStyle}
          placeholder="Title"
          placeholderTextColor="#000"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={themedStyle.descriptionStyle}
          placeholder="Description"
          placeholderTextColor="#000"
          value={description}
          onChangeText={setDescription}
        />
        <View>
          <TextButton
            onPress={() => addTODOToDatabase(title, description)}
            textStyle={themedStyle.addButtonTextStyle}
            touchableStyle={themedStyle.addButtonStyle}>
            Add
          </TextButton>
        </View>
      </View>
    </View>
  );
};
