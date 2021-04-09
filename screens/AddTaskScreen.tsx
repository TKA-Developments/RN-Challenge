import React, { useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { getGradientColor } from '../components/Themed';
import { TextExtraBold } from '../components/StyledText';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon, Input } from 'react-native-elements';
import { useColor } from '../components/Themed';
import { RadioButton } from 'react-native-paper';
import TaskButton from '../components/TaskButton';

const AddTaskScreen = ({ navigation }: StackScreenProps<RootStackParamList, 'AddTask'>) => {
  const [value, setValue] = React.useState('first');

  return (
    <LinearGradient style={styles.container} colors={getGradientColor()}>
      <TextExtraBold style={styles.titleText}>Add a Task</TextExtraBold>
      <Input
        placeholder="Title"
        leftIcon={{ type: 'ionicon', name: 'newspaper-outline', color: useColor('text') }}
        inputStyle={{ ...styles.input, color: useColor('text') }}
      />
      <TextExtraBold style={styles.titleText}>Select Category</TextExtraBold>
      <RadioButton.Group onValueChange={(value) => setValue(value)} value={value}>
        <View style={{ marginBottom: 10 }}></View>
        <RadioButton.Item
          labelStyle={{ ...styles.label, color: useColor('textTertiary') }}
          style={{ ...styles.radioContainer, backgroundColor: useColor('background') }}
          label="Regular"
          value="regular"
          color="red"
        />
        <View style={{ marginBottom: 10 }}></View>
        <RadioButton.Item
          labelStyle={{ ...styles.label, color: useColor('textTertiary') }}
          style={{ ...styles.radioContainer, backgroundColor: useColor('background') }}
          label="Hobby"
          value="hobby"
        />
        <View style={{ marginBottom: 10 }}></View>
        <RadioButton.Item
          labelStyle={{ ...styles.label, color: useColor('textTertiary') }}
          style={{ ...styles.radioContainer, backgroundColor: useColor('background') }}
          label="School"
          value="school"
        />
      </RadioButton.Group>
      <TextExtraBold style={styles.dateText}>Select Date</TextExtraBold>
      {/* Date Picker */}
      <TaskButton positionBottom={30} positionRight={30} iconName="add-outline" />
      <TaskButton positionBottom={100} positionRight={30} iconName="add-outline" />
      <TaskButton positionBottom={170} positionRight={30} iconName="add-outline" />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 35,
    paddingBottom: 20,
    height: '100%',
  },
  radioContainer: {
    opacity: 0.8,
  },
  input: {
    fontFamily: 'nunito',
  },
  label: {
    fontFamily: 'nunito',
    fontSize: 20,
  },
  titleText: {
    fontSize: 25,
  },
  dateText: {
    fontSize: 25,
    marginTop: 20,
  },
  checkIcon: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  checkIconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
});

export default AddTaskScreen;
