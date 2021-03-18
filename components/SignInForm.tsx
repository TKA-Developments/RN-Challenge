import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import Auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Button from './Button';
import { View } from './Themed';
import LabeledTextInput from './LabelledTextInput';
import AlertBox from './AlertBox';
import TextButton from './TextButton';
import { AuthStackParamList } from '../types';

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
  signupTextButtonStyle: {
    alignItems: 'center',
  },
});

export default () => {
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList, 'SignInScreen'>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const onPressSignIn = () => {
    setIsLoading(true);
    setError(null);

    Auth()
      .signInWithEmailAndPassword(email, password)
      // No need to handle, because the authentication has been listened at the top level
      .then((_) => {
      })
      .catch((reason) => {
        switch (reason.code) {
          case 'auth/invalid-email':
          case 'auth/wrong-password':
          case 'auth/user-not-found':
            setError('Invalid email or password');
            break;
          default:
            setError(`Error. Please contact the app developer. Reason: ${reason}`);
        }
      })
      .finally(() => {
        setIsLoading(false);
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
      <TextButton
        touchableStyle={styles.signupTextButtonStyle}
        onPress={() => navigation.navigate('SignUpScreen')}
      >
        {'Didn\'t have one? Sign up for a new one'}
      </TextButton>
      <View style={styles.buttonStyle}>
        {
          isLoading
            ? null
            : (
              <Button
                onPress={onPressSignIn}
                disabled={email === '' || password === ''}
              >
                {'Sign In '}
              </Button>
            )
        }
      </View>
      {
        error === null
          ? null
          : (
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
