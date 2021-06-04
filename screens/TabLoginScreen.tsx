import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { View,Text } from '../components/Themed'
import Navigation from '../navigation'
import { Props } from '../types'
import firebase from 'firebase'


export default function TabLoginScreen<Props>({navigation}){
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')

    const Login = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });

    }
    return (
        <View>
            <View>
                <Text>Login Page</Text>
            </View>
            <View>
               
            </View>
            <TouchableOpacity onPress={Login}>
                <Text>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('TabRegister')}>
                <Text>Register</Text>
            </TouchableOpacity>
        </View>
    )
}