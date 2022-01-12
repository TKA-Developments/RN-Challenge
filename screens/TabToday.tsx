import {  StyleSheet } from 'react-native';
import tailwind from 'tailwind-rn';
import TaskList from '../components/TaskList';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function TabToday({ navigation }: RootTabScreenProps<'TabToday'>) {

  return (
    <View style={styles.container}>
      <View style={tailwind("p-5")}>
        <Text style={tailwind("text-3xl")}>Halo, Nadhim</Text>
        <View>
          <Text>Progress</Text>
          <View style={tailwind("w-full h-4 rounded-full relative mt-1 overflow-hidden")}>
            <View style={{width: "60%",...tailwind("absolute top-0 left-0 bg-green-400 h-full")}} />
          </View>
        </View>
      </View>
      <View style={tailwind("flex-1 px-5")}>
        <Text>Tasks</Text>
        <TaskList />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
