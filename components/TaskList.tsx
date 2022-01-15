import { FontAwesome } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { FlatList, Pressable, TextInput, TouchableOpacity } from "react-native";
import tailwind from "tailwind-rn";
import getTasks from "../functions/getTasks";
import toogleTaskStatus from "../functions/toogleTaskStatus";
import TaskDetailModal from "./TaskDetailModal";
import { View, Text } from "./Themed";

export default function TaskList({update, updateTrigger, date}:any){

    const [modal, setModal] = useState(false)
    const [aktif, setAktif] = useState(null)
    const [search, setSearch] = useState("")
    const [data, setData] = useState<any[]>([])

    const [firstFinish, setFirstFinish] = useState(0)

    const changestatus = async (item: any)=>{
        await toogleTaskStatus(item)
        updateTrigger()
    }

    const filterfunc = (item:any)=>{
        if(search===""){
            return item
        }
        if(String(item.title).toLowerCase().includes(search.toLowerCase())){
            return item
        }
        return null
    }

    useEffect(() => {
        async function getdata(){
            let newdata = await getTasks()
            let tgl = date?new Date(date):new Date()
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
        setSearch("")
    }, [update,modal,date])

    useEffect(() => {
        let k =data.filter(filterfunc).sort((a, b) => {
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
    }, [data,search])

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
            <View style={tailwind("relative")}>
                <TextInput
                    value={search}
                    onChangeText={(e:any)=>setSearch(e)}
                    placeholder="Search..."
                    style={tailwind("border rounded-full mb-1 py-1 pr-3 pl-8")}
                />
                <View style={tailwind("absolute top-0 left-0 h-full items-center justify-center bg-transparent px-3 pb-1")}>
                    <FontAwesome name="search" />
                </View>
            </View>
            {
                data.filter(filterfunc).find(item=>!item.finish)&&
                <Text>On Going Tasks</Text>
            }
            <TaskDetailModal visible={modal} detaildata={aktif} closeFunc={()=>setModal(false)} />
            {
                data.filter(filterfunc).length>0?
                <FlatList
                    style={tailwind("flex-1 pb-4")}
                    data={data.filter(filterfunc)
                    .sort((a, b) => {
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