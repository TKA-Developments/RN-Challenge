import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { CheckBox } from 'react-native-elements';
import {  Ionicons } from '@expo/vector-icons';
export default ({ text, done, onToggleCheck, onDeleteTask } :any) =>
  <View style={styles.container}>
    <CheckBox
      checked={done}
      onPress={onToggleCheck}
      containerStyle={styles.checkBox}
    />
    <Text style={styles.text}>{text}</Text>
    <TouchableHighlight style={styles.icon} onPress={onDeleteTask}>
      <ToDoIcon name="trash-outline" color='black' />
    </TouchableHighlight>
  </View>

// https://icons.expo.fyi/
function ToDoIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
    return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
  }
  
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 5,
    marginTop: 10,
    marginHorizontal: 10,
  },
  checkBox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  text: {
    flexGrow: 1,
  },
  icon: {
    marginRight: 5,
  }
});