import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { Alert } from "react-native";
import { Pressable, TextInput, } from "react-native";
import tailwind from "tailwind-rn";
import { Text, View } from "../../components/Themed";
import EmailValidator from "../../constants/EmailValidator";
import { auth, db } from "../../firebase";
import getTasks from "../../functions/getTasks";
import { LoginStackScreenProps } from "../../types";

export default function RegisterScreen({navigation}:LoginStackScreenProps<'Register'>){

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passVisb, setPassVisb] = useState(false)
    const [confPass, setConfPass] = useState("")
    const [confPassVisb, setConfPassVisb] = useState(false)
    const [isError, setIsError] = useState(false)
    const [loading, setLoading] = useState(false)

    const submit = ()=>{
        let valid = true
        if(
            !EmailValidator(email.trim())
            || password.trim().length < 3
            || password.trim()!==confPass.trim()
        ){
            valid = false
        }
        setIsError(!valid)
        if(valid && !loading){
            setLoading(true)
            auth.createUserWithEmailAndPassword(email.trim(),password.trim())
            .then(async (res:any)=>{
                // console.log(res.user.uid)
                await db.collection("users").doc(res.user.uid).set({
                    lastsync: Date.now()
                })
                let localtasks = await getTasks()
                localtasks.forEach((item:any)=>{
                    db.collection("users").doc(res.user.uid)
                    .collection("tasks").doc(item.id).set(item)
                })
                console.log("sukses", res)
            })
            .catch(e=>{
                Alert.alert("ERROR",e.toString())
            })
            .finally(()=>{
                setLoading(false)
            })
        }
    }

    return(
        <View style={tailwind("flex-1 pt-32 items-center")}>
            <Text style={tailwind("font-bold text-2xl mb-12")}>Register</Text>
            <View style={tailwind("w-2/3")}>
                <TextInput value={email} onChangeText={(e:any)=>setEmail(e)} placeholder="email" style={tailwind("border rounded-md px-3 py-1")} />
                {
                    isError&&!EmailValidator(email.trim())&&
                    <View style={tailwind("flex-row items-center pl-1 mt-1")}>
                        <FontAwesome name="exclamation-circle" color="red" />
                        <Text style={tailwind("text-xs text-red-500 ml-1")}>
                            Please fill in email format
                        </Text>
                    </View>
                }
                <View style={tailwind(`relative ${isError&&!EmailValidator(email.trim())?"mt-1":"mt-3"}`)}>
                    <TextInput secureTextEntry={!passVisb} value={password} onChangeText={(e:any)=>setPassword(e)}  placeholder="password" style={tailwind("border rounded-md pl-3 pr-8 py-1")} />
                    <Pressable onPress={()=>setPassVisb((p:any)=>!p)} style={tailwind("absolute top-0 h-full right-0 justify-center px-2")}>
                        <FontAwesome name={passVisb?"eye-slash":"eye"} />
                    </Pressable>
                </View>
                <View style={tailwind("relative mt-3")}>
                    <TextInput secureTextEntry={!confPassVisb} value={confPass} onChangeText={(e:any)=>setConfPass(e)}  placeholder="confirm password" style={tailwind("border rounded-md px-3 py-1")} />
                    <Pressable onPress={()=>setConfPassVisb((p:any)=>!p)} style={tailwind("absolute top-0 h-full right-0 justify-center px-2")}>
                        <FontAwesome name={confPassVisb?"eye-slash":"eye"} />
                    </Pressable>
                </View>
                {
                    isError&&(password.trim().length<3 || password.trim()!==confPass.trim())&&
                    <View style={tailwind("flex-row items-center pl-1 mt-1")}>
                        <FontAwesome name="exclamation-circle" color="red" />
                        <Text style={tailwind("text-xs text-red-500 ml-1")}>
                            {password.trim().length<3?
                            "Password must has 3 character"
                            :"Confirm Password not same"}
                        </Text>
                    </View>
                }
                <Pressable onPress={()=>submit()} style={tailwind(`px-8 py-2 ${isError&&(password.trim().length<3 || password.trim()!==confPass.trim())?"mt-3":"mt-5"} rounded-md bg-green-200 mb-8`)}>
                    <Text style={tailwind("text-center text-lg")}>{loading?"Registering...":"Register"}</Text>
                </Pressable>
                <View style={tailwind("flex-row justify-center")}>
                    <Text>have an Account? </Text>
                    <Pressable onPress={()=>navigation.navigate("Login")}>
                        <Text style={tailwind("text-blue-600")}>Login Now</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}