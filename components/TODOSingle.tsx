import React from 'react';
import RoundedCheckbox from 'react-native-rounded-checkbox';
import { FontAwesome } from '@expo/vector-icons';
import { ToDoSingle as ToDoSingleType } from '../action/ToDos';
import { Text, View } from './Themed';

export default ({
  data,
  onChecked = () => {
  },
  onUnChecked = () => {
  },
  titleStyle,
  checkBoxStyle,
  containerStyle,
  innerContainerStyle
}: {
  data: ToDoSingleType,
  onChecked?: () => void,
  onUnChecked?: () => void,
  titleStyle?: any,
  checkBoxStyle?: any,
  containerStyle?: any,
  innerContainerStyle?: any,
}) => {
  return (
    <View style={containerStyle}>
      <RoundedCheckbox
        onPress={(checked) => checked ? onChecked() : onUnChecked()}
        style={checkBoxStyle}
        isChecked={data.isCompleted}
        component={
          <FontAwesome
            name="check"
            size={30}
          />
        }
      />
      <View style={innerContainerStyle}>
        <Text style={titleStyle}>{data.title}</Text>
        <Text>{data.description.substring(0, 50)}</Text>
      </View>
    </View>
  );
};
