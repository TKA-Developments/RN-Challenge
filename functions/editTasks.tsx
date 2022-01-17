import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from '../firebase';

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
            if(auth.currentUser){
                try{
                    let newfirebase = await db.collection("users").doc(auth.currentUser.uid)
                    .collection("tasks").where("id","==",databefore.id).get()
                    newfirebase.forEach(async(item)=>{
                        // console.log(newdata)
                        await db.collection("users").doc(auth.currentUser?.uid)
                        .collection("tasks").doc(item.id).set(newdata)
                    })
                }catch(e){
                    const syncdata = await AsyncStorage.getItem("syncTasks")
                    let newsyncdata
                    if(syncdata){
                        newsyncdata = JSON.parse(syncdata)
                    }else{
                        newsyncdata = []
                    }
                    newsyncdata.push({
                        type: "edit",
                        item: newdata
                    })
                    await AsyncStorage.setItem("syncTasks",newsyncdata)
                }
            }
            return true
        }
        return false
    }catch{(e:any)=>{
        console.log(e)
        return false
    }}
    return false
}