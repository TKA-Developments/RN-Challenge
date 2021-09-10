import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { Text, View } from '../components/Themed';

export default function AddInput({containerStyle, handleAddTask}) {
  const [input, setInput] = useState('');

  return (
    <View style={containerStyle}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTask}
      >
        <TextInput
          style={styles.input}
          placeholder='Write a task'
          value={input}
          onChangeText={(newInput) => setInput(newInput)}
        />
        <TouchableOpacity
          onPress={() => {
            setInput(handleAddTask(input))
            setInput(null)
          }}
        >
          <View style={styles.addTask}>
            <AntDesign
              name='plus'
              style={{ fontSize: 20 }}
            />
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );

};

const styles = StyleSheet.create({
  writeTask: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    width: 250,
    marginVertical: -20,
    marginHorizontal: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
    borderRadius: 60,
    borderColor: '#c0c0c0',
    borderWidth: 1,
  },
  addTask: {
    width: 60,
    height: 60,
    backgroundColor: '#ffffff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#c0c0c0',
    borderWidth: 1,
  },

});
