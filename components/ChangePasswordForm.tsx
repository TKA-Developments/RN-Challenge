import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import Auth from '@react-native-firebase/auth';
import Button from './Button';
import { View } from './Themed';
import LabeledTextInput from './LabelledTextInput';
import AlertBox from './AlertBox';
import { currentUser } from '../action/Auth';

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
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [result, setResult] = useState<null | string>(null);

  const onPressChangePassword = () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    const updatePassword = () => Auth()
      .currentUser!!
      .updatePassword(newPassword)
      .then((_) => {
        setResult('You have change your password');
      })
      .catch((reason) => {
        switch (reason.code) {
          case 'auth/weak-password':
            setError('New password too weak');
            break;
          case 'auth/requires-recent-login':
            setError('You can\'t change your password due to suspicious activity');
            break;
          default:
            setError(`Error. Please contact the app developer. Reason: ${reason}`);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    Auth()
      .currentUser!!
      .reauthenticateWithCredential(
        Auth.EmailAuthProvider.credential(currentUser()!!.email!!, oldPassword),
      )
      .then(updatePassword)
      .catch((reason) => {
        switch (reason.code) {
          case 'auth/invalid-email':
          case 'auth/wrong-password':
          case 'auth/user-not-found':
            setError('Invalid old password');
            break;
          default:
            setError(`Error. Please contact the app developer. Reason: ${reason}`);
        }
        setIsLoading(false);
      });
  };

  return (
    <View style={styles.containerStyle}>
      <LabeledTextInput
        label="Old Password"
        placeholder="Enter your old password"
        value={oldPassword}
        onChangeText={setOldPassword}
        secureTextEntry
      />
      <LabeledTextInput
        label="New Password"
        placeholder="Enter your new password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <View style={styles.buttonStyle}>
        {
          isLoading
            ? null
            : (
              <Button
                onPress={onPressChangePassword}
                disabled={newPassword === ''}
              >
                Change Password
              </Button>
            )
        }
      </View>
      {
        result
          ? (
            <AlertBox
              style={styles.alertStyle}
              message={result}
              colorState="success"
              setMessage={setResult}
            />
          ) : null
      }
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
