import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ITimeCategory } from './type';
import { TextExtraBold } from '../StyledText';
import Task from './Task';

const TimeCategory: React.FC<ITimeCategory> = (props: ITimeCategory) => {
  return (
    <View>
      <TextExtraBold style={styles.title}>{props.title}</TextExtraBold>
      {props.tasks.map((item, index) => {
        return <Task key={index} {...item} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 5,
    marginBottom: 5,
  },
});

export default TimeCategory;
