import * as React from 'react';
import { StyleSheet, View } from 'react-native';
// import Firebase from 'firebase';
import TouchableOpacityList, { TouchableOpacitySectionData } from '../components/TouchableOpacityList';
import AccountOverview from '../components/AccountOverview';
import Version from '../constants/Version';
import { StackNavigationProp } from '@react-navigation/stack';
import { TabMoreParamList } from '../types';
import { currentUser } from '../action/Auth';

const sections: Array<TouchableOpacitySectionData> = [
  // {
  //   title: 'Configuration',
  //   data: [
  //     {
  //       icon: <MaterialIcons name="palette" size={30}/>,
  //       title: 'Theme',
  //     },
  //   ],
  // },
  {
    title: 'General',
    data: [
      {
        title: 'Version',
        subtitle: Version,
      },
      {
        title: 'About',
      }
    ]
  }
];

export default ({ navigation }: { navigation: StackNavigationProp<TabMoreParamList, 'TabMoreScreen'> }) => {
  const { email } = currentUser() || {};

  return (
    <View>
      <AccountOverview email={email}/>
      <TouchableOpacityList
        sections={sections}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
