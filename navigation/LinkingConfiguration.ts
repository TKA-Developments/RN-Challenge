import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          TabOne: {
            screens: {
              ToDoScreen: 'one',
            },
          },
          TabTwo: {
            screens: {
              ProfileScreen: 'two',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
