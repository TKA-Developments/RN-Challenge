import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { View } from '../components/Themed';
import TextButton from '../components/TextButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { RouteProp, Theme, useTheme } from '@react-navigation/native';
import { getToDo, ToDoSingle } from '../action/ToDos';

const styles = (theme: Theme) => StyleSheet.create({
  titleStyle: {
    // flex: 1,
    fontSize: 18,
    color: theme.colors.text,
    alignItems: 'stretch',
    // backgroundColor: 'white',
  },
  descriptionStyle: {
    color: theme.colors.text,
    alignItems: 'stretch',
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
    padding: 10,
  },
  touchOtherStyle: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  addButtonStyle: {
    alignItems: 'flex-end',
  },
  addButtonTextStyle: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
});

const editButtonPress = (
  navigation: StackNavigationProp<RootStackParamList, 'EditToDoScreen'>,
  title: string,
  description: string,
) => {
  editToDo(title, description);
  navigation.goBack();
};

export default ({
  route,
  navigation
}:
  {
    route: RouteProp<RootStackParamList, 'EditToDoScreen'>,
    navigation: StackNavigationProp<RootStackParamList, 'EditToDoScreen'>
  }) => {
  const theme = useTheme();
  const themedStyle = styles(theme);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const { key } = route.params;
    // TODO
    // Handle error
    getToDo(key)
      .then((snapshot) => {
        const toDo: ToDoSingle = snapshot.val();
        setTitle(toDo.title);
        setIsCompleted(toDo.isCompleted);
        setDescription(toDo.description);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <View style={themedStyle.fullScreenContainerStyle}>
      <TextInput
        style={themedStyle.titleStyle}
        placeholder="Title"
        placeholderTextColor={theme.colors.text}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={themedStyle.descriptionStyle}
        placeholder="Description"
        placeholderTextColor={theme.colors.text}
        value={description}
        multiline={true}
        onChangeText={setDescription}
      />
      <View
        style={{
          flexDirection: 'column',
        }}
      >
        <TextButton
          onPress={() => editButtonPress(navigation, title, description)}
          textStyle={themedStyle.addButtonTextStyle}
          touchableStyle={themedStyle.addButtonStyle}>
          Update
        </TextButton>
      </View>
    </View>
  );
};
