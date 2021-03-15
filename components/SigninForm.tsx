import React, { useState } from 'react';
import Button from './Button';
import { Spinner, Text, View } from './Themed';
import LabeledTextInput from './TextInput';
import Auth from '@react-native-firebase/auth';

const onPressSignIn = (
  email: string,
  password: string,
  setError: React.Dispatch<React.SetStateAction<any>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setIsLoading(true);

  Auth()
    .signInWithEmailAndPassword(email, password)
    // No need to handle, because the authentication has been listened at the top level
    .then(_ => {
    })
    .catch((reason) => {
      setError(reason);
    })
    .finally(() => {
      setIsLoading(false);
    });
};

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <View style={{
      margin: 10,
    }}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 30,
          fontWeight: 'bold',
        }}
      >
        Sign In
      </Text>
      <LabeledTextInput
        label="E-mail"
        placeholder="Enter your e-mail"
        value={email}
        onChangeText={setEmail}
      />
      <LabeledTextInput
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {
        isLoading ?
          (
            <Spinner/>
          ) :
          (
            <Button
              onPress={_ => {
                onPressSignIn(
                  email,
                  password,
                  setError,
                  setIsLoading
                );
              }}
            >
              {'Sign In '}
            </Button>
          )
      }
      {
        isLoading ?
          null :
          (
            <View colorState="danger">
              <Text>
                {error}
              </Text>
            </View>
          )
      }
    </View>
  );
};
