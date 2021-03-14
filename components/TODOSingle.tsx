import React from 'react';
import { Text, View } from 'react-native';
import RoundedCheckbox from 'react-native-rounded-checkbox';
import { FontAwesome } from '@expo/vector-icons';

export type ToDoSingleData = { id: string, title: string, description: string };

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
  data: ToDoSingleData,
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
