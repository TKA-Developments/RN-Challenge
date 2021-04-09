import React, { useEffect, useState } from 'react';
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
import DatePicker from 'react-native-datepicker';
import { getCategoryColor } from '../components/TaskComponents/TaskColor';

const AddTaskScreen = ({ navigation }: StackScreenProps<RootStackParamList, 'AddTask'>) => {
  const [value, setValue] = useState('first');
  const [date, setDate] = useState(new Date());

  const onCrossPress = () => {
    navigation.goBack();
  };

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
          label="General"
          value="general"
          color={getCategoryColor('general')}
          uncheckedColor={getCategoryColor('general')}
        />
        <View style={{ marginBottom: 10 }}></View>
        <RadioButton.Item
          labelStyle={{ ...styles.label, color: useColor('textTertiary') }}
          style={{ ...styles.radioContainer, backgroundColor: useColor('background') }}
          label="Hobby"
          value="hobby"
          color={getCategoryColor('hobby')}
          uncheckedColor={getCategoryColor('hobby')}
        />
        <View style={{ marginBottom: 10 }}></View>
        <RadioButton.Item
          labelStyle={{ ...styles.label, color: useColor('textTertiary') }}
          style={{ ...styles.radioContainer, backgroundColor: useColor('background') }}
          label="School"
          value="school"
          color={getCategoryColor('school')}
          uncheckedColor={getCategoryColor('school')}
        />
      </RadioButton.Group>
      <TextExtraBold style={styles.dateText}>Select Date</TextExtraBold>
      <DatePicker
        showIcon={false}
        style={{ ...styles.datePicker }}
        customStyles={{
          dateText: {
            fontFamily: 'nunito',
            fontSize: 18,
            color: useColor('textTertiary'),
          },
          dateTouchBody: {
            backgroundColor: useColor('background'),
          },
          dateInput: {
            borderWidth: 0,
            opacity: 0.9,
          },
        }}
        date={'26/03/2000'}
        mode="date"
        placeholder="select date"
        format="DD/MM/YYYY"
      />
      <TaskButton
        onPress={onCrossPress}
        positionBottom={30}
        positionRight={30}
        iconName="checkmark-outline"
      />
      <TaskButton
        onPress={onCrossPress}
        positionBottom={30}
        positionRight={100}
        iconName="close-outline"
      />
      <TaskButton
        onPress={onCrossPress}
        positionBottom={30}
        positionRight={170}
        iconName="trash-outline"
      />
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
    opacity: 0.9,
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
    marginBottom: 10,
  },
  datePicker: {
    width: '100%',
  },
});

export default AddTaskScreen;
