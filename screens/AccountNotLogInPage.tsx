import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginStackParamList } from "../types";
import AuthScreen from "./AuthStack/AuthScreen";
import LoginScreen from "./AuthStack/LoginScreen";
import RegisterScreen from "./AuthStack/RegisterScreen";

export default function AccountNotLoginPage(){

    const LoginStack = createNativeStackNavigator<LoginStackParamList>();

    return(
        <LoginStack.Navigator>
            <LoginStack.Screen component={AuthScreen} options={{headerShown:false}} name="Auth" />
            <LoginStack.Screen component={LoginScreen} options={{headerShown:false}} name="Login" />
            <LoginStack.Screen component={RegisterScreen} options={{headerShown:false}} name="Register" />
        </LoginStack.Navigator>
    )
}