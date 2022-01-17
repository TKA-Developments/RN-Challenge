import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from '../firebase';

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
            if(auth.currentUser){
                try{
                    let newdata = await db.collection("users").doc(auth.currentUser.uid)
                    .collection("tasks").where("id","==",deleteddata.id).get()
                    newdata.forEach((item)=>{
                        db.collection("users").doc(auth.currentUser?.uid)
                        .collection("tasks").doc(item.id).delete()
                        .then(()=>{
                            console.log("success")
                        }).catch(e=>{
                            throw(e)
                        })
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
                        type: "delete",
                        item: deleteddata
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