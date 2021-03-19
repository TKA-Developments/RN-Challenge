import * as React from 'react';
import { useContext } from 'react';
import { Switch } from 'react-native';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import MenuList, { MenuListSectionData } from '../components/MenuList';
import AccountOverview from '../components/AccountOverview';
import Version from '../constants/Version';
import { MainStackParamList, TabMoreParamList } from '../types';
import { currentUser } from '../action/Auth';
import { View } from '../components/Themed';
import { ThemeContext } from '../context/ThemeContext';

const useSections = (): Array<MenuListSectionData> => {
  const {
    theme,
    setTheme,
    colors,
  } = useContext(ThemeContext);

  const navigation = useNavigation<StackNavigationProp<MainStackParamList & TabMoreParamList, 'MoreScreen'>>();

  return [
    {
      title: 'Account',
      data: [
        {
          additionalComponentLeft: <Entypo name="key" size={30} color={colors.primary} />,
          title: 'Change Password',
          onPress: () => { navigation.navigate('ChangePasswordScreen'); },
        },
      ],
    },
    {
      title: 'Configuration',
      data: [
        {
          additionalComponentLeft: <MaterialIcons name="palette" size={30} color={colors.primary} />,
          title: 'Dark Theme',
          subtitle: 'For those of you who can\'t stand in a daylight',
          additionalComponentRight: <Switch
            value={theme === 'dark'}
            onValueChange={(checked) => setTheme(checked ? 'dark' : 'light')}
            // color={colors.primary}
          />,
        },
      ],
    },
    {
      title: 'Misc',
      data: [
        {
          additionalComponentLeft: <MaterialIcons
            name="animation"
            size={30}
            color={colors.primary}
          />,
          title: 'Mario Jump Demo',
          onPress: () => {
            navigation.navigate('GameDemoScreen');
          },
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
  ];
};

export default () => {
  const { email } = currentUser() || {};
  const sections = useSections();

  return (
    <View style={{ flex: 1 }}>
      <AccountOverview email={email} />
      <MenuList
        sections={sections}
      />
    </View>
  );
};
