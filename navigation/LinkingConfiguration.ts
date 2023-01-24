import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          TabOne: {
            screens: {
              TabOneScreen: 'task',
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: 'add',
            },
          },
          editScreen: {
            screens: {
              editScreen: 'edit',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
