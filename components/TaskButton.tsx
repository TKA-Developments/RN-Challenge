import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { useColor } from './Themed';
import { StyleSheet } from 'react-native';

interface ITaskButton {
  positionBottom: number;
  positionRight: number;
  iconName: string;
}

const TaskButton = (props: ITaskButton) => {
  return (
    <TouchableOpacity
      style={{ ...styles.checkButton, bottom: props.positionBottom, right: props.positionRight }}
    >
      <View
        style={{
          ...styles.checkIconWrapper,
          backgroundColor: useColor('backgroundSecondary'),
        }}
      >
        <Icon
          iconStyle={styles.checkIcon}
          name={props.iconName}
          type="ionicon"
          color={useColor('text')}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkIcon: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  checkIconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkButton: {
    position: 'absolute',
  },
});

export default TaskButton;
