import React, { useEffect, useState, useContext } from 'react'
import { TouchableOpacity, TextInput } from 'react-native'
import { View,Text } from '../components/Themed'
import Navigation from '../navigation'
import { Props } from '../types'
import firebase from 'firebase'
import { AuthContext } from '../context/Auth'


export default function TabLoginScreen<Props>({navigation}){
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const authContext = useContext(AuthContext)
    // const firebaseConfig = {
    //     apiKey: "AIzaSyCHBQERYLwWXV7c0WNunTB0YTo1El05bfI",
    //     authDomain: "to-do-app-65492.firebaseapp.com",
    //     projectId: "to-do-app-65492",
    //     storageBucket: "to-do-app-65492.appspot.com",
    //     messagingSenderId: "1097336026558",
    //     appId: "1:1097336026558:web:bca4589b04ebf920fa35ef",
    //     measurementId: "G-SE0HYTMSNB"
    //   };
    //   if (!firebase.apps.length) {
    //     firebase.initializeApp(firebaseConfig)
    //  }else {
    //     firebase.app(); // if already initialized, use that one
    //  }
     
    // const Login = () => {
    //     setEmail('')
    //     setPassword('')
    //     firebase.auth().signInWithEmailAndPassword(email, password)
    //     .then((userCredential) => {
    //         // Signed in
    //         var user = userCredential.user;
    //         console.log(user + '--' + email + '--' + password)
            
    //         navigation.navigate('TabDashboard')
    //         // ...
    //     })
    //     .catch((error) => {
    //         var errorCode = error.code;
    //         var errorMessage = error.message;
    //         console.log(errorMessage)
    //     });
    // }
    return (
        <View>
            <View>
                <Text>Login Page</Text>
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
            <TouchableOpacity onPress={() => authContext.signIn(email,password)}>
                <Text>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('TabRegister')}>
                <Text>Register</Text>
            </TouchableOpacity>
        </View>
    )
}