import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Modal, Pressable, TextInput, TouchableOpacity } from "react-native";
import tailwind from "tailwind-rn";
import { Text, View } from "./Themed";
import DateTimePicker from '@react-native-community/datetimepicker';
import Months from "../constants/Months";
import RandomString from "../constants/RandomString";
import addTasks from "../functions/addTasks";

export default function AddTaskModal({defaultdate,updateTrigger}:any){

    const [visible, setVisible] = useState(false)
    const [datePicker, setDatePicker] = useState<any>("")
    const month = Months()
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        id: RandomString(5)+Date.now(),
        title: "",
        time: defaultdate?defaultdate:Date.now(),
        finish: false,
        note:"",
        created: Date.now()
    })

    useEffect(() => {
        setData({
            id: RandomString(5)+Date.now(),
            title: "",
            time: defaultdate?defaultdate:Date.now(),
            finish: false,
            note:"",
            created: Date.now()
        })
        updateTrigger()
    }, [visible])

    const addData = async ()=>{
        if(!loading){
            setLoading(true)
            await addTasks(data)
            setLoading(false)
            setVisible(false)
        }
    }

    const closeFunc = ()=>{
        setVisible(false)
    }

    const datechange = (e: any,s: any)=>{
        const currentDate = s || new Date(data?.time);
        let beforeedit = new Date(data.time)
        let editedtime = new Date(currentDate)
        if(datePicker.toLowerCase()==="time"){
            setData((prev:any)=>{
                return({
                    ...prev,
                    time: new Date(
                        beforeedit.getFullYear(),
                        beforeedit.getMonth(),
                        beforeedit.getDate(),
                        editedtime.getHours(),
                        editedtime.getMinutes()
                    ).getTime()
                })
            })
        }else{
            setData((prev:any)=>{
                return({
                    ...prev,
                    time: new Date(
                        editedtime.getFullYear(),
                        editedtime.getMonth(),
                        editedtime.getDate(),
                        beforeedit.getHours(),
                        beforeedit.getMinutes()
                    ).getTime()
                })
            })
        }
        setDatePicker("")
    }

    return(
        <>
            <View>
                {datePicker!=="" && (
                <DateTimePicker
                testID="dateTimePicker"
                value={new Date(data?.time)}
                mode={datePicker}
                is24Hour={true}
                display="default"
                onChange={datechange}
                />
            )}
                <Modal
                        animationType="slide"
                        visible={visible}
                        transparent={true}
                        onRequestClose={()=>{closeFunc()}}
                    >
                        <Pressable onPress={()=>closeFunc()} style={{backgroundColor:"rgba(0,0,0,.1)",...tailwind("flex-1")}}>
                        </Pressable>
                        <View style={{backgroundColor:"rgba(0,0,0,.1)",...tailwind("h-3/5 relative")}}>
                            <View style={{borderTopLeftRadius:30,borderTopRightRadius:30,borderColor:"rgba(0,0,0,.2)",...tailwind("flex-1 border bg-white p-5")}}>
                                <View style={tailwind("flex-row justify-between items-center")}>
                                    <View style={tailwind("flex-1")}>
                                        <TextInput placeholder="Task" onChangeText={e=>setData((prev:any)=>{return ({...prev,title:e})})} value={data?data["title"]:""} style={tailwind("border-b text-2xl w-full")} />
                                        <Pressable style={tailwind("mt-1")} onPress={()=>{setDatePicker("date")}}>
                                            <Text>
                                            {data?
                                            `${
                                            new Date(data?.time).getDate()>9?new Date(data?.time).getDate():"0"+new Date(data?.time).getDate()
                                            } ${month[new Date(data?.time).getMonth()]} ${new Date(data?.time).getFullYear()}`
                                            :""}
                                            </Text>
                                        </Pressable>
                                    </View>
                                    <View style={tailwind("pr-5 pl-2")}>
                                        <Pressable onPress={()=>{setDatePicker("time")}} style={tailwind("text-base")}>
                                            <Text>
                                            {data?
                                            `${
                                            new Date(data?data["time"]:"12/12/2000").getHours()>9?new Date(data?data["time"]:"12/12/2000").getHours():"0"+new Date(data?data["time"]:"12/12/2000").getHours()
                                            }:${new Date(data?data["time"]:"12/12/2000").getMinutes()>9?new Date(data?data["time"]:"12/12/2000").getMinutes():"0"+new Date(data?data["time"]:"12/12/2000").getMinutes()
                                            }`
                                            :""}
                                            </Text>
                                        </Pressable>
                                    </View>
                                </View>
                                <View style={tailwind("mt-5 flex-1")}>
                                    <TextInput
                                        placeholder="Note"
                                        style={tailwind("border px-2 py-0")}
                                        value={data?.note}
                                        multiline={true}
                                        onChangeText={(e:any)=>{
                                            setData((prev:any)=>{
                                                return({
                                                    ...prev,
                                                    note:e
                                                })
                                            })
                                        }}
                                    />
                                </View>
                                <View style={tailwind("flex-row items-center justify-around")}>
                                    <TouchableOpacity onPress={()=>{closeFunc()}} style={tailwind("bg-red-400 h-10 w-10 flex items-center justify-center rounded-full")}>
                                        <FontAwesome size={22} color={"white"} name="times" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>addData()} style={tailwind(`bg-blue-400 h-10 w-10 flex items-center justify-center rounded-full ${loading?"opacity-40":""}`)}>
                                        <FontAwesome size={22} color={"white"} name="check" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>  
            <TouchableOpacity onPress={()=>setVisible(true)} style={tailwind("absolute right-5 bottom-2 z-10")}>
                <FontAwesome name="plus-square" size={40} color={"green"} />
            </TouchableOpacity>
        </>
    )
}