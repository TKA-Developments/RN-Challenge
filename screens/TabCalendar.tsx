import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import tailwind from 'tailwind-rn';
import AddTaskModal from '../components/AddTaskModal';
import TaskList from '../components/TaskList';
import { Text, View } from '../components/Themed';
import Months from '../constants/Months';
import { RootTabScreenProps } from '../types';

export default function TabCalendarScreen({navigation,route}: RootTabScreenProps<'TabCalendar'>) {

  const [update, setUpdate] = useState(0)
  const [dates, setDates] = useState<any>([])
  const [active, setActive] = useState(0)
  const month = Months()
  useEffect(() => {
    let arr = []
    let now = Date.now()
    for (let index = 0; index < 20; index++) {
      arr.push(now+(1000*60*60*24*index))
    }
    setDates(arr)
    setActive(now)
    console.log("a")
  }, [])

  const datelistrender = ({item}:any)=>{
    let date = new Date(item)
    return(
      <Pressable onPress={()=>setActive(item)} style={tailwind(`px-3 items-center mx-2 py-1 rounded-md ${active===item?"bg-blue-600":"bg-green-600"}`)}>
        <Text style={tailwind("text-white font-bold")}>{date.getDate()}</Text>
        <Text style={tailwind("text-white font-semibold")}>{month[date.getMonth()].slice(0,3)}</Text>
      </Pressable>
    )
  }

  return (
    <>
      <AddTaskModal defaultdate={active} updateTrigger={()=>setUpdate((e:number)=>e+1)} />
      <View style={styles.container}>
        <View style={tailwind("px-5 py-3")}>
          <Text style={tailwind("font-semibold text-lg")}>{new Date(active).getDate()} {month[new Date(active).getMonth()]} {new Date(active).getFullYear()}</Text>
          <FlatList
            style={tailwind("mt-2")}
            data={dates}
            horizontal={true}
            renderItem={datelistrender}
            keyExtractor={(item:any)=>item}
          />
        </View>
        <View style={tailwind("flex-1 px-5")}>
          <TaskList date={active} updateTrigger={()=>setUpdate((e:number)=>e+1)} update={update} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
