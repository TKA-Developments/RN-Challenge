import * as React from 'react';
import { StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import MenuList, { MenuListSectionData } from '../components/MenuList';
import AccountOverview from '../components/AccountOverview';
import Version from '../constants/Version';
import { StackNavigationProp } from '@react-navigation/stack';
import { TabMoreParamList } from '../types';
import { currentUser } from '../action/Auth';
import { View } from '../components/Themed';

const sections = (
  navigation: StackNavigationProp<TabMoreParamList, 'TabMoreScreen'>
): Array<MenuListSectionData> => [
  {
    title: 'Configuration',
    data: [
      {
        icon: <MaterialIcons name="palette" size={30}/>,
        title: 'Theme',
      },
    ],
  },
  {
    title: 'General',
    data: [
      {
        title: 'Version',
        subtitle: Version,
      },
      {
        title: 'About',
        onPress: () => {
          navigation.navigate('AboutScreen');
        },
      },
    ],
  },
  {
    title: 'Misc',
    data: [
      {
        icon: <MaterialIcons name="palette" size={30}/>,
        title: 'Animation Demo',
      },
    ],
  },
];

export default ({ navigation }: { navigation: StackNavigationProp<TabMoreParamList, 'TabMoreScreen'> }) => {
  const { email } = currentUser() || {};

  return (
    <View>
      <AccountOverview email={email}/>
      <MenuList
        sections={sections(navigation)}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
