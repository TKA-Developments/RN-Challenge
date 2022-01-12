import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, Modal, Pressable, TouchableOpacity } from "react-native";
import tailwind from "tailwind-rn";
import { View, Text } from "./Themed";

export default function TaskList(){

    const [modal, setModal] = useState(false)

    const itemrender = ()=>{
        return(
            <Pressable onPress={()=>setModal(true)} style={tailwind("my-2 p-4 rounded-md bg-blue-400 flex flex-row")}>
                <View lightColor="transparent" style={tailwind("flex flex-1 flex-row bg-transparent")}>
                    <View lightColor="white" style={tailwind("flex items-center px-2 rounded-lg py-1 mr-5")}>
                        <Text style={tailwind("font-bold text-base")}>08:50</Text>
                        <Text style={tailwind("font-bold text-base")}>12 Jan</Text>
                    </View>
                    <View lightColor="transparent">
                        <Text>Task 1</Text>
                    </View>
                </View>
                <View lightColor="transparent" style={tailwind("flex flex-row")}>
                    <View lightColor="transparent" style={tailwind("flex justify-center")}>
                        <TouchableOpacity style={tailwind("bg-green-200 p-2 rounded-full")}>
                            <FontAwesome name="check" color={"green"} size={22} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Pressable>
        )
    }

    return(
        <>
            <Modal
                animationType="slide"
                visible={modal}
                transparent={true}
                onRequestClose={()=>{setModal(false)}}
            >
                <Pressable onPress={()=>setModal(false)} style={{backgroundColor:"rgba(0,0,0,.3)",...tailwind("h-1/5")}}>

                </Pressable>
                <View style={tailwind("flex-1 bg-white rounded-t-lg")}>

                </View>
            </Modal>
            <FlatList
                style={tailwind("flex-1 pb-4")}
                data={[1,1,1,1,1,1,1,1,1,1]}
                renderItem={itemrender}
                keyExtractor={(item,index)=>String(index)}
            />
        </>
    )
}