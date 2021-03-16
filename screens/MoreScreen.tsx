import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Switch } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import MenuList, { MenuListSectionData } from '../components/MenuList';
import AccountOverview from '../components/AccountOverview';
import Version from '../constants/Version';
import { StackNavigationProp } from '@react-navigation/stack';
import { TabMoreParamList } from '../types';
import { currentUser } from '../action/Auth';
import { useThemeColors, View } from '../components/Themed';

const useSections = (
  navigation: StackNavigationProp<TabMoreParamList, 'TabMoreScreen'>
): Array<MenuListSectionData> => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const colors = useThemeColors();

  return [
    {
      title: 'Configuration',
      data: [
        {
          additionalComponentLeft: <MaterialIcons name="palette" size={30} color={colors.primary}/>,
          title: 'Dark Theme',
          subtitle: 'For those of you who can\'t stand in a daylight',
          additionalComponentRight: <Switch value={isDarkTheme} onValueChange={setIsDarkTheme}
                                            color={colors.primary}/>,
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
          additionalComponentLeft: <MaterialIcons name="palette" size={30} color={colors.primary}/>,
          title: 'Animation Demo',
        },
      ],
    },
  ];
};

export default ({ navigation }: { navigation: StackNavigationProp<TabMoreParamList, 'TabMoreScreen'> }) => {
  const { email } = currentUser() || {};
  const sections = useSections(navigation);

  return (
    <View>
      <AccountOverview email={email}/>
      <MenuList
        sections={sections}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
