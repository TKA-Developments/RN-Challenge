import { Pressable } from "react-native";
import tailwind from "tailwind-rn";
import { Text, View } from "../../components/Themed";
import { LoginStackScreenProps } from "../../types";

export default function AuthScreen({navigation}:LoginStackScreenProps<'Auth'>){
    return(
        <View style={tailwind("flex-1 pt-32 items-center")}>
            <Text style={tailwind("font-bold text-2xl mb-20")}>Apps</Text>
            <View>
                <Pressable onPress={()=>navigation.navigate("Login")} style={tailwind("px-8 py-2 rounded-md bg-green-200 mb-8")}>
                    <Text style={tailwind("text-center text-lg")}>Login</Text>
                </Pressable>
                <Pressable onPress={()=>navigation.navigate("Register")} style={tailwind("px-8 py-2 rounded-md bg-green-200")}>
                    <Text style={tailwind("text-center text-lg")}>Register</Text>
                </Pressable>
            </View>
        </View>
    )
}