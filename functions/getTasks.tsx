import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function getTasks(){
    try{
        const data = await AsyncStorage.getItem("tasks")
        if(data){
            return JSON.parse(data)
        }
        return([])
    }catch{(e:any)=>{
        return([])
    }}  
    return([]) 
}