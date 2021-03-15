import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import TextButton from '../components/TextButton';
import { Spinner, ThemedColors, useThemeColors, View } from '../components/Themed';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { RouteProp } from '@react-navigation/native';
import { editToDo, getToDo, ToDoSingle } from '../action/ToDos';
import RoundedCheckbox from 'react-native-rounded-checkbox';
import { FontAwesome } from '@expo/vector-icons';

const styles = (colors: ThemedColors) => StyleSheet.create({
  titleStyle: {
    // flex: 1,
    fontSize: 18,
    alignItems: 'stretch',
    marginHorizontal: 10,
    marginBottom: 10,
    // backgroundColor: 'white',
    borderWidth: 1,
  },
  bottomSectionStyle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    alignItems: 'center',
  },
  descriptionStyle: {
    alignItems: 'stretch',
    margin: 10,
    borderWidth: 1,
    flex: 1,
  },
  containerStyle: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    flex: 1,
  },
  touchOtherStyle: {
    flex: 1,
  },
  addButtonStyle: {
    marginRight: 10,
  },
  addButtonTextStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});

const editButtonPress = (
  navigation: StackNavigationProp<RootStackParamList, 'EditToDoScreen'>,
  title: string,
  description: string,
  key: string,
) => {
  editToDo(key, title, description);
  navigation.goBack();
};

export default ({
  route,
  navigation,
}:
  {
    route: RouteProp<RootStackParamList, 'EditToDoScreen'>,
    navigation: StackNavigationProp<RootStackParamList, 'EditToDoScreen'>
  }) => {
  const colors = useThemeColors();
  const themedStyle = styles(colors);

  const { key } = route.params;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
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
    <View style={themedStyle.containerStyle}>
      {
        isLoading ?
          <Spinner/>
          :
          (
            <>
              <TextInput
                style={themedStyle.titleStyle}
                placeholder="Title"
                placeholderTextColor={colors.text}
                value={title}
                onChangeText={setTitle}
              />
              <TextInput
                style={themedStyle.descriptionStyle}
                placeholder="Description"
                placeholderTextColor={colors.text}
                multiline
                value={description}
                onChangeText={setDescription}
              />
              <View
                style={themedStyle.bottomSectionStyle}
              >
                <View>
                  <RoundedCheckbox
                    // onPress={(isChecked) => onCheck(isChecked, data.key)}
                    // style={checkBoxStyle}
                    isChecked={isCompleted}
                    component={(
                      <FontAwesome
                        name="check"
                      />
                    )}
                  />
                </View>
                <TextButton
                  onPress={() => editButtonPress(navigation, title, description, key)}
                  textStyle={themedStyle.addButtonTextStyle}
                  touchableStyle={themedStyle.addButtonStyle}>
                  Update
                </TextButton>
              </View>
            </>
          )
      }
    </View>
  );
};
