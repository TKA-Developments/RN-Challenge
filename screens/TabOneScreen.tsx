import * as React from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import { Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import uuid from 'react-native-uuid';

export interface ActiveScreenProps {

}

export interface ActiveScreenState{
  todos: Array<{ key: string, done: boolean, text: string; }>,
}
export default class ActiveScreen extends React.Component<ActiveScreenProps, ActiveScreenState>{
  constructor(props:ActiveScreenProps) {
    super(props);
    this.state = {
      todos: [
        { key: uuid.v4(), done: true, text: 'Host this workshop' },
        { key: uuid.v4(), done: false, text: 'Do something else' },
      ],
    };
  }
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.textBox}>
        <Input
            placeholder='Add task!'
            rightIcon={
              <TabBarIcon
                name='ios-add'
                color='black'
              />
            }
            />
            </View>
        </View>
    );
  }
}
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textBox: {
    flexDirection: 'row',
  },
  textInput: {
    flexGrow: 1,
  },
});
