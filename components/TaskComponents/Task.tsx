import { ITask } from './type';
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextSemiBold, TextLight } from '../../components/StyledText';
import { useColor } from '../../components/Themed';
import { getCategoryColor } from './TaskColor';

const Task: React.FC<ITask> = (props: ITask) => {
  return (
    <TouchableOpacity>
      <View style={{ ...styles.container, backgroundColor: useColor('backgroundTertiary') }}>
        <View
          style={{ ...styles.category, backgroundColor: getCategoryColor(props.category) }}
        ></View>
        <View style={styles.textContainer}>
          <TextSemiBold style={styles.text}>{props.name}</TextSemiBold>
          <TextLight style={{ color: useColor('textSecondary') }}>{props.date}</TextLight>
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
