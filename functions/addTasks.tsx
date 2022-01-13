import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function addTasks(newTask:any){
    try{
        const data = await AsyncStorage.getItem("tasks")
        let newarray
        if(data){
            newarray = JSON.parse(data)
        }else{
            newarray = []
        }
        newarray.push(newTask)
        await AsyncStorage.setItem("tasks",JSON.stringify(newarray))
        return true
    }catch{(e:any)=>{
        console.log(e)
        return false
    }}
    return false
}