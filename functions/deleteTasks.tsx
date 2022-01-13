import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function deleteTasks(deleteddata:any){
    try{
        const data = await AsyncStorage.getItem("tasks")
        let newarray
        let editindex
        if(data){
            newarray = JSON.parse(data)
        }else{
            newarray = []
        }
        editindex = newarray.find((item:any)=>item.id===deleteddata.id)
        editindex = newarray.indexOf(editindex)
        if(editindex>=0){
            newarray.splice(editindex,1)
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