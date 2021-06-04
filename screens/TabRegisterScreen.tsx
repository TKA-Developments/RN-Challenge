import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { View,Text } from '../components/Themed'
import Navigation from '../navigation'
import { Props } from '../types'
import firebase from 'firebase'


export default function TabRegisterScreen<Props>({navigation}){
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const firebaseConfig = {
        apiKey: "AIzaSyCHBQERYLwWXV7c0WNunTB0YTo1El05bfI",
        authDomain: "to-do-app-65492.firebaseapp.com",
        projectId: "to-do-app-65492",
        storageBucket: "to-do-app-65492.appspot.com",
        messagingSenderId: "1097336026558",
        appId: "1:1097336026558:web:bca4589b04ebf920fa35ef",
        measurementId: "G-SE0HYTMSNB"
      };
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig)
     }else {
        firebase.app(); // if already initialized, use that one
     }
     

    const CreateAccount = () => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
        });
        navigation.navigate('TabLogin')
    }
    return (
        <View>
            <View>
            <Text>Ini Register Page</Text>
            </View>
            <View>
            <TextInput
                onChangeText={email => setEmail(email)}
                defaultValue={email}
                placeholder='Email...'
            />
            <TextInput
                onChangeText={password => setPassword(password)}
                defaultValue={password}
                placeholder='Password...'
            />
            </View>
            <TouchableOpacity onPress={CreateAccount}>
                <Text>Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('TabRegister')}>
                <Text>Register</Text>
            </TouchableOpacity>
        </View>
        
    )
}