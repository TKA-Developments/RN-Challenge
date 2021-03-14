import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Firebase from 'firebase';
import TouchableOpacityList, { TouchableOpacitySectionData } from '../components/TouchableOpacityList';
import AccountOverview from '../components/AccountOverview';
import Version from '../constants/Version';
import { MaterialIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { TabMoreParamList } from '../types';

const sections: Array<TouchableOpacitySectionData> = [
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
        subtitle: Version,
      }
    ]
  }
];

export default ({ navigation }: { navigation: StackNavigationProp<TabMoreParamList, 'TabMoreScreen'> }) => {
  const { email } = Firebase.auth().currentUser || {};

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
