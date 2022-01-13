import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Modal, Pressable, TextInput, TouchableOpacity } from "react-native";
import tailwind from "tailwind-rn";
import { Text, View } from "./Themed";
import DateTimePicker from '@react-native-community/datetimepicker';
import Months from "../constants/Months";
import editTasks from "../functions/editTasks";
import deleteTasks from "../functions/deleteTasks";

export default function TaskDetailModal({visible,closeFunc,detaildata}:any){
    
    const [active, setActive] = useState(null)
    const [deleteMode, setDeleteMode] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [editData, setEditData] = useState<any>(null)
    const [datePicker, setDatePicker] = useState<any>("")
    const month=Months()

    useEffect(() => {
        setDeleteMode(false)
        setEditMode(false)
        setEditData(active)
        setActive(detaildata)
    }, [visible])

    useEffect(() => {
        setEditData(active)
    }, [editMode])

    const deleteoredit = ()=>{
        if(editMode){
            updateTask()
        }
        if(deleteMode){
            deleteTask()
        }
    }

    const deleteTask = async()=>{
        await deleteTasks(active)
        closeFunc()
    }

    const updateTask = async ()=>{
        await editTasks(active,editData)
        setActive(editData)
        setEditMode(false)
    }

    return(
        <View>
        {datePicker!=="" && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date(editData.time)}
          mode={datePicker}
          is24Hour={true}
          display="default"
          onChange={(e: any,s: any)=>{
              const currentDate = s || new Date(editData?.time);
              let beforeedit = new Date(editData.time)
              let editedtime = new Date(currentDate)
              if(datePicker.toLowerCase()==="time"){
                  setEditData((prev:any)=>{
                      return({
                          ...prev,
                          time: new Date(
                              beforeedit.getFullYear(),
                              beforeedit.getMonth(),
                              beforeedit.getDate(),
                              editedtime.getHours(),
                              editedtime.getMinutes()
                          )
                      })
                  })
              }else{
                  setEditData((prev:any)=>{
                      return({
                          ...prev,
                          time: new Date(
                              editedtime.getFullYear(),
                              editedtime.getMonth(),
                              editedtime.getDate(),
                              beforeedit.getHours(),
                              beforeedit.getMinutes()
                          )
                      })
                  })
              }
              setDatePicker("")
          }}
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
                                {editMode?
                                <TextInput onChangeText={e=>setEditData((prev:any)=>{return ({...prev,title:e})})} value={editData?editData["title"]:""} style={tailwind("border-b text-2xl w-full")} />
                                :
                                <Text style={tailwind("text-2xl")}>{active?active["title"]:""}</Text>
                                }
                                <Pressable style={tailwind("mt-1")} onPress={()=>{if(editMode){setDatePicker("date")}}}>
                                    <Text>
                                    {active?
                                    editMode?
                                    `${
                                    new Date(editData?.time).getDate()>9?new Date(editData?.time).getDate():"0"+new Date(editData?.time).getDate()
                                    } ${month[new Date(editData?.time).getMonth()]} ${new Date(editData?.time).getFullYear()}`
                                    :`${
                                    new Date(active["time"]).getDate()>9?new Date(active["time"]).getDate():"0"+new Date(active["time"]).getDate()
                                    } ${month[new Date(active["time"]).getMonth()]} ${new Date(active["time"]).getFullYear()}`
                                    :""}
                                    </Text>
                                </Pressable>
                            </View>
                            <View style={tailwind("pr-5 pl-2")}>
                                <Pressable onPress={()=>{if(editMode){setDatePicker("time")}}} style={tailwind("text-base")}>
                                    <Text>
                                    {active?
                                    editMode?
                                    `${
                                    new Date(editData?editData["time"]:"12/12/2000").getHours()>9?new Date(editData?editData["time"]:"12/12/2000").getHours():"0"+new Date(editData?editData["time"]:"12/12/2000").getHours()
                                    }:${new Date(editData?editData["time"]:"12/12/2000").getMinutes()>9?new Date(editData?editData["time"]:"12/12/2000").getMinutes():"0"+new Date(editData?editData["time"]:"12/12/2000").getMinutes()
                                    }`
                                    :`${
                                    new Date(active["time"]).getHours()>9?new Date(active["time"]).getHours():"0"+new Date(active["time"]).getHours()
                                    }:${new Date(active["time"]).getMinutes()>9?new Date(active["time"]).getMinutes():"0"+new Date(active["time"]).getMinutes()
                                    }`
                                    :""}
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                        <View style={tailwind("mt-5 flex-1")}>
                            {
                                editMode?
                                <TextInput
                                    style={tailwind("border px-2 py-0")}
                                    value={editData?.note}
                                    multiline={true}
                                    onChangeText={(e:any)=>{
                                        setEditData((prev:any)=>{
                                            return({
                                                ...prev,
                                                note:e
                                            })
                                        })
                                    }}
                                />
                                :
                                <Text>{active?active["note"]:""}</Text>
                            }
                        </View>
                        {
                            deleteMode&&
                            <Text style={tailwind("text-center mb-1")}>
                                Do you want to delete this task?
                            </Text>
                        }
                        {
                            deleteMode||editMode?
                            <View style={tailwind("flex-row items-center justify-around")}>
                                <TouchableOpacity onPress={()=>{setDeleteMode(false);setEditMode(false)}} style={tailwind("bg-red-400 h-10 w-10 flex items-center justify-center rounded-full")}>
                                    <FontAwesome size={22} color={"white"} name="times" />
                                </TouchableOpacity>
                                <TouchableOpacity style={tailwind("bg-blue-400 h-10 w-10 flex items-center justify-center rounded-full")}>
                                    <FontAwesome onPress={()=>deleteoredit()} size={22} color={"white"} name="check" />
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={tailwind("flex-row items-center justify-around")}>
                                <TouchableOpacity onPress={()=>setEditMode(true)} style={tailwind("bg-blue-400 h-10 w-10 flex items-center justify-center rounded-full")}>
                                    <FontAwesome size={22} color={"white"} name="pencil" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>setDeleteMode(true)} style={tailwind("bg-red-400 h-10 w-10 flex items-center justify-center rounded-full")}>
                                    <FontAwesome size={22} color={"white"} name="trash" />
                                </TouchableOpacity>
                                {/* <TouchableOpacity style={tailwind("bg-green-400 h-10 w-10 flex items-center justify-center rounded-full")}>
                                    <FontAwesome size={22} color={"white"} name="check" />
                                </TouchableOpacity> */}
                            </View>
                        }
                    </View>
                </View>
            </Modal>
        </View>
    )
}