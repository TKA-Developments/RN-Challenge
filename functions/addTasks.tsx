import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from '../firebase';

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
        if(auth.currentUser){
            try{
                let newdata = db.collection("users").doc(auth.currentUser.uid)
                .collection("tasks").doc()
                await newdata.set(newTask)
            }catch(e){
                const syncdata = await AsyncStorage.getItem("syncTasks")
                let newsyncdata
                if(syncdata){
                    newsyncdata = JSON.parse(syncdata)
                }else{
                    newsyncdata = []
                }
                newsyncdata.push({
                    type: "add",
                    item: newTask
                })
                await AsyncStorage.setItem("syncTasks",newsyncdata)
            }
        }


        return true
    }catch{(e:any)=>{
        console.log(e)
        return false
    }}
    return false
}