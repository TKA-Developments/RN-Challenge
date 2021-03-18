import * as Linking from 'expo-linking';
import { LinkingOptions } from '@react-navigation/native';

export default <LinkingOptions>{
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      BottomTabNavigator: {
        screens: {
          ToDosStack: {
            screens: {
              ToDosScreen: 'todos',
              CreateToDoModal: 'createtodos',
              EditToDoScreen: {
                path: 'todos/:id',
              },
              TodaysImageScreen: 'todaysimage',
            },
          },
          MoreStack: {
            screens: {
              TabMoreScreen: 'more',
              AboutScreen: 'about',
            },
          },
        },
      },
      SignIn: 'signin',
      NotFound: '*',
    },
  },
};
