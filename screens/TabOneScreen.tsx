import * as React from 'react';
import { StyleSheet, FlatList, TouchableHighlight , KeyboardAvoidingView, Text } from 'react-native';
import { View } from '../components/Themed';
import { Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import uuid from 'react-native-uuid';
import DropDownPicker from 'react-native-dropdown-picker';
import ToDo from './ToDo';
export interface ActiveScreenProps {

}

export interface ActiveScreenState{
  todos: Array<{ key: string, done: boolean, text: string; }>,
  textInput: string,
  status: string,
}
export default class ActiveScreen extends React.Component<ActiveScreenProps, ActiveScreenState>{
  constructor(props:ActiveScreenProps) {
    super(props);
    this.state = {
      todos: [],
      textInput: '',
      status: 'all',
    };
  }
  submitTodo = () => {
    this.setState(({todos, textInput}) => ({
      todos: [...todos, { key: uuid.v4(), done: false, text: textInput }],
      textInput: '',
    }))
  }
  toggleCheck = (key: string) => {
    this.setState(({todos}) => ({
      todos: todos.map(todo => {
        if (todo.key === key) {
          todo.done = !todo.done;
        }
        return todo;
      }),
    }));
  }
  deleteTask = (key: string) => {
    this.setState(({todos}) => ({
      todos: todos.filter(todo => todo.key !== key),
    }));
  } 
  render(){
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.container}
        >
          <DropDownPicker
            items={[
              {label: 'All Task', value: 'all'},
              {label: 'Completed', value: 'completed'},
              {label: 'Not Completed', value: 'notcompleted'},
            ]}
            defaultValue={this.state.status}
            containerStyle={{height: 40}}
            style={{backgroundColor: '#fafafa'}}
            itemStyle={{
              justifyContent: 'flex-start'
             }}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            onChangeItem={(item) => this.setState({
              status: item.value
            })}
          />
          <FlatList
            data={this.state.todos}
            renderItem={({item}) => 
            <ToDo 
              text={item.text}
              done={item.done} 
              onToggleCheck={() => this.toggleCheck(item.key)}
              onDeleteTask={() => this.deleteTask(item.key)}
            />
          }
          />
          <View style={styles.textBox}>
          <Input
              placeholder='Add task!'
              value={this.state.textInput}
              onChangeText={(value:string) => this.setState({textInput:value})}
              onSubmitEditing={this.submitTodo}
              rightIcon={
                <TouchableHighlight
                  activeOpacity={1}
                  underlayColor="#DDDDDD" 
                  onPress={this.submitTodo}
                >
                  <TabBarIcon
                    name='ios-add'
                    color='black'
                  />
                </TouchableHighlight>
              }
              />
          </View>
         </KeyboardAvoidingView>
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
