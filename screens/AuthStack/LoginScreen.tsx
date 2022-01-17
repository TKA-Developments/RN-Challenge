import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { Alert } from "react-native";
import { Pressable, TextInput } from "react-native";
import tailwind from "tailwind-rn";
import { Text, View } from "../../components/Themed";
import { auth, db } from "../../firebase";
import addTasks from "../../functions/addTasks";
import getTasks from "../../functions/getTasks";
import { LoginStackScreenProps } from "../../types";

export default function LoginScreen({navigation}:LoginStackScreenProps<'Login'>){


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passVisb, setPassVisb] = useState(false)
    const [loading, setLoading] = useState(false)

    const submit = async ()=>{
        if(email.trim()!==""&&password.trim()!==""&&!loading){
            setLoading(true)
            auth.signInWithEmailAndPassword(email,password)
            .then(async (res:any)=>{
                let local = await getTasks()
                let data = await db.collection("users").doc(res.user.uid)
                .collection("tasks").get()
                data.forEach((item:any)=>{
                    if(!local.includes(item)){
                        addTasks(item)
                    }
                })
                console.log(res.user.uid)
            })
            .catch(err=>{
                Alert.alert("Error",err.toString())
            })
            .finally(()=>{
                setLoading(false)
            })
        }
    }

    return(
        <View style={tailwind("flex-1 pt-32 items-center")}>
            <Text style={tailwind("font-bold text-2xl mb-12")}>Login</Text>
            <View style={tailwind("w-2/3")}>
                <TextInput value={email} onChangeText={e=>setEmail(e)} placeholder="email" style={tailwind("border rounded-md px-3 py-1")} />
                <View style={tailwind(`relative mt-3`)}>
                    <TextInput secureTextEntry={!passVisb} value={password} onChangeText={(e:any)=>setPassword(e)}  placeholder="password" style={tailwind("border rounded-md pl-3 pr-8 py-1")} />
                    <Pressable onPress={()=>setPassVisb((p:any)=>!p)} style={tailwind("absolute top-0 h-full right-0 justify-center px-2")}>
                        <FontAwesome name={passVisb?"eye-slash":"eye"} />
                    </Pressable>
                </View>
                <Pressable onPress={()=>{submit()}} style={tailwind("px-8 py-2 mt-5 rounded-md bg-green-200 mb-8")}>
                    <Text style={tailwind("text-center text-lg")}>{loading?"Logging in...":"Login"}</Text>
                </Pressable>
                <View style={tailwind("flex-row justify-center")}>
                    <Text>Don't have Account? </Text>
                    <Pressable onPress={()=>navigation.navigate("Register")}>
                        <Text style={tailwind("text-blue-600")}>Register Now</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}