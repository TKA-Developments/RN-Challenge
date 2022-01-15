import { Pressable } from "react-native";
import tailwind from "tailwind-rn";
import { Text, View } from "../components/Themed";
import { auth } from "../firebase";

export default function AccountLogedInPage(){

    const press = async ()=>{
        await auth.signOut()
        console.log("LOGED OUT")
    }

    return(
        <View style={tailwind("flex-1 justify-center items-center")}>
            <Text>
                Loged In
                {
                    auth.currentUser?.displayName?
                    auth.currentUser?.displayName
                    :" Anonymous"
                }
            </Text>
            <Pressable onPress={()=>press()} style={tailwind("py-2 px-8 bg-green-300 mt-8 rounded-full")}>
                <Text style={tailwind("text-2xl")}>
                    Log Out
                </Text>
            </Pressable>
        </View>
    )
}