import { ITask } from './type';
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextSemiBold, TextLight } from '../../components/StyledText';
import { useColor } from '../../components/Themed';
import { getCategoryColor } from './TaskColor';
import { CheckBox } from 'react-native-elements';
import useTasksContext from '../../hooks/useTasksContext';
import { useNavigation } from '@react-navigation/native';

const Task: React.FC<ITask> = (props: ITask) => {
  const { updateTask, setIsEditing } = useTasksContext();
  const navigation = useNavigation();

  const changeStatus = (task: ITask) => {
    const newTask = { ...task };
    newTask.done = !task.done;
    updateTask(newTask);
  };

  const editing = () => {
    setIsEditing(true);
    navigation.navigate('AddTask', { ...props });
  };

  return (
    <TouchableOpacity onPress={() => changeStatus(props)} onLongPress={() => editing()}>
      <View style={{ ...styles.container, backgroundColor: useColor('backgroundTertiary') }}>
        <View style={{ ...styles.category, backgroundColor: getCategoryColor(props.category) }}>
          <CheckBox
            center
            iconType="ionicon"
            checkedIcon="checkbox"
            uncheckedIcon="square-outline"
            checkedColor={useColor('textTertiary')}
            uncheckedColor={useColor('textTertiary')}
            checked={props.done}
            onPress={() => changeStatus(props)}
          />
        </View>
        <View style={styles.textContainer}>
          <TextSemiBold style={props.done ? [styles.done, styles.text] : styles.text}>
            {props.name}
          </TextSemiBold>
          <TextLight
            style={
              props.done
                ? { color: useColor('textSecondary'), ...styles.done }
                : { color: useColor('textSecondary') }
            }
          >
            {props.date.format('DD MMM YYYY')}
          </TextLight>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
  },
  done: {
    textDecorationLine: 'line-through',
  },
  textContainer: {
    padding: 15,
    paddingLeft: 10,
    fontSize: 18,
  },
  category: {
    marginLeft: 7,
    borderColor: 'black',
    opacity: 0.7,
    color: 'green',
    width: 40,
    height: '80%',
    borderRadius: 5,
  },
});

export default Task;
