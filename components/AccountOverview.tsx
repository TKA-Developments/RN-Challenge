import { FontAwesome } from '@expo/vector-icons';
import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, ThemedColors, View } from './Themed';
import { signOut } from '../action/Auth';
import { ThemeContext } from '../context/ThemeContext';

const styles = (colors: ThemedColors) => StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
    padding: 15,
  },
  userIconStyle: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutButtonStyle: {
    alignItems: 'flex-end',
  },
  emailTextStyle: {
    flex: 1,
    color: colors.text,
    fontSize: 17,
    marginLeft: 10,
  },
  logoutTextStyle: {
    color: colors.primary,
    fontSize: 17,
  },
});

export default ({ email }: { email: undefined | string | null }) => {
  const { colors } = useContext(ThemeContext);
  const themedStyles = styles(colors);

  return (
    <View style={themedStyles.containerStyle}>
      <View style={themedStyles.userIconStyle}>
        <FontAwesome name="user" color={colors.background} size={40}/>
      </View>
      <Text style={themedStyles.emailTextStyle}>{email ?? 'No email'}</Text>
      <TouchableOpacity
        style={themedStyles.signOutButtonStyle}
        onPress={() => {
          signOut();
        }}
      >
        <Text style={themedStyles.logoutTextStyle}>SignOut</Text>
      </TouchableOpacity>
    </View>
  );
};
