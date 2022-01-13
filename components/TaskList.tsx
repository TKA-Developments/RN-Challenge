import { FontAwesome } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { FlatList, Pressable, TouchableOpacity } from "react-native";
import tailwind from "tailwind-rn";
import getTasks from "../functions/getTasks";
import toogleTaskStatus from "../functions/toogleTaskStatus";
import TaskDetailModal from "./TaskDetailModal";
import { View, Text } from "./Themed";

export default function TaskList({update, updateTrigger, date=Date.now()}:any){

    const [modal, setModal] = useState(false)
    const [aktif, setAktif] = useState(null)

    const [data, setData] = useState<any[]>([])

    const [firstFinish, setFirstFinish] = useState(0)

    const changestatus = async (item: any)=>{
        await toogleTaskStatus(item)
        updateTrigger()
    }

    useEffect(() => {
        async function getdata(){
            let newdata = await getTasks()
            let tgl = new Date(date)
            let tglawal = new Date(tgl.getFullYear(),tgl.getMonth(),tgl.getDate())
            let tglakhir = new Date(tgl.getFullYear(),tgl.getMonth(),tgl.getDate()+1)
            setData(newdata.filter((item:any)=>{
                if(item.time>=tglawal && item.time<=tglakhir){
                    return(item)
                }
                return null
            }))
        }
        getdata()
    }, [update,modal,date])

    useEffect(() => {
        let k =data.sort((a, b) => {
            if(b.finish && a.finish){
                return a.time-b.time
            }
            if(b.finish && !a.finish){
                return -1
            }
            if(!b.finish && a.finish){
                return 1
            }
            return a.time-b.time
        })
        let j = k.indexOf(k.find((item)=>item.finish))
        setFirstFinish(j)
    }, [data])

    const itemrender = ({item,index}:any)=>{
        let time = new Date(item.time)
        return(
            <>
                {index===firstFinish&&
                <Text>Finish Tasks</Text>
                }
                <Pressable onPress={()=>{setAktif(item);setModal(true)}} style={tailwind(`my-2 px-4 py-2 rounded-md ${item.finish?"bg-green-200":"bg-blue-200"} flex flex-row`)}>
                    <View lightColor="transparent" style={tailwind("flex flex-1 flex-row bg-transparent")}>
                        <View lightColor="transparent">
                            <Text style={tailwind("text-base font-semibold")}>{item.title}</Text>
                            <Text style={tailwind("text-xs")}>{time.getHours()>9?time.getHours():"0"+time.getHours()}:{time.getMinutes()>9?time.getMinutes():"0"+time.getMinutes()}</Text>
                        </View>
                    </View>
                    <View lightColor="transparent" style={tailwind("flex flex-row")}>
                        <View lightColor="transparent" style={tailwind("flex justify-center")}>
                            <TouchableOpacity onPress={()=>changestatus(item)} style={tailwind("bg-green-200 p-2 rounded-full")}>
                                <FontAwesome name="check" color={"green"} size={16} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Pressable>
            </>
        )
    }

    return(
        <>
            {
                data.find(item=>!item.finish)&&
                <Text>On Going Tasks</Text>
            }
            <TaskDetailModal visible={modal} detaildata={aktif} closeFunc={()=>setModal(false)} />
            {
                data.length>0?
                <FlatList
                    style={tailwind("flex-1 pb-4")}
                    data={data.sort((a, b) => {
                            if(b.finish && a.finish){
                                return a.time-b.time
                            }
                            if(b.finish && !a.finish){
                                return -1
                            }
                            if(!b.finish && a.finish){
                                return 1
                            }
                            return a.time-b.time
                        })}
                    renderItem={itemrender}
                    keyExtractor={(item,index)=>String(index)}
                />
                :
                <View style={tailwind("flex-1 pt-4")}>
                    <View style={tailwind("w-full items-center justify-center py-7 rounded-lg bg-green-200")}>
                        <Text style={tailwind("text-lg")}>No Task Found</Text>
                    </View>
                </View>
            }
        </>
    )
}