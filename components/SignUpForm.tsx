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

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  // const [isSignup, setIsSignup] = useState<boolean>(false);

  const onPressSignUp = () => {
    setIsLoading(true);
    setError(null);
    // setIsSignup(false);

    Auth()
      .createUserWithEmailAndPassword(email, password)
      // No need to handle, because the authentication has been listened at the top level
      .then((user) => user.user.sendEmailVerification())
      .catch((reason) => {
        switch (reason.code) {
          case 'auth/invalid-email':
            setError('Invalid email');
            break;
          case 'auth/email-already-in-use':
            setError('Email is already used');
            break;
          case 'auth/operation-not-allowed':
            setError('Error. Please contact the app developer');
            break;
          case 'auth/weak-password':
            setError('Password not strong enough');
            break;
          case 'auth/missing-android-pkg-name':
          case 'auth/missing-continue-uri':
          case 'auth/missing-ios-bundle-id':
          case 'auth/invalid-continue-uri':
          case 'auth/unauthorized-continue-uri':
          default:
            setError(`Error. Please contact the app developer. Reason: ${reason}`);
        }
      })
      .finally(() => {
        setIsLoading(false);
        // if (error === null) {
        //
        // }
      });
  };

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
          isLoading
            ? null
            : (
              <Button
                onPress={onPressSignUp}
                disabled={email === '' || password === ''}
              >
                {'Sign Up '}
              </Button>
            )
        }
      </View>
      {
        error === null
          ? null : (
            <AlertBox
              style={styles.alertStyle}
              message={error}
              colorState="danger"
              setMessage={setError}
            />
          )
      }
      {/* { */}
      {/*  isSignup */}
      {/*    ? ( */}
      {/*      <AlertBox */}
      {/*        style={styles.alertStyle} */}
      {/*        message="Please check you email for an email confirmation." */}
      {/*        colorState="success" */}
      {/*      /> */}
      {/*    ) : null */}
      {/* } */}
    </View>
  );
};
