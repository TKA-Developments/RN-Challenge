import React from 'react';
import { TouchableOpacity } from 'react-native';
import RoundedCheckbox from './RoundedCheckBox';
import { Text, View } from './Themed';
import { ToDoSingleWithID } from '../action/ToDos';

export default ({
  data,
  onCheck,
  onPress,
  titleStyle,
  containerStyle,
  innerContainerStyle,
}: {
  data: ToDoSingleWithID,
  onCheck: (isChecked: boolean, id: string) => void,
  onPress: (data: ToDoSingleWithID) => void,
  titleStyle?: any,
  containerStyle?: any,
  innerContainerStyle?: any,
}) => (
  <TouchableOpacity style={containerStyle} onPress={() => onPress(data)}>
    <RoundedCheckbox
      onPress={(isChecked) => onCheck(isChecked, data.id)}
      isChecked={data.isCompleted}
    />
    <View style={innerContainerStyle}>
      <Text style={titleStyle}>{data.title}</Text>
      {data.description || data.description.trim() !== ''
        ? (
          <Text>
            {data.description.substring(0, 20)
              .replace('\n', '')}
            {data.description.length > 20 ? '...' : null}
          </Text>
        ) : null}
    </View>
  </TouchableOpacity>
);
