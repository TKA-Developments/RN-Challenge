import React from 'react';
import { CheckBox as CheckBoxDefault } from 'react-native-elements';
import { useColor } from '../Themed';
import { StyleSheet } from 'react-native';
import { ICheckBox } from './type';

const CheckBox = (props: ICheckBox) => {
  return (
    <CheckBoxDefault
      title={props.title}
      iconType="ionicon"
      checkedIcon="checkbox"
      uncheckedIcon="square-outline"
      checkedColor={props.checkColor ? props.checkColor : useColor('textTertiary')}
      uncheckedColor={props.checkColor ? props.checkColor : useColor('textTertiary')}
      checked={true}
      containerStyle={{
        ...styles.container,
        borderColor: useColor('shadeAbove'),
        backgroundColor: useColor('backgroundTertiary'),
      }}
      textStyle={{ color: useColor('text') }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 3,
    opacity: 0.8,
  },
});

export default CheckBox;
