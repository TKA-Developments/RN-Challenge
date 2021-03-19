import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Switch, TextInput } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import TextButton from '../components/TextButton';
import { Spinner, Text, ThemedColors, View, } from '../components/Themed';
import { MainStackParamList } from '../types';
import { editToDo, markToDoAsCompleted, publishToDo, toDoRef, ToDoSingle, } from '../action/ToDos';
import RoundedCheckbox from '../components/RoundedCheckBox';
import { ThemeContext } from '../context/ThemeContext';
import AlertError from '../utils/AlertError';

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
    // borderWidth: 1,
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
  editButtonTextStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  leftSideBottomSectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  publicSwitchLeftSideBottomSectionStyle: {
    paddingLeft: 10,
    // transform: [{
    //   scale: 1.3,
    // }],
  },
  publicTextLeftSideBottomSectionStyle: {
    fontSize: 20,
  },
});

export default ({
  route,
  navigation,
}:
  {
    route: RouteProp<MainStackParamList, 'EditToDoScreen'>,
    navigation: StackNavigationProp<MainStackParamList, 'EditToDoScreen'>
  }) => {
  const { colors } = useContext(ThemeContext);
  const themedStyle = styles(colors);

  const { id } = route.params;

  const [toDo, setToDo] = useState<ToDoSingle | null>(null);

  const onMarkToDoAsCompleted = (checked: boolean) => {
    markToDoAsCompleted(checked, id)
      .catch((reason) => {
        setToDo({
          ...toDo!!,
          isCompleted: !checked,
        });
        AlertError('change To Do completion', reason);
      });
    setToDo({
      ...toDo!!,
      isCompleted: checked,
    });
  };

  const onSwitchPublic = (checked: boolean) => {
    publishToDo(checked, id)
      .catch((reason) => {
        setToDo({
          ...toDo!!,
          isPublished: !checked,
        });
        AlertError('change To Do publicity', reason);
      });
    setToDo({
      ...toDo!!,
      isPublished: checked,
    });
  };

  const editButtonPress = () => {
    editToDo(id, toDo!!.title, toDo!!.description)
      .catch((reason) => {
        AlertError('save the To Do', reason);
      });
    navigation.goBack();
  };

  useEffect(() => {
    const setToDoListener = toDoRef(id)
      .on('value', (snapshot) => {
        setToDo(snapshot.val() as ToDoSingle);
      });
    return () => {
      toDoRef(id)
        .off('value', setToDoListener);
    };
  }, []);

  return (
    <View style={themedStyle.containerStyle}>
      {
        toDo === null
          ? <Spinner size="large"/>
          : (
            <>
              <TextInput
                style={themedStyle.titleStyle}
                placeholder="Title"
                placeholderTextColor={colors.secondary}
                value={toDo.title}
                onChangeText={(title) => setToDo({
                  ...toDo,
                  title,
                })}
              />
              <TextInput
                style={themedStyle.descriptionStyle}
                placeholder="Description"
                placeholderTextColor={colors.secondary}
                multiline
                value={toDo.description}
                onChangeText={(description) => setToDo({
                  ...toDo,
                  description,
                })}
              />
              <View
                style={themedStyle.bottomSectionStyle}
              >
                <View
                  style={themedStyle.leftSideBottomSectionStyle}
                >
                  <RoundedCheckbox
                    onPress={onMarkToDoAsCompleted}
                    // style={checkBoxStyle}
                    isChecked={toDo.isCompleted}
                  />
                  <Switch
                    style={themedStyle.publicSwitchLeftSideBottomSectionStyle}
                    value={toDo.isPublished}
                    onValueChange={onSwitchPublic}
                  />
                  <Text style={themedStyle.publicTextLeftSideBottomSectionStyle}>Public</Text>
                </View>
                <TextButton
                  onPress={editButtonPress}
                  textStyle={themedStyle.editButtonTextStyle}
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
