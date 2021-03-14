import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { signOut } from '../action/Auth';
import { Theme, useTheme } from '@react-navigation/native';

const styles = (theme: Theme) => StyleSheet.create({
  modalContainerStyle: {
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
    padding: 15,
  },
  signOutButtonStyle: {
    alignItems: 'flex-end',
  },
  emailTextStyle: {
    color: theme.colors.text,
    flex: 1,
    fontSize: 17,
    marginLeft: 10,
  },
  logoutTextStyle: {
    color: theme.colors.primary,
    fontSize: 17,
  },
});

const SignOutButton = () => {
  const theme = useTheme();
  const themedStyles = styles(theme);

  return (
    <TouchableOpacity style={themedStyles.signOutButtonStyle} onPress={() => {
      signOut();
    }}>
      <Text style={themedStyles.logoutTextStyle}>SignOut</Text>
    </TouchableOpacity>
  );
};

export default ({ email }: { email: undefined | string | null }) => {
  const theme = useTheme();
  const themedStyles = styles(theme);

  return (
    <View style={themedStyles.modalContainerStyle}>
      <View style={{
        backgroundColor: 'gray',
        borderRadius: 100,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <FontAwesome name="user" color={theme.colors.text} size={40} color="#FFFF"/>
      </View>
      <Text style={themedStyles.emailTextStyle}>{email ?? 'No email'}</Text>
      <SignOutButton/>
    </View>
  );
};
