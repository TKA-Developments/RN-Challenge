import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function editTasks(databefore:any,newdata:any){
    try{
        const data = await AsyncStorage.getItem("tasks")
        let newarray
        let editindex
        if(data){
            newarray = JSON.parse(data)
        }else{
            newarray = []
        }
        editindex = newarray.find((item:any)=>item.id===databefore.id)
        editindex = newarray.indexOf(editindex)
        if(editindex>=0){
            newarray[editindex] = newdata
            await AsyncStorage.setItem("tasks",JSON.stringify(newarray))
            return true
        }
        return false
    }catch{(e:any)=>{
        console.log(e)
        return false
    }}
    return false
}