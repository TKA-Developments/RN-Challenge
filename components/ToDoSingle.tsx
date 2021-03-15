import React from 'react';
import RoundedCheckbox from 'react-native-rounded-checkbox';
import { FontAwesome } from '@expo/vector-icons';
import { ToDoSingleWithKey } from '../action/ToDos';
import { Text, View } from './Themed';
import { TouchableOpacity } from 'react-native';

export default ({
  data,
  onCheck,
  onPress,
  titleStyle,
  checkBoxStyle,
  containerStyle,
  innerContainerStyle
}: {
  data: ToDoSingleWithKey,
  onCheck: (isChecked: boolean, key: string) => void,
  onPress: (data: ToDoSingleWithKey) => void,
  titleStyle?: any,
  checkBoxStyle?: any,
  containerStyle?: any,
  innerContainerStyle?: any,
}) => {
  return (
    <TouchableOpacity style={containerStyle} onPress={() => onPress(data)}>
      <RoundedCheckbox
        onPress={(isChecked) => onCheck(isChecked, data.key)}
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
    </TouchableOpacity>
  );
};
