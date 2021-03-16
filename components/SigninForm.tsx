import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import Auth from '@react-native-firebase/auth';
import Button from './Button';
import { View } from './Themed';
import LabeledTextInput from './LabelledTextInput';
import AlertBox from './AlertBox';

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 10,
  },
  alertStyle: {
    marginTop: 20,
  },
  containerStyle: {
    margin: 10,
    flex: 1,
  },
});

const onPressSignIn = (
  email: string,
  password: string,
  setError: React.Dispatch<React.SetStateAction<any>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setIsLoading(true);
  setError(null);

  Auth()
    .signInWithEmailAndPassword(email, password)
    // No need to handle, because the authentication has been listened at the top level
    .then(_ => {
    })
    .catch((reason) => {
      if (
        reason.code === 'auth/invalid-email' ||
        reason.code === 'auth/wrong-password' ||
        reason.code === 'auth/user-not-found') {
        setError('Invalid email or password');
      }
    })
    .finally(() => {
      setIsLoading(false);
    });
};

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  return (
    <View style={styles.containerStyle}>
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
      <View style={styles.buttonStyle}>
        {
          isLoading ?
            null :
            (
              <Button
                onPress={_ => onPressSignIn(email, password, setError, setIsLoading)}
                disabled={email === '' || password === ''}
              >
                {'Sign In '}
              </Button>
            )
        }
      </View>
      {
        error === null ?
          null :
          (
            <AlertBox
              style={styles.alertStyle}
              message={error}
              colorState="danger"
              setMessage={setError}
            />
          )
      }
    </View>
  );
};
