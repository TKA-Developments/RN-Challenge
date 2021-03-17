import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import TextButton from '../components/TextButton';
import { Spinner, ThemedColors, View } from '../components/Themed';
import { RootStackParamList } from '../types';
import { editToDo, getToDo, markToDoAs, ToDoSingle, } from '../action/ToDos';
import RoundedCheckbox from '../components/RoundedCheckBox';
import { ThemeContext } from '../context/ThemeContext';

const styles = (color: ThemedColors) => StyleSheet.create({
  titleStyle: {
    // flex: 1,
    fontSize: 22,
    alignItems: 'stretch',
    marginBottom: 5,
    color: color.text,
    // backgroundColor: 'white',
    marginHorizontal: 10,
    paddingHorizontal: 10,
    // borderWidth: 1,
    // backgroundColor: color.textInput,
  },
  bottomSectionStyle: {
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // right: 0,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    alignItems: 'center',
  },
  descriptionStyle: {
    alignItems: 'flex-start',
    // borderWidth: 1,
    color: color.text,
    // backgroundColor: color.textInput,
    fontSize: 17,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
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

const onCheck = (isChecked: boolean, key: string) => {
  markToDoAs(isChecked, key);
};

export default ({
  route,
  navigation,
}:
  {
    route: RouteProp<RootStackParamList, 'EditToDoScreen'>,
    navigation: StackNavigationProp<RootStackParamList, 'EditToDoScreen'>
  }) => {
  const { colors } = useContext(ThemeContext);
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
        isLoading
          ? <Spinner/>
          : (
            <>
              <TextInput
                style={themedStyle.titleStyle}
                placeholder="Title"
                placeholderTextColor={colors.secondary}
                value={title}
                onChangeText={setTitle}
              />
              <TextInput
                style={themedStyle.descriptionStyle}
                placeholder="Description"
                placeholderTextColor={colors.secondary}
                multiline
                value={description}
                onChangeText={setDescription}
              />
              <View
                style={themedStyle.bottomSectionStyle}
              >
                <View>
                  <RoundedCheckbox
                    onPress={(isChecked) => onCheck(isChecked, key)}
                    // style={checkBoxStyle}
                    isChecked={isCompleted}
                  />
                </View>
                <TextButton
                  onPress={() => editButtonPress(navigation, title, description, key)}
                  textStyle={themedStyle.addButtonTextStyle}
                  touchableStyle={themedStyle.addButtonStyle}
                >
                  Update
                </TextButton>
              </View>
            </>
          )
      }
    </View>
  );
};
