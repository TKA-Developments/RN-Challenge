import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome!
      </Text>
      <Text style={styles.instructionText}>
        Below is the instructions how to use the app:{"\n"}
        1. First, there are two tab in this tab. The tab on the left
          (which has `home` icon) is this welcome screen and the tab on
          the right is a task screen which hold all your task.{"\n\n"}
        2. If you want to add task, view your task list, and any activities
          that require interaction with your task, you can navigate to the
          second tab or the tab on the right.{"\n\n"}
        3. In the task tab, there's an input area which has `Write a task` on it.
          You can use those input area to insert a text about your task. After
          you are done typing, you can press the `+` button on the right side.{"\n\n"}
        4. To complete the task, you can press the middle of the task item.
          There's a `check mark` indicator if the task completed (the task
          text also crossed out).{"\n\n"}
        5. You can delete task by pressing the `trash can` icon on the right side.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  instructionText: {
    margin: 30,
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
});
